/**
 * MindQuest AI - MediaPipe Hand Landmarker & Camera Lifecycle Manager
 *
 * Responsibilities:
 * - Initializes and caches the MediaPipe HandLandmarker instance
 * - Manages getUserMedia camera stream lifecycle
 * - Runs 60fps detection loop via requestAnimationFrame
 * - Provides graceful error handling (permissions, hardware, GPU/CPU fallback)
 * - Releases all hardware tracks and animation frames on cleanup
 */

import { FilesetResolver, HandLandmarker } from "@mediapipe/tasks-vision";

// Primary local model URL (from frontend/public/models/) and official Google CDN fallback
const LOCAL_MODEL_PATH = "/models/hand_landmarker.task";
const CDN_MODEL_PATH = "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";
const WASM_CDN_PATH = "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.18/wasm";

// Singleton cached instance
let cachedLandmarker = null;
let landmarkerInitPromise = null;

/**
 * Initializes and caches the HandLandmarker model.
 * Multiple simultaneous calls share the same init promise.
 */
export async function getHandLandmarker() {
  if (cachedLandmarker) {
    return cachedLandmarker;
  }

  if (landmarkerInitPromise) {
    return landmarkerInitPromise;
  }

  landmarkerInitPromise = (async () => {
    try {
      const vision = await FilesetResolver.forVisionTasks(WASM_CDN_PATH);

      // Attempt loading local model first with GPU delegate
      try {
        cachedLandmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: LOCAL_MODEL_PATH,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
          numHands: 1,
          minHandDetectionConfidence: 0.5,
          minHandPresenceConfidence: 0.5,
          minTrackingConfidence: 0.5
        });
        return cachedLandmarker;
      } catch (gpuError) {
        console.warn("GPU delegate or local model load failed, falling back to CPU / CDN:", gpuError);

        // Fallback 1: Local model with CPU
        try {
          cachedLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: LOCAL_MODEL_PATH,
              delegate: "CPU"
            },
            runningMode: "VIDEO",
            numHands: 1
          });
          return cachedLandmarker;
        } catch (cpuError) {
          console.warn("Local model failed, attempting CDN model:", cpuError);

          // Fallback 2: Remote Google CDN model
          cachedLandmarker = await HandLandmarker.createFromOptions(vision, {
            baseOptions: {
              modelAssetPath: CDN_MODEL_PATH,
              delegate: "CPU"
            },
            runningMode: "VIDEO",
            numHands: 1
          });
          return cachedLandmarker;
        }
      }
    } catch (err) {
      landmarkerInitPromise = null;
      throw new Error(`MediaPipe HandLandmarker initialization failed: ${err.message}`);
    }
  })();

  return landmarkerInitPromise;
}

/**
 * Starts camera feed and attaches detection loop.
 *
 * @param {HTMLVideoElement} videoEl - HTML Video element
 * @param {Object} callbacks - { onResults, onError, onStatusChange }
 * @returns {Object} { stop: Function }
 */
export async function startHandTracking(videoEl, callbacks = {}) {
  const { onResults, onError, onStatusChange } = callbacks;
  let isCancelled = false;
  let animFrameId = null;
  let activeStream = null;
  let lastVideoTime = -1;

  if (onStatusChange) onStatusChange("LOADING_MODEL");

  try {
    // 1. Ensure Landmarker is ready
    const landmarker = await getHandLandmarker();
    if (isCancelled) return { stop: () => {} };

    if (onStatusChange) onStatusChange("REQUESTING_CAMERA");

    // 2. Check camera API availability
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      const err = new Error("Camera API not supported in this browser.");
      err.name = "NotSupportedError";
      throw err;
    }

    // 3. Request webcam stream (640x480 for fast 30/60fps detection without CPU strain)
    activeStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 640 },
        height: { ideal: 480 },
        facingMode: "user",
        frameRate: { ideal: 30, max: 60 }
      },
      audio: false
    });

    if (isCancelled) {
      activeStream.getTracks().forEach(track => track.stop());
      return { stop: () => {} };
    }

    videoEl.srcObject = activeStream;

    // 4. Wait for video data to load and play
    await new Promise((resolve) => {
      if (videoEl.readyState >= 2) {
        resolve();
      } else {
        videoEl.onloadeddata = () => resolve();
      }
    });

    if (isCancelled) {
      activeStream.getTracks().forEach(track => track.stop());
      return { stop: () => {} };
    }

    try {
      await videoEl.play();
    } catch (playErr) {
      console.warn("Video play interrupted:", playErr);
    }

    if (onStatusChange) onStatusChange("TRACKING_ACTIVE");

    // 5. Main Detection Loop
    const detectLoop = () => {
      if (isCancelled) return;

      if (videoEl && videoEl.readyState >= 2 && !videoEl.paused) {
        const currentTime = videoEl.currentTime;
        if (currentTime !== lastVideoTime) {
          lastVideoTime = currentTime;
          const startTimeMs = performance.now();

          try {
            const results = landmarker.detectForVideo(videoEl, startTimeMs);
            if (onResults && !isCancelled) {
              onResults(results);
            }
          } catch (detectionErr) {
            console.warn("Detection frame error:", detectionErr);
          }
        }
      }

      animFrameId = requestAnimationFrame(detectLoop);
    };

    animFrameId = requestAnimationFrame(detectLoop);

  } catch (err) {
    if (isCancelled) return { stop: () => {} };

    let status = "ERROR";
    if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
      status = "PERMISSION_DENIED";
    } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
      status = "NO_CAMERA_DEVICE";
    } else if (err.name === "NotReadableError") {
      status = "CAMERA_IN_USE";
    }

    if (onStatusChange) onStatusChange(status, err.message);
    if (onError) onError(err, status);
  }

  // Teardown function
  return {
    stop() {
      isCancelled = true;
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
      if (activeStream) {
        activeStream.getTracks().forEach(track => {
          try {
            track.stop();
          } catch (e) {
            // Ignore track stop exceptions
          }
        });
        activeStream = null;
      }
      if (videoEl) {
        videoEl.srcObject = null;
      }
      if (onStatusChange) {
        onStatusChange("STOPPED");
      }
    }
  };
}

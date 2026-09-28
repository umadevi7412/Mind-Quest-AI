/**
 * MindQuest AI - Hand Gesture & Coordinate Utilities
 *
 * Provides:
 * - Natural mirror transformation
 * - Comfort-zone active area scaling
 * - Dynamic velocity-aware smoothing filter
 * - Palm-scale normalized pinch detection
 * - State machine for debounce and transition management
 */

// Landmark indexes according to MediaPipe Hand specification
export const HAND_LANDMARKS = {
  WRIST: 0,
  THUMB_CMC: 1,
  THUMB_MCP: 2,
  THUMB_IP: 3,
  THUMB_TIP: 4,
  INDEX_MCP: 5,
  INDEX_PIP: 6,
  INDEX_DIP: 7,
  INDEX_TIP: 8,
  MIDDLE_MCP: 9,
  MIDDLE_PIP: 10,
  MIDDLE_DIP: 11,
  MIDDLE_TIP: 12,
  RING_MCP: 13,
  RING_PIP: 14,
  RING_DIP: 15,
  RING_TIP: 16,
  PINKY_MCP: 17,
  PINKY_PIP: 18,
  PINKY_DIP: 19,
  PINKY_TIP: 20
};

// Default comfort zone parameters (padding inside camera frame so hand doesn't need to reach camera borders)
export const DEFAULT_COMFORT_ZONE = {
  minX: 0.15,
  maxX: 0.85,
  minY: 0.12,
  maxY: 0.88
};

// Pinch detection thresholds (normalized by palm scale: distance between Wrist and Middle MCP)
export const PINCH_THRESHOLDS = {
  PINCH_IN: 0.36,   // Distance threshold to trigger pinch
  PINCH_OUT: 0.50,  // Distance threshold to release pinch (hysteresis)
  COOLDOWN_MS: 280  // Cooldown between successive clicks
};

/**
 * Calculates 2D Euclidean distance between two points
 */
export function getDistance2D(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

/**
 * Calculates 3D Euclidean distance between two points if z is available
 */
export function getDistance3D(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = (p1.z || 0) - (p2.z || 0);
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Normalizes camera coordinates and mirrors horizontally for natural user interaction.
 * Maps through comfort zone so edges are easily reachable.
 *
 * @param {Object} landmark - { x, y, z } in [0, 1]
 * @param {Object} comfortZone - { minX, maxX, minY, maxY }
 * @returns {Object} { normX, normY } in [0, 1]
 */
export function mapLandmarkToNormalized(landmark, comfortZone = DEFAULT_COMFORT_ZONE) {
  if (!landmark) return { normX: 0.5, normY: 0.5 };

  // Mirror X so moving physical hand right moves cursor right
  const mirroredX = 1 - landmark.x;
  const rawY = landmark.y;

  // Remap through comfort zone with clamping
  const spanX = Math.max(0.1, comfortZone.maxX - comfortZone.minX);
  const spanY = Math.max(0.1, comfortZone.maxY - comfortZone.minY);

  const normX = Math.max(0, Math.min(1, (mirroredX - comfortZone.minX) / spanX));
  const normY = Math.max(0, Math.min(1, (rawY - comfortZone.minY) / spanY));

  return { normX, normY };
}

/**
 * Maps normalized coordinates [0, 1] into target game rectangle screen coordinates.
 *
 * @param {number} normX - [0, 1]
 * @param {number} normY - [0, 1]
 * @param {DOMRect} gameRect - Bounding client rect of game stage
 * @returns {Object} { screenX, screenY }
 */
export function getGameCoordinates(normX, normY, gameRect) {
  if (!gameRect) {
    return {
      screenX: normX * window.innerWidth,
      screenY: normY * window.innerHeight
    };
  }

  const screenX = gameRect.left + normX * gameRect.width;
  const screenY = gameRect.top + normY * gameRect.height;

  // Clamp within game rectangle boundaries
  return {
    screenX: Math.max(gameRect.left, Math.min(gameRect.right, screenX)),
    screenY: Math.max(gameRect.top, Math.min(gameRect.bottom, screenY))
  };
}

/**
 * Creates an adaptive smoother instance for smooth cursor movement without delay.
 * Faster hand movements get lower smoothing (higher alpha) for zero-latency tracking.
 * Slower movements get higher smoothing (lower alpha) for rock-solid stability.
 */
export function createCursorSmoother(baseAlpha = 0.55) {
  let prevX = null;
  let prevY = null;

  return {
    smooth(targetX, targetY, isHighSpeedGame = false) {
      if (prevX === null || prevY === null) {
        prevX = targetX;
        prevY = targetY;
        return { x: targetX, y: targetY };
      }

      const dist = Math.hypot(targetX - prevX, targetY - prevY);

      // Adaptive alpha: boost responsiveness during fast sweeps
      // For Reaction Game, make responsiveness even higher
      const minAlpha = isHighSpeedGame ? 0.65 : 0.40;
      const maxAlpha = isHighSpeedGame ? 0.95 : 0.85;
      const speedBoost = Math.min(0.45, dist / 80);
      const alpha = Math.max(minAlpha, Math.min(maxAlpha, baseAlpha + speedBoost));

      const smoothedX = prevX + (targetX - prevX) * alpha;
      const smoothedY = prevY + (targetY - prevY) * alpha;

      prevX = smoothedX;
      prevY = smoothedY;

      return { x: smoothedX, y: smoothedY };
    },
    reset() {
      prevX = null;
      prevY = null;
    }
  };
}

/**
 * Analyzes hand landmarks to detect pinch gesture and compute pinch strength.
 * Distance is normalized by palm scale (Wrist to Middle MCP) so hand distance from camera
 * does not affect gesture recognition accuracy.
 *
 * @param {Array} landmarks - 21 MediaPipe hand landmarks
 * @returns {Object} { isPinching, pinchDistance, pinchProgress, thumbTip, indexTip }
 */
export function analyzePinch(landmarks) {
  if (!landmarks || landmarks.length < 21) {
    return {
      isPinching: false,
      pinchDistance: 1.0,
      pinchProgress: 0,
      thumbTip: null,
      indexTip: null
    };
  }

  const thumbTip = landmarks[HAND_LANDMARKS.THUMB_TIP];
  const indexTip = landmarks[HAND_LANDMARKS.INDEX_TIP];
  const wrist = landmarks[HAND_LANDMARKS.WRIST];
  const middleMcp = landmarks[HAND_LANDMARKS.MIDDLE_MCP];

  // Palm scale: reference size of player's hand in current frame
  const palmScale = Math.max(0.02, getDistance2D(wrist, middleMcp));

  // Distance between thumb tip and index fingertip
  const rawDistance = getDistance2D(thumbTip, indexTip);
  const pinchDistance = rawDistance / palmScale;

  // Visual pinch progress: 0 when wide open, 1 when pinched
  // Open threshold ~0.65, pinch threshold ~0.36
  const openDist = 0.65;
  const closedDist = PINCH_THRESHOLDS.PINCH_IN;
  const pinchProgress = Math.max(0, Math.min(1, (openDist - pinchDistance) / (openDist - closedDist)));

  return {
    pinchDistance,
    pinchProgress,
    thumbTip,
    indexTip
  };
}

/**
 * Creates a gesture state machine to manage click triggers, debouncing, and release transitions.
 */
export function createGestureStateMachine(options = {}) {
  const pinchInThreshold = options.pinchIn || PINCH_THRESHOLDS.PINCH_IN;
  const pinchOutThreshold = options.pinchOut || PINCH_THRESHOLDS.PINCH_OUT;
  const cooldownMs = options.cooldownMs || PINCH_THRESHOLDS.COOLDOWN_MS;

  let isPinchingState = false;
  let lastClickTimestamp = 0;

  return {
    /**
     * Updates state with current frame pinch distance.
     * Returns true ONLY on transition from OPEN to PINCH after cooldown.
     *
     * @param {number} pinchDistance - Normalized pinch distance
     * @returns {Object} { clickTriggered: boolean, isPinching: boolean }
     */
    update(pinchDistance) {
      const now = Date.now();
      let clickTriggered = false;

      if (!isPinchingState) {
        // Checking for pinch start
        if (pinchDistance <= pinchInThreshold) {
          if (now - lastClickTimestamp >= cooldownMs) {
            isPinchingState = true;
            lastClickTimestamp = now;
            clickTriggered = true;
          }
        }
      } else {
        // Currently pinching - check for release
        if (pinchDistance >= pinchOutThreshold) {
          isPinchingState = false;
        }
      }

      return {
        clickTriggered,
        isPinching: isPinchingState
      };
    },
    reset() {
      isPinchingState = false;
      lastClickTimestamp = 0;
    }
  };
}

import React, { useState, useEffect, useRef, useCallback } from "react";
import { startHandTracking } from "./handTracking";
import {
  mapLandmarkToNormalized,
  getGameCoordinates,
  createCursorSmoother,
  analyzePinch,
  createGestureStateMachine,
  HAND_LANDMARKS
} from "./gestureUtils";
import HandCursor from "./HandCursor";
import HandCameraPreview from "./HandCameraPreview";
import { Hand, MousePointer, Sparkles, HelpCircle } from "lucide-react";

/**
 * HandController - Master reusable component for webcam hand tracking & virtual cursor in games.
 *
 * Props:
 * - gameRef: Ref to the root DOM element of the game stage for bounding rect mapping
 * - gameName: "Focus" | "Memory" | "Reaction" | "Pattern" | "Decision"
 * - onMove: optional callback (normX, normY, screenX, screenY)
 * - onClick: optional callback (screenX, screenY, targetElement)
 * - showToggle: boolean (whether to show the Hand Control ON/OFF bar, default true)
 */
export default function HandController({
  gameRef,
  gameName = "Game",
  onMove,
  onClick,
  showToggle = true
}) {
  // Read saved user preference from localStorage, default to ON
  const [isEnabled, setIsEnabled] = useState(() => {
    const saved = localStorage.getItem("mindquest_hand_control_enabled");
    return saved !== null ? saved === "true" : true;
  });

  const [status, setStatus] = useState("INITIALIZING");
  const [handDetected, setHandDetected] = useState(false);
  const [cursorState, setCursorState] = useState({
    x: -100,
    y: -100,
    visible: false,
    isPinching: false,
    pinchProgress: 0,
    isClicked: false
  });
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const trackingSessionRef = useRef(null);
  const smootherRef = useRef(null);
  const gestureMachineRef = useRef(null);
  const isHighSpeed = gameName.toLowerCase() === "reaction";
  const clickAnimTimeoutRef = useRef(null);
  const lastHoverTargetRef = useRef(null);

  // Initialize smoother and gesture state machine
  useEffect(() => {
    smootherRef.current = createCursorSmoother(isHighSpeed ? 0.75 : 0.55);
    gestureMachineRef.current = createGestureStateMachine({
      cooldownMs: isHighSpeed ? 200 : 280
    });
  }, [isHighSpeed]);

  // Handle ON/OFF toggle
  const handleToggleControl = useCallback(() => {
    setIsEnabled(prev => {
      const next = !prev;
      localStorage.setItem("mindquest_hand_control_enabled", String(next));
      return next;
    });
  }, []);

  // Dispatch synthetic pointer and click events to the DOM element at (x, y)
  const dispatchElementInteraction = useCallback((screenX, screenY) => {
    // Hide cursor from hit testing temporarily if needed (already has pointer-events: none)
    const target = document.elementFromPoint(screenX, screenY);
    if (!target) return;

    // Resolve interactive element (button, link, input, tile, or falling item)
    const interactiveTarget = target.closest(
      'button, [role="button"], input, a, .focus-grid-cell-compact, .memory-choice-btn-compact, .falling-item-wrap-compact, .scrambled-letter-tile, .decision-option-btn, .clickable'
    ) || target;

    // Trigger visual cursor click animation
    setCursorState(prev => ({ ...prev, isClicked: true }));
    if (clickAnimTimeoutRef.current) clearTimeout(clickAnimTimeoutRef.current);
    clickAnimTimeoutRef.current = setTimeout(() => {
      setCursorState(prev => ({ ...prev, isClicked: false }));
    }, 240);

    // Dispatch full pointer and mouse event cascade
    const pointerEventInit = {
      bubbles: true,
      cancelable: true,
      composed: true,
      view: window,
      clientX: screenX,
      clientY: screenY,
      screenX,
      screenY,
      pointerId: 1,
      pointerType: "mouse",
      button: 0,
      buttons: 1
    };

    const mouseEventInit = {
      bubbles: true,
      cancelable: true,
      composed: true,
      view: window,
      clientX: screenX,
      clientY: screenY,
      screenX,
      screenY,
      button: 0,
      buttons: 1
    };

    interactiveTarget.dispatchEvent(new PointerEvent("pointerdown", pointerEventInit));
    interactiveTarget.dispatchEvent(new MouseEvent("mousedown", mouseEventInit));
    interactiveTarget.dispatchEvent(new PointerEvent("pointerup", pointerEventInit));
    interactiveTarget.dispatchEvent(new MouseEvent("mouseup", mouseEventInit));

    // Native .click() invokes React onClick handlers
    if (typeof interactiveTarget.click === "function") {
      interactiveTarget.click();
    } else {
      interactiveTarget.dispatchEvent(new MouseEvent("click", mouseEventInit));
    }

    if (onClick) {
      onClick(screenX, screenY, interactiveTarget);
    }
  }, [onClick]);

  // Main results handler called on each video frame from handTracking.js
  const handleDetectionResults = useCallback((results) => {
    if (!results || !results.landmarks || results.landmarks.length === 0) {
      setHandDetected(false);
      setCursorState(prev => (prev.visible ? { ...prev, visible: false } : prev));
      if (smootherRef.current) smootherRef.current.reset();

      // Clear mini canvas overlay
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
      return;
    }

    // Hand detected! Use primary hand (first hand)
    const landmarks = results.landmarks[0];
    setHandDetected(true);

    // 1. Draw mini visual landmarks on preview canvas (subtle feedback)
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const cw = canvas.width;
        const ch = canvas.height;

        // Draw index tip (landmark 8) and thumb tip (landmark 4)
        const thumb = landmarks[HAND_LANDMARKS.THUMB_TIP];
        const index = landmarks[HAND_LANDMARKS.INDEX_TIP];

        // Draw connection line
        ctx.strokeStyle = "rgba(91, 91, 247, 0.6)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo((1 - thumb.x) * cw, thumb.y * ch);
        ctx.lineTo((1 - index.x) * cw, index.y * ch);
        ctx.stroke();

        // Draw thumb dot
        ctx.fillStyle = "#F59E0B";
        ctx.beginPath();
        ctx.arc((1 - thumb.x) * cw, thumb.y * ch, 4, 0, 2 * Math.PI);
        ctx.fill();

        // Draw index dot
        ctx.fillStyle = "#5B5BF7";
        ctx.beginPath();
        ctx.arc((1 - index.x) * cw, index.y * ch, 5, 0, 2 * Math.PI);
        ctx.fill();
      }
    }

    // 2. Compute index fingertip coordinates
    const indexTip = landmarks[HAND_LANDMARKS.INDEX_TIP];
    const { normX, normY } = mapLandmarkToNormalized(indexTip);

    // 3. Map into game stage coordinates
    const gameEl = gameRef?.current;
    const gameRect = gameEl ? gameEl.getBoundingClientRect() : null;
    const rawCoords = getGameCoordinates(normX, normY, gameRect);

    // 4. Smooth coordinates
    const smoothed = smootherRef.current
      ? smootherRef.current.smooth(rawCoords.screenX, rawCoords.screenY, isHighSpeed)
      : rawCoords;

    // 5. Check hover interaction for games with hover mechanics (e.g. ReactionGame)
    const currentHoverTarget = document.elementFromPoint(smoothed.x, smoothed.y);
    if (currentHoverTarget && currentHoverTarget !== lastHoverTargetRef.current) {
      const hoverItem = currentHoverTarget.closest(".falling-item-wrap-compact");
      if (hoverItem) {
        hoverItem.dispatchEvent(new PointerEvent("pointerenter", {
          bubbles: true,
          cancelable: true,
          clientX: smoothed.x,
          clientY: smoothed.y
        }));
      }
      lastHoverTargetRef.current = currentHoverTarget;
    }

    // 6. Analyze pinch gesture
    const pinchAnalysis = analyzePinch(landmarks);
    const { clickTriggered, isPinching } = gestureMachineRef.current
      ? gestureMachineRef.current.update(pinchAnalysis.pinchDistance)
      : { clickTriggered: false, isPinching: false };

    // Update cursor state
    setCursorState(prev => ({
      ...prev,
      x: Math.round(smoothed.x),
      y: Math.round(smoothed.y),
      visible: true,
      isPinching,
      pinchProgress: pinchAnalysis.pinchProgress
    }));

    if (onMove) {
      onMove(normX, normY, smoothed.x, smoothed.y);
    }

    // 7. Trigger click if gesture detected
    if (clickTriggered) {
      dispatchElementInteraction(smoothed.x, smoothed.y);
    }
  }, [dispatchElementInteraction, gameRef, isHighSpeed, onMove]);

  // Start or stop webcam tracking based on isEnabled state
  useEffect(() => {
    let isCancelled = false;

    if (!isEnabled) {
      // If disabled, stop active tracking session
      if (trackingSessionRef.current) {
        trackingSessionRef.current.stop();
        trackingSessionRef.current = null;
      }
      setStatus("STOPPED");
      setHandDetected(false);
      setCursorState(prev => ({ ...prev, visible: false }));
      return undefined;
    }

    // If enabled, start tracking session
    const video = videoRef.current;
    if (!video) return undefined;

    startHandTracking(video, {
      onResults: (results) => {
        if (!isCancelled) handleDetectionResults(results);
      },
      onStatusChange: (newStatus) => {
        if (!isCancelled) setStatus(newStatus);
      },
      onError: (err, errStatus) => {
        console.warn(`Hand tracking notice (${errStatus}):`, err?.message || err);
      }
    }).then(session => {
      if (isCancelled) {
        if (session) session.stop();
      } else {
        trackingSessionRef.current = session;
      }
    });

    // Cleanup when unmounting or when disabled
    return () => {
      isCancelled = true;
      if (trackingSessionRef.current) {
        trackingSessionRef.current.stop();
        trackingSessionRef.current = null;
      }
      if (clickAnimTimeoutRef.current) {
        clearTimeout(clickAnimTimeoutRef.current);
      }
    };
  }, [isEnabled, handleDetectionResults]);

  return (
    <>
      {/* 1. Header Hand Control Toggle Bar */}
      {showToggle && (
        <div className="hand-control-toggle-bar">
          <div className="hand-toggle-inner">
            <button
              type="button"
              className={`hand-toggle-btn ${isEnabled ? "active-hand" : "active-mouse"}`}
              onClick={handleToggleControl}
              title={isEnabled ? "Switch to standard mouse/keyboard" : "Turn on webcam hand control"}
            >
              <div className="toggle-icon-wrap">
                {isEnabled ? <Hand size={15} /> : <MousePointer size={15} />}
              </div>
              <span className="toggle-label-text">
                🖐 Hand Control: <strong>{isEnabled ? "ON" : "OFF"}</strong>
              </span>
            </button>

            {/* Status indicator badge */}
            <div className={`hand-status-pill status-${status.toLowerCase()}`}>
              <span className="status-bullet" />
              <span className="status-text">
                {isEnabled
                  ? handDetected
                    ? "Hand Detected"
                    : status === "TRACKING_ACTIVE"
                    ? "Looking for Hand..."
                    : "Connecting Camera..."
                  : "Mouse/Keyboard Mode"}
              </span>
            </div>

            {/* Help / Calibration Tooltip Toggle */}
            <button
              type="button"
              className="hand-help-trigger-btn"
              onClick={() => setShowQuickHelp(prev => !prev)}
              title="How to play with hand control"
              aria-label="Hand control help"
            >
              <HelpCircle size={15} />
            </button>
          </div>

          {/* Quick instructions dropdown banner */}
          {showQuickHelp && (
            <div className="hand-quick-help-card animate-fade-in">
              <div className="help-tip-item">
                <span className="tip-icon">☝️</span>
                <span className="tip-text">
                  <strong>Move index finger</strong> to aim cursor at targets
                </span>
              </div>
              <div className="help-tip-item">
                <span className="tip-icon">🤏</span>
                <span className="tip-text">
                  <strong>Pinch thumb + index</strong> to click or select
                </span>
              </div>
              <div className="help-tip-item">
                <span className="tip-icon">⌨️</span>
                <span className="tip-text">
                  Mouse and keyboard always work as fallbacks
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Floating Webcam Preview Window */}
      {isEnabled && (
        <HandCameraPreview
          videoRef={videoRef}
          canvasRef={canvasRef}
          status={status}
          handDetected={handDetected}
          isPinching={cursorState.isPinching}
        />
      )}

      {/* 3. Virtual Hand Cursor Overlay */}
      {isEnabled && (
        <HandCursor
          x={cursorState.x}
          y={cursorState.y}
          visible={cursorState.visible}
          isPinching={cursorState.isPinching}
          pinchProgress={cursorState.pinchProgress}
          isClicked={cursorState.isClicked}
        />
      )}
    </>
  );
}

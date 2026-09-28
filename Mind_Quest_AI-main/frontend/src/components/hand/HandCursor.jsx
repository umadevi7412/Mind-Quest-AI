import React, { memo } from "react";

/**
 * HandCursor - High-performance virtual cursor overlaid on top of the game UI.
 *
 * Features:
 * - Hardware-accelerated translate3d rendering
 * - Dynamic pinch progress ring for intuitive tactile feedback
 * - Visual click ripple / pulse effect
 * - pointer-events: none so it never blocks mouse or DOM interactions
 */
function HandCursor({
  x = -100,
  y = -100,
  visible = false,
  isPinching = false,
  pinchProgress = 0,
  isClicked = false
}) {
  if (!visible) return null;

  // Scale pinch progress into radius/offset for SVG ring
  const circleRadius = 16;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference - pinchProgress * circumference;

  return (
    <div
      className={`hand-virtual-cursor ${isPinching ? "cursor-pinching" : ""} ${isClicked ? "cursor-clicked" : ""}`}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }}
      aria-hidden="true"
    >
      {/* Click ripple animation wave */}
      {isClicked && <div className="cursor-ripple-wave" />}

      {/* Outer ambient glow */}
      <div className="cursor-ambient-glow" />

      {/* SVG Pinch Progress Ring */}
      <svg className="cursor-pinch-svg" width="44" height="44" viewBox="0 0 44 44">
        {/* Track circle */}
        <circle
          cx="22"
          cy="22"
          r={circleRadius}
          className="cursor-track-circle"
        />
        {/* Progress circle */}
        <circle
          cx="22"
          cy="22"
          r={circleRadius}
          className="cursor-progress-circle"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>

      {/* Center target crosshair pointer */}
      <div className="cursor-center-dot" />

      {/* Gesture icon badge when near pinch */}
      {pinchProgress > 0.4 && (
        <span className="cursor-gesture-hint">
          {isPinching ? "TAP!" : "PINCH"}
        </span>
      )}
    </div>
  );
}

export default memo(HandCursor);

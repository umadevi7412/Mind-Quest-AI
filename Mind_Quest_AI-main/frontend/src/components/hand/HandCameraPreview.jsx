import React, { useState } from "react";
import { Camera, Eye, EyeOff, Minimize2, Maximize2, AlertTriangle, CheckCircle2 } from "lucide-react";

/**
 * HandCameraPreview - Small floating webcam preview box.
 *
 * Features:
 * - Mirrored video feed for natural user feedback
 * - Mini canvas overlay showing tracked fingertips
 * - Clear status badges for permissions and tracking state
 * - Collapsible into a compact badge so it never obstructs gameplay
 */
export default function HandCameraPreview({
  videoRef,
  canvasRef,
  status = "LOADING",
  handDetected = false,
  isPinching = false,
  isCollapsed = false,
  onToggleCollapse
}) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = isCollapsed !== undefined && onToggleCollapse ? isCollapsed : internalCollapsed;

  const toggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!collapsed);
    } else {
      setInternalCollapsed(prev => !prev);
    }
  };

  // Status message mapping
  let statusBadge = {
    color: "#F59E0B",
    text: "Initializing...",
    icon: Camera
  };

  if (status === "LOADING_MODEL") {
    statusBadge = { color: "#8B5CF6", text: "Loading AI Model...", icon: Camera };
  } else if (status === "REQUESTING_CAMERA") {
    statusBadge = { color: "#3B82F6", text: "Requesting Camera...", icon: Camera };
  } else if (status === "TRACKING_ACTIVE") {
    if (handDetected) {
      statusBadge = isPinching
        ? { color: "#10B981", text: "🤏 Pinch Click!", icon: CheckCircle2 }
        : { color: "#10B981", text: "🟢 Hand Active", icon: CheckCircle2 };
    } else {
      statusBadge = { color: "#F59E0B", text: "👋 Show your hand", icon: Eye };
    }
  } else if (status === "PERMISSION_DENIED") {
    statusBadge = { color: "#EF4444", text: "Camera Blocked — Mouse Mode", icon: AlertTriangle };
  } else if (status === "NO_CAMERA_DEVICE") {
    statusBadge = { color: "#EF4444", text: "No Camera — Mouse Mode", icon: AlertTriangle };
  } else if (status === "STOPPED") {
    statusBadge = { color: "#64748B", text: "Camera Off", icon: EyeOff };
  }

  const StatusIcon = statusBadge.icon;

  if (collapsed) {
    return (
      <div className="hand-preview-collapsed-pill" onClick={toggleCollapse} title="Expand camera preview">
        <StatusIcon size={14} style={{ color: statusBadge.color }} />
        <span className="collapsed-text">{statusBadge.text}</span>
        <Maximize2 size={13} className="collapsed-expand-icon" />
      </div>
    );
  }

  return (
    <div className="hand-camera-preview-floating">
      {/* Top title bar */}
      <div className="hand-preview-header">
        <div className="preview-header-left">
          <StatusIcon size={13} style={{ color: statusBadge.color }} />
          <span className="preview-status-text" style={{ color: statusBadge.color }}>
            {statusBadge.text}
          </span>
        </div>
        <button
          type="button"
          className="preview-minimize-btn"
          onClick={toggleCollapse}
          title="Minimize camera preview"
          aria-label="Minimize preview"
        >
          <Minimize2 size={13} />
        </button>
      </div>

      {/* Video stream container with overlay canvas */}
      <div className="hand-preview-viewport">
        <video
          ref={videoRef}
          className="hand-preview-video"
          playsInline
          muted
          autoPlay
        />
        <canvas
          ref={canvasRef}
          className="hand-preview-canvas"
          width="160"
          height="120"
        />

        {/* Hand Guide Silhouette when no hand is detected */}
        {status === "TRACKING_ACTIVE" && !handDetected && (
          <div className="hand-guide-overlay">
            <span className="guide-hand-emoji">✋</span>
            <span className="guide-hint-text">Raise hand in view</span>
          </div>
        )}

        {/* Permission Request Banner */}
        {status === "REQUESTING_CAMERA" && (
          <div className="hand-preview-overlay-msg">
            <Camera size={22} className="animate-pulse" />
            <p>Allow camera access to use hand control</p>
          </div>
        )}

        {/* Permission Denied Banner */}
        {status === "PERMISSION_DENIED" && (
          <div className="hand-preview-overlay-msg error-msg">
            <AlertTriangle size={22} />
            <p>Camera denied. Play with mouse/keyboard!</p>
          </div>
        )}
      </div>

      {/* Bottom quick tips */}
      <div className="hand-preview-footer">
        <span>☝️ Move index finger</span>
        <span className="footer-dot">•</span>
        <span>🤏 Pinch to click</span>
      </div>
    </div>
  );
}

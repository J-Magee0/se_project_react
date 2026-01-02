import React, { useEffect } from "react";
import "./Message.css";

export default function Message({
  message,
  type = "info",
  onClose,
  duration = 4000,
}) {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => {
      if (onClose) onClose();
    }, duration);
    return () => clearTimeout(id);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`message message_${type}`} role="status">
      <span className="message__text">{message}</span>
      <button
        className="message__close"
        onClick={onClose}
        aria-label="Close message"
      >
        ×
      </button>
    </div>
  );
}

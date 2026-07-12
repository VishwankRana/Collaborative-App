import { useEffect } from "react";

import ChatPanel from "./ChatPanel";

export default function ChatModal({ open, onClose, readOnly = false, roomId }) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="cs-chat-modal" role="dialog" aria-modal="true" aria-label="Interview chat">
      <button
        type="button"
        className="cs-chat-modal-backdrop"
        aria-label="Close chat"
        onClick={onClose}
      />
      <div className="cs-chat-modal-panel">
        <ChatPanel modal readOnly={readOnly} roomId={roomId} onClose={onClose} />
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import css from "./Modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={css.modalOverlay} onClick={handleOverlayClick}>
      <div className={css.modalContent}>
        <button className={css.closeBtn} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}

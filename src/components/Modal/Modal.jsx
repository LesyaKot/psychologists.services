import React from "react";
import ReactDOM from "react-dom";
import css from './Modal.module.css';

export default function Modal ({ isOpen, onClose, children }){

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div className={css.modalOverlay} onClick={handleOverlayClick}>
      <div className={css.modalContent}>
        <button className={css.closeBtn} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};


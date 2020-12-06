import React from "react";

function Modal({ infoContent, onClose }) {
  return (
    <div className="modal">
      <div className="close-container" onClick={onClose}>
        <span className="modal-x">X</span>
      </div>
      <p>{infoContent}</p>
    </div>
  );
}

export default Modal;

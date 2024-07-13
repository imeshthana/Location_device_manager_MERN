import React from 'react'
import './confirmationModel.css'

const ConfirmationModal = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <p className="modal-message">{message}</p>
          <div className="modal-buttons">
          <button  className="modal-btn" onClick={onConfirm}>Yes</button>
          <button  className="modal-btn" onClick={onCancel}>No</button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationModal;
  
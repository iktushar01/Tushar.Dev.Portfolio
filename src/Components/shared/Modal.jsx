import React, { useEffect } from "react";
import ReactModal from "react-modal";
import { FiX } from "react-icons/fi";
import "./Modal.css";

// Set the app element for accessibility (optional but recommended)
ReactModal.setAppElement("#root");

const Modal = ({ isOpen, onClose, children, maxWidth = "max-w-4xl", className = "" }) => {
  // Prevent body scroll when modal is open (react-modal handles this, but keeping for backup)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(4px)",
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1rem",
    },
    content: {
      position: "relative",
      inset: "auto",
      width: "100%",
      maxWidth: maxWidth === "max-w-4xl" ? "896px" : maxWidth === "max-w-6xl" ? "1152px" : "auto",
      margin: "2rem 0",
      padding: 0,
      background: "#1f2937",
      borderRadius: "0.5rem",
      border: "none",
      outline: "none",
      maxHeight: "90vh",
      overflow: "visible",
    },
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      closeTimeoutMS={300}
      className={`modal-content ${className}`}
      overlayClassName="modal-overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      aria={{
        labelledby: "modal-title",
        describedby: "modal-description",
      }}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white z-50 bg-gray-900 rounded-full p-2 transition-colors duration-200 hover:bg-gray-800"
        aria-label="Close modal"
      >
        <FiX size={24} />
      </button>

      <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
        {children}
      </div>
    </ReactModal>
  );
};

export default Modal;


import React from "react";
import "./SubmitResultModal.css";

export default function SubmitResultModal({
  isOpen,
  onClose,
  numNodes,
  numEdges,
  isDag,
}) {
  if (!isOpen) return null;

  return (
    <div className="toast-container">
      <div className="toast-header">
        <h2>Pipeline Analysis Result</h2>
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="toast-body">
        <div className="stat-item">
          <span className="stat-label">Number of Nodes:</span>
          <span className="stat-value">{numNodes}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Number of Edges:</span>
          <span className="stat-value">{numEdges}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Is DAG?</span>
          <span
            className={`stat-value badge ${isDag ? "badge-success" : "badge-error"}`}
          >
            {isDag ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
}

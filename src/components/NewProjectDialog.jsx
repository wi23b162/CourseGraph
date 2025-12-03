// src/components/NewProjectDialog.jsx
import React from "react";

/**
 * Simple confirmation dialog to start a new project.
 * It warns the user that all nodes/edges (and auto-save) will be cleared.
 */
function NewProjectDialog({ onConfirm, onCancel }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.35)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          padding: "24px 28px",
          width: "420px",
          boxShadow: "0 20px 30px rgba(15,23,42,0.25)",
        }}
      >
        <h2
          style={{
            margin: 0,
            marginBottom: "12px",
            fontSize: "20px",
            fontWeight: 600,
            color: "#111827",
          }}
        >
          Start a new project?
        </h2>

        <p
          style={{
            margin: 0,
            marginBottom: "16px",
            fontSize: "14px",
            lineHeight: 1.5,
            color: "#4b5563",
          }}
        >
          This will clear all learning outcomes, assessments and connections
          from the canvas and reset the auto-saved project.
        </p>

        <p
          style={{
            margin: 0,
            marginBottom: "20px",
            fontSize: "13px",
            color: "#b45309",
            background: "#fffbeb",
            padding: "8px 10px",
            borderRadius: "8px",
          }}
        >
          This action cannot be undone.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          <button
            onClick={onCancel}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              background: "white",
              cursor: "pointer",
              fontSize: "14px",
              color: "#4b5563",
            }}
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#ef4444",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 500,
              color: "white",
            }}
          >
            🚀 Start New Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewProjectDialog;

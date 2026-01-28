import React from 'react';

/**
 * Action buttons for adding nodes, save/load, and export
 */
const ActionButtons = ({
  onAddLEO,
  onAddAssessment,
  onSaveLoad,
  onExportPNG,
  onExportExcel,
  isExportingPNG,
  isExportingExcel,
}) => {
  return (
    <>
      <button
        onClick={onAddLEO}
        style={{
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        + Add LEO
      </button>
      <button
        onClick={onAddAssessment}
        style={{
          background: 'white',
          color: '#3b82f6',
          border: '2px solid #3b82f6',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        + Assessment
      </button>
      <button
        onClick={onSaveLoad}
        style={{
          background: 'white',
          color: '#64748b',
          border: '2px solid #e2e8f0',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        💾 Save / Load
      </button>

      <div style={{ width: '1px', height: '32px', background: '#e2e8f0', marginLeft: '10px', marginRight: '10px' }} />

      <button
        onClick={onExportPNG}
        disabled={isExportingPNG}
        style={{
          background: isExportingPNG
            ? 'linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)'
            : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: isExportingPNG ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginLeft: '8px',
          opacity: isExportingPNG ? 0.7 : 1,
        }}
        title="Export as PNG image"
      >
        {isExportingPNG ? (
          <>
            <span>⏳</span>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <span>📸</span>
            <span>PNG</span>
          </>
        )}
      </button>

      <button
        onClick={onExportExcel}
        disabled={isExportingExcel}
        style={{
          background: isExportingExcel
            ? 'linear-gradient(135deg, #059669 0%, #047857 100%)'
            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: isExportingExcel ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          marginLeft: '8px',
          opacity: isExportingExcel ? 0.7 : 1,
        }}
        title="Export as Excel spreadsheet"
      >
        {isExportingExcel ? (
          <>
            <span>⏳</span>
            <span>Exporting...</span>
          </>
        ) : (
          <>
            <span>📊</span>
            <span>Excel</span>
          </>
        )}
      </button>
    </>
  );
};

export default ActionButtons;

import React from 'react';

/**
 * Zoom controls component (zoom in/out/fit view)
 */
const ZoomControls = ({ zoomLevel, handleZoomIn, handleZoomOut, handleFitView }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
        marginLeft: '10px',
      }}
    >
      <button
        onClick={handleZoomOut}
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          width: '32px',
          height: '32px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.target.style.background = '#f8fafc')}
        onMouseLeave={(e) => (e.target.style.background = 'white')}
        title="Zoom out"
        aria-label="Zoom out"
      >
        −
      </button>
      <button
        onClick={handleFitView}
        style={{
          fontSize: '14px',
          color: '#64748b',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          padding: '4px 12px',
          cursor: 'pointer',
          fontWeight: '500',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.target.style.background = '#f8fafc')}
        onMouseLeave={(e) => (e.target.style.background = 'white')}
        title="Fit view"
      >
        {zoomLevel} %
      </button>
      <button
        onClick={handleZoomIn}
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '4px',
          width: '32px',
          height: '32px',
          cursor: 'pointer',
          fontSize: '16px',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.target.style.background = '#f8fafc')}
        onMouseLeave={(e) => (e.target.style.background = 'white')}
        title="Zoom in"
        aria-label="Zoom in"
      >
        +
      </button>
    </div>
  );
};

export default ZoomControls;

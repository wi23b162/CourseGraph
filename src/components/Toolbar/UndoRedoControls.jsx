import React from 'react';

/**
 * Undo/Redo controls component
 */
const UndoRedoControls = ({ handleUndo, handleRedo, canUndo, canRedo }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '6px',
        alignItems: 'center',
        marginLeft: '15px',
        borderLeft: '1px solid #e2e8f0',
        paddingLeft: '15px',
      }}
    >
      <button
        onClick={handleUndo}
        disabled={!canUndo}
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          width: '36px',
          height: '36px',
          cursor: canUndo ? 'pointer' : 'not-allowed',
          fontSize: '18px',
          transition: 'all 0.2s',
          opacity: canUndo ? 1 : 0.4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          if (canUndo) e.target.style.background = '#f8fafc';
        }}
        onMouseLeave={(e) => (e.target.style.background = 'white')}
        title="Undo (Ctrl+Z)"
        aria-label="Undo (Ctrl+Z)"
      >
        ↶
      </button>
      <button
        onClick={handleRedo}
        disabled={!canRedo}
        style={{
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          width: '36px',
          height: '36px',
          cursor: canRedo ? 'pointer' : 'not-allowed',
          fontSize: '18px',
          transition: 'all 0.2s',
          opacity: canRedo ? 1 : 0.4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          if (canRedo) e.target.style.background = '#f8fafc';
        }}
        onMouseLeave={(e) => (e.target.style.background = 'white')}
        title="Redo (Ctrl+Y)"
        aria-label="Redo (Ctrl+Y)"
      >
        ↷
      </button>
    </div>
  );
};

export default UndoRedoControls;

import React from 'react';

/**
 * Empty state display when no nodes exist
 */
const EmptyGraphState = ({ onAddLEO }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#64748b',
      }}
    >
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: '#3b82f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: '500',
          marginBottom: '30px',
        }}
      >
        Your course is empty
      </div>
      <h3
        style={{
          fontSize: '20px',
          fontWeight: '500',
          margin: '0 0 20px 0',
          color: '#1e293b',
        }}
      >
        Start by adding Learning Outcomes
      </h3>
      <button
        onClick={onAddLEO}
        style={{
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          padding: '12px 24px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
        }}
      >
        + Add LEO
      </button>
    </div>
  );
};

export default EmptyGraphState;

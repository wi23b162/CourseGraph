import React from 'react';

/**
 * Editable project name display component
 */
const ProjectNameDisplay = ({
  projectName,
  isEditingName,
  handleNameClick,
  handleNameChange,
  handleNameBlur,
  handleKeyDown,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginLeft: 'auto',
        padding: '8px 16px',
        background: '#f8fafc',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
      }}
    >
      {isEditingName ? (
        <input
          value={projectName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            border: '1px solid #3b82f6',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '14px',
            outline: 'none',
            minWidth: '200px',
          }}
        />
      ) : (
        <div
          onClick={handleNameClick}
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span style={{ fontWeight: 500, fontSize: '14px' }}>Project: </span>
          <span style={{ fontSize: '14px', color: '#1e293b' }}>{projectName}</span>
          <span style={{ color: '#94a3b8', fontSize: '14px' }}>✏️</span>
        </div>
      )}
    </div>
  );
};

export default ProjectNameDisplay;

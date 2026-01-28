import React from 'react';
import ProjectNameDisplay from './ProjectNameDisplay';

/**
 * Project header component (Auto Layout, New Project, Project Name)
 */
const ProjectHeader = ({ onAutoLayout, onNewProject, projectName }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '10px',
        margin: '10px 20px',
        alignItems: 'center',
      }}
    >
      <button
        onClick={onAutoLayout}
        style={{
          background: 'white',
          color: '#0f172a',
          border: '2px solid #e2e8f0',
          padding: '10px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        🔀 Auto Layout
      </button>

      <button
        onClick={onNewProject}
        style={{
          background: 'white',
          color: '#b91c1c',
          border: '2px solid #fecaca',
          padding: '10px 16px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        New Project
      </button>

      <ProjectNameDisplay {...projectName} />
    </div>
  );
};

export default ProjectHeader;

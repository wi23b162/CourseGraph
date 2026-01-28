import React from 'react';

/**
 * Left sidebar component for course structure (LEOs and Assessments)
 */
const LeftSidebar = ({
  isLeftSidebarOpen,
  setIsLeftSidebarOpen,
  leoNodes,
  assessmentNodes,
  selectedNode,
  setSelectedNode,
  setSelectedEdge,
  leoExpanded,
  setLeoExpanded,
  assessmentExpanded,
  setAssessmentExpanded
}) => {
  return (
    <div
      style={{
        width: isLeftSidebarOpen ? '280px' : '40px',
        minWidth: isLeftSidebarOpen ? '280px' : '40px',
        maxWidth: isLeftSidebarOpen ? '280px' : '40px',
        background: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease',
        flexShrink: 0,
      }}
    >
      {/* Header with Toggle Button */}
      <div
        style={{
          height: '48px',
          borderBottom: isLeftSidebarOpen ? '1px solid #e2e8f0' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isLeftSidebarOpen ? 'space-between' : 'center',
          padding: isLeftSidebarOpen ? '0 10px' : '0',
          flexShrink: 0,
        }}
      >
        {isLeftSidebarOpen && (
          <span
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#64748b',
            }}
          >
            Course Structure
          </span>
        )}
        <button
          onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '4px',
            width: '28px',
            height: '28px',
            cursor: 'pointer',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          title={isLeftSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
          aria-label={isLeftSidebarOpen ? 'Collapse course structure sidebar' : 'Expand course structure sidebar'}
          aria-expanded={isLeftSidebarOpen}
        >
          {isLeftSidebarOpen ? '◀' : '▶'}
        </button>
      </div>

      <div
        style={{
          padding: '20px',
          overflow: 'auto',
          flexGrow: 1,
          display: isLeftSidebarOpen ? 'block' : 'none',
        }}
      >
        {/* Learning Outcomes */}
        <div style={{ marginBottom: '20px' }}>
          <div
            onClick={() => setLeoExpanded(!leoExpanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
          >
            <span style={{ marginRight: '8px' }}>{leoExpanded ? '▼' : '▶'}</span>
            <span style={{ fontWeight: '500', color: '#1e293b' }}>
              Learning Outcomes ({leoNodes.length})
            </span>
          </div>
          {leoExpanded && (
            <div style={{ paddingLeft: '24px' }}>
              {leoNodes.map((node, idx) => (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNode(node);
                    setSelectedEdge(null);
                  }}
                  style={{
                    padding: '8px',
                    marginBottom: '4px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: selectedNode?.id === node.id ? '#eff6ff' : 'transparent',
                    fontSize: '14px',
                    color: '#64748b',
                  }}
                >
                  ├─ LEO-{idx + 1}: {node.data.label.toLowerCase().replace(/_/g, ' ')}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Assessments */}
        <div>
          <div
            onClick={() => setAssessmentExpanded(!assessmentExpanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
              cursor: 'pointer',
            }}
          >
            <span style={{ marginRight: '8px' }}>{assessmentExpanded ? '▼' : '▶'}</span>
            <span style={{ fontWeight: '500', color: '#1e293b' }}>
              Assessments ({assessmentNodes.length})
            </span>
          </div>
          {assessmentExpanded && (
            <div style={{ paddingLeft: '24px' }}>
              {assessmentNodes.map((node, idx) => (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNode(node);
                    setSelectedEdge(null);
                  }}
                  style={{
                    padding: '8px',
                    marginBottom: '4px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: selectedNode?.id === node.id ? '#f0fdf4' : 'transparent',
                    fontSize: '14px',
                    color: '#64748b',
                  }}
                >
                  ├─ {node.data.label.toLowerCase().replace(/_/g, ' ')}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;

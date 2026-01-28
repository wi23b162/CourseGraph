import React from 'react';
import NodeProperties from '../NodeProperties';

/**
 * Right sidebar component for node/edge properties
 */
const RightSidebar = ({
  isRightSidebarOpen,
  setIsRightSidebarOpen,
  selectedNode,
  selectedEdge,
  nodes,
  edges,
  onDeleteEdge,
  onEditNode,
  onEditConnection
}) => {
  return (
    <div
      style={{
        width: isRightSidebarOpen ? '320px' : '40px',
        minWidth: isRightSidebarOpen ? '320px' : '40px',
        maxWidth: isRightSidebarOpen ? '320px' : '40px',
        background: '#ffffff',
        borderLeft: '1px solid #e2e8f0',
        overflow: 'hidden',
        transition: 'width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
      }}
    >
      {/* Header with Toggle Button */}
      <div
        style={{
          height: '48px',
          borderBottom: isRightSidebarOpen ? '1px solid #e2e8f0' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: isRightSidebarOpen ? 'flex-start' : 'center',
          padding: isRightSidebarOpen ? '0 10px' : '0',
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
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
          title={isRightSidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {isRightSidebarOpen ? '▶' : '◀'}
        </button>
        {isRightSidebarOpen && (
          <span
            style={{
              marginLeft: '10px',
              fontSize: '18px',
              fontWeight: '600',
              color: '#64748b',
            }}
          >
            Properties
          </span>
        )}
      </div>

      <div
        style={{
          overflow: 'auto',
          flexGrow: 1,
          display: isRightSidebarOpen ? 'block' : 'none',
        }}
      >
        <NodeProperties
          node={selectedNode}
          edge={selectedEdge}
          nodes={nodes}
          edges={edges}
          onDeleteEdge={onDeleteEdge}
          onEditNode={onEditNode}
          onEditConnection={onEditConnection}
        />
      </div>
    </div>
  );
};

export default RightSidebar;

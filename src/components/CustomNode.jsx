import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ id, data, isConnectable }) => {
  // Node colors based on type and level
  const getNodeColor = () => {
    if (data.nodeType === 'assessment') {
      return {
        background: '#ec4899', // pink
        border: '#db2777',
        text: '#ffffff'
      };
    }
    
    // LEO nodes - color by level
    const level = data.level || 3;
    if (level <= 2) {
      return { background: '#3b82f6', border: '#2563eb', text: '#ffffff' }; // blue
    } else if (level <= 4) {
      return { background: '#10b981', border: '#059669', text: '#ffffff' }; // green
    } else {
      return { background: '#eab308', border: '#ca8a04', text: '#000000' }; // yellow
    }
  };

  const colors = getNodeColor();

  const handleDelete = () => {
    if (data.onDelete && window.confirm('Delete this node?')) {
      data.onDelete(id);
    }
  };

  const nodeStyle = {
    padding: '16px',
    borderRadius: '8px',
    border: `3px solid ${colors.border}`,
    background: colors.background,
    color: colors.text,
    minWidth: '200px',
    maxWidth: '280px',
    fontSize: '13px',
    fontWeight: '600',
    position: 'relative',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={nodeStyle}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ 
          background: '#64748b',
          width: '10px',
          height: '10px',
          border: '2px solid white'
        }}
      />
      
      {/* Node ID Badge */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        background: 'white',
        color: colors.border,
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        border: `2px solid ${colors.border}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {data.nodeId || `${id}`}
      </div>

      {/* Level Badge (for LEOs) */}
      {data.nodeType === 'leo' && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '-8px',
          background: 'white',
          color: colors.border,
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: 'bold',
          border: `2px solid ${colors.border}`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {data.level || 3}
        </div>
      )}

      {/* Label - Uppercase */}
      <div style={{ 
        marginBottom: '8px', 
        fontSize: '14px',
        fontWeight: '700',
        letterSpacing: '0.5px',
        lineHeight: '1.3'
      }}>
        {data.label}
      </div>

      {/* Description */}
      {data.description && (
        <div style={{
          fontSize: '12px',
          fontWeight: '400',
          opacity: 0.9,
          lineHeight: '1.4',
          marginTop: '8px'
        }}>
          {data.description}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ 
          background: '#64748b',
          width: '10px',
          height: '10px',
          border: '2px solid white'
        }}
      />
    </div>
  );
};

export default memo(CustomNode);
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
  const isAssessment = data.nodeType === 'assessment';

  const nodeStyle = {
    padding: '16px',
    borderRadius: isAssessment ? '4px' : '16px', // Assessment: square, LEO: rounded
    border: isAssessment
      ? `4px dashed ${colors.border}` // Assessment: dashed line
      : `3px solid ${colors.border}`, // LEO: solid line
    background: colors.background,
    color: colors.text,
    minWidth: '200px',
    maxWidth: '280px',
    fontSize: '13px',
    fontWeight: '600',
    position: 'relative',
    boxShadow: isAssessment
      ? '0 4px 12px -1px rgba(236, 72, 153, 0.4)' // Assessment: pink shadow
      : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={nodeStyle}>

      {/* TOP: incoming + outgoing */}
      <Handle type="target" position={Position.Top} id="t-in" isConnectable />
      <Handle type="source" position={Position.Top} id="t-out" isConnectable />

      {/* RIGHT: incoming + outgoing */}
      <Handle type="target" position={Position.Right} id="r-in" isConnectable />
      <Handle type="source" position={Position.Right} id="r-out" isConnectable />

      {/* BOTTOM: incoming + outgoing */}
      <Handle type="target" position={Position.Bottom} id="b-in" isConnectable />
      <Handle type="source" position={Position.Bottom} id="b-out" isConnectable />

      {/* LEFT: incoming + outgoing */}
      <Handle type="target" position={Position.Left} id="l-in" isConnectable />
      <Handle type="source" position={Position.Left} id="l-out" isConnectable />


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

      {/* Type Badge - for accessibility (not just color) */}
      <div style={{
        position: 'absolute',
        top: '-10px',
        left: '-10px',
        background: isAssessment ? colors.background : 'white',
        color: isAssessment ? 'white' : colors.border,
        padding: '4px 10px',
        borderRadius: isAssessment ? '4px' : '12px',
        fontSize: '11px',
        fontWeight: 'bold',
        border: isAssessment
          ? 'none'
          : `2px solid ${colors.border}`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '4px'
      }}>
        {isAssessment ? (
          <span>A</span>
        ) : (
          <>
            <span style={{ fontSize: '12px' }}>&#9679;</span>
            <span>L{data.level || 3}</span>
          </>
        )}
      </div>

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



    </div>
  );
};

export default memo(CustomNode);
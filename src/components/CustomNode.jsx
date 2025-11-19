import React, { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ id, data, isConnectable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (data.onLabelChange) {
      data.onLabelChange(id, label);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const handleDelete = () => {
    if (data.onDelete && window.confirm('Diesen Node wirklich löschen?')) {
      data.onDelete(id);
    }
  };

  // Styling basierend auf Node-Typ
  const nodeStyle = {
    padding: '12px 20px',
    borderRadius: '8px',
    border: '2px solid',
    background: data.type === 'leo' ? '#3b82f6' : '#10b981',
    borderColor: data.type === 'leo' ? '#2563eb' : '#059669',
    color: 'white',
    minWidth: '180px',
    fontSize: '14px',
    fontWeight: '500',
    position: 'relative',
  };

  return (
    <div style={nodeStyle} onDoubleClick={handleDoubleClick}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        style={{ background: '#64748b' }}
      />
      
      {/* Node-Typ Badge */}
      <div style={{
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        background: 'white',
        color: data.type === 'leo' ? '#2563eb' : '#059669',
        padding: '2px 8px',
        borderRadius: '12px',
        fontSize: '10px',
        fontWeight: 'bold',
        border: '1px solid currentColor'
      }}>
        {data.type === 'leo' ? 'LEO' : 'Assessment'}
      </div>

      {/* Label (editierbar) */}
      {isEditing ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          style={{
            background: 'rgba(255,255,255,0.9)',
            color: '#1e293b',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            width: '100%',
            fontSize: '14px',
          }}
        />
      ) : (
        <div style={{ marginBottom: '8px', textAlign: 'center' }}>
          {label}
        </div>
      )}

      {/* Action Buttons */}
      {!isEditing && (
        <div style={{
          display: 'flex',
          gap: '6px',
          justifyContent: 'center',
          marginTop: '8px'
        }}>
          <button
            onClick={handleDoubleClick}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer',
            }}
            title="Bearbeiten"
          >
            ✏️ Edit
          </button>
          <button
            onClick={handleDelete}
            style={{
              background: 'rgba(239, 68, 68, 0.8)',
              border: '1px solid rgba(220, 38, 38, 0.8)',
              color: 'white',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '11px',
              cursor: 'pointer',
            }}
            title="Löschen"
          >
            🗑️ Delete
          </button>
        </div>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        style={{ background: '#64748b' }}
      />
    </div>
  );
};

export default memo(CustomNode);
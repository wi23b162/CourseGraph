import React, { useState } from 'react';

const EdgeTypeDialog = ({ sourceNode, targetNode, onConfirm, onCancel }) => {
  const [edgeType, setEdgeType] = useState('implies');

  const handleConfirm = () => {
    onConfirm(edgeType);
  };

  const edgeTypes = [
    {
      id: 'requires',
      label: 'requires',
      description: 'Source requires target (prerequisite)',
      color: '#f97316',
      icon: '↑'
    },
    {
      id: 'implies',
      label: 'implies / enables',
      description: 'Source enables target',
      color: '#3b82f6',
      icon: '→'
    },
    {
      id: 'tests',
      label: 'tested by',
      description: 'Source is tested by target',
      color: '#10b981',
      icon: '✓'
    }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        minWidth: '500px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#1e293b',
            fontSize: '24px',
            fontWeight: '600'
          }}>
            Connection Type
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            ✕
          </button>
        </div>

        {/* Connection Preview */}
        <div style={{
          background: '#f8fafc',
          padding: '16px',
          borderRadius: '8px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <div style={{
            flex: 1,
            background: sourceNode.data.nodeType === 'leo' ? '#3b82f6' : '#ec4899',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {sourceNode.data.label.substring(0, 20)}...
          </div>
          
          <div style={{ fontSize: '24px', color: '#94a3b8' }}>
            →
          </div>
          
          <div style={{
            flex: 1,
            background: targetNode.data.nodeType === 'leo' ? '#3b82f6' : '#ec4899',
            color: 'white',
            padding: '8px 12px',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: '600',
            textAlign: 'center'
          }}>
            {targetNode.data.label.substring(0, 20)}...
          </div>
        </div>

        {/* Connection Type Selection */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600', 
            color: '#1e293b',
            fontSize: '14px'
          }}>
            Select relationship:
          </label>
          
          {edgeTypes.map(type => (
            <label
              key={type.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px',
                marginBottom: '8px',
                border: edgeType === type.id ? `2px solid ${type.color}` : '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                background: edgeType === type.id ? `${type.color}10` : 'white',
                transition: 'all 0.2s'
              }}
            >
              <input
                type="radio"
                value={type.id}
                checked={edgeType === type.id}
                onChange={(e) => setEdgeType(e.target.value)}
                style={{ marginRight: '12px', cursor: 'pointer' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ 
                  fontWeight: '600', 
                  color: type.color,
                  marginBottom: '4px',
                  fontSize: '15px'
                }}>
                  {type.icon} {type.label}
                </div>
                <div style={{ 
                  fontSize: '13px', 
                  color: '#64748b' 
                }}>
                  {type.description}
                </div>
              </div>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: type.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                {type.icon}
              </div>
            </label>
          ))}
        </div>

        {/* Tip */}
        <div style={{
          background: '#fef3c7',
          padding: '12px',
          borderRadius: '6px',
          marginBottom: '20px',
          fontSize: '13px',
          color: '#78350f'
        }}>
          💡 Tip: You can change the connection type later in the Properties panel
        </div>

        {/* Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '12px', 
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 24px',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              background: 'white',
              color: '#64748b',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              padding: '10px 24px',
              border: 'none',
              borderRadius: '6px',
              background: '#3b82f6',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px'
            }}
          >
            Create Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default EdgeTypeDialog;
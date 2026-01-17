import React, { useState, useEffect, useRef } from 'react';

const EditConnectionDialog = ({ edge, sourceNode, targetNode, onSave, onDelete, onCancel }) => {
  const [selectedType, setSelectedType] = useState(edge.data?.edgeType || 'implies');
  const dialogRef = useRef(null);

  // Handle ESC key to close dialog and ENTER to save
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onSave(selectedType);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel, onSave, selectedType]);

  const edgeTypes = [
    { value: 'requires', label: '↑ requires', color: '#f97316', description: 'Source requires target' },
    { value: 'implies', label: '→ enables', color: '#3b82f6', description: 'Source enables target' },
    { value: 'tests', label: '✓ tested by', color: '#10b981', description: 'Source tested by target' }
  ];

  const handleSave = () => {
    onSave(selectedType);
  };

  const handleDelete = () => {
    if (window.confirm('Delete this connection?')) {
      onDelete();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-connection-dialog-title"
    >
      <div
        ref={dialogRef}
        style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          width: '90%',
          maxWidth: '500px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="edit-connection-dialog-title"
          style={{
            fontSize: '22px',
            fontWeight: '700',
            margin: '0 0 8px 0',
            color: '#1e293b',
          }}
        >
          Edit Connection
        </h2>

        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 24px 0' }}>
          Modify the connection type between these nodes
        </p>

        {/* Connection Info */}
        <div style={{
          background: '#f8fafc',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ marginBottom: '12px' }}>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>
              FROM
            </div>
            <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
              {sourceNode?.data.label.toLowerCase().replace(/_/g, ' ')}
            </div>
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '20px',
            color: '#64748b',
            margin: '8px 0'
          }}>
            ↓
          </div>

          <div>
            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px', fontWeight: '600' }}>
              TO
            </div>
            <div style={{ fontSize: '15px', color: '#1e293b', fontWeight: '600' }}>
              {targetNode?.data.label.toLowerCase().replace(/_/g, ' ')}
            </div>
          </div>
        </div>

        {/* Connection Type Selection */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '12px'
          }}>
            Connection Type
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {edgeTypes.map(type => (
              <label
                key={type.value}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px',
                  border: selectedType === type.value
                    ? `2px solid ${type.color}`
                    : '2px solid #e2e8f0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: selectedType === type.value
                    ? `${type.color}15`
                    : 'white',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (selectedType !== type.value) {
                    e.currentTarget.style.background = '#f8fafc';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedType !== type.value) {
                    e.currentTarget.style.background = 'white';
                  }
                }}
              >
                <input
                  type="radio"
                  value={type.value}
                  checked={selectedType === type.value}
                  onChange={() => setSelectedType(type.value)}
                  style={{
                    marginRight: '12px',
                    cursor: 'pointer',
                    width: '18px',
                    height: '18px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: '600',
                    color: selectedType === type.value ? type.color : '#1e293b',
                    fontSize: '15px',
                    marginBottom: '2px'
                  }}>
                    {type.label}
                  </div>
                  <div style={{
                    fontSize: '13px',
                    color: '#64748b'
                  }}>
                    {type.description}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleDelete}
            style={{
              flex: '0 0 auto',
              padding: '12px 16px',
              background: '#fef2f2',
              color: '#dc2626',
              border: '2px solid #fecaca',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#fee2e2';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#fef2f2';
            }}
          >
            🗑️ Delete
          </button>

          <button
            onClick={onCancel}
            style={{
              flex: 1,
              padding: '12px',
              background: 'white',
              color: '#64748b',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#f8fafc';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'white';
            }}
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: '12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#2563eb';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#3b82f6';
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditConnectionDialog;

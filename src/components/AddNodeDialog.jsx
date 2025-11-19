import React, { useState } from 'react';

const AddNodeDialog = ({ onAdd, onCancel }) => {
  const [nodeType, setNodeType] = useState('leo');
  const [label, setLabel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (label.trim()) {
      onAdd({ type: nodeType, label: label.trim() });
      setLabel('');
      setNodeType('leo');
    }
  };

  return (
    <div style={{
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
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        minWidth: '400px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
      }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1e293b' }}>Neuen Node hinzufügen</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Node-Typ Auswahl */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
              Node-Typ:
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <label style={{
                flex: 1,
                padding: '12px',
                border: nodeType === 'leo' ? '2px solid #3b82f6' : '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                background: nodeType === 'leo' ? '#eff6ff' : 'white',
                textAlign: 'center',
              }}>
                <input
                  type="radio"
                  value="leo"
                  checked={nodeType === 'leo'}
                  onChange={(e) => setNodeType(e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontWeight: '500', color: '#3b82f6' }}>📘 Learning Outcome</span>
              </label>
              
              <label style={{
                flex: 1,
                padding: '12px',
                border: nodeType === 'assessment' ? '2px solid #10b981' : '2px solid #e2e8f0',
                borderRadius: '8px',
                cursor: 'pointer',
                background: nodeType === 'assessment' ? '#f0fdf4' : 'white',
                textAlign: 'center',
              }}>
                <input
                  type="radio"
                  value="assessment"
                  checked={nodeType === 'assessment'}
                  onChange={(e) => setNodeType(e.target.value)}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontWeight: '500', color: '#10b981' }}>✅ Assessment</span>
              </label>
            </div>
          </div>

          {/* Label Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
              Bezeichnung:
            </label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="z.B. 'Grundlagen verstehen' oder 'Quiz 1'"
              autoFocus
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 20px',
                border: '2px solid #e2e8f0',
                borderRadius: '8px',
                background: 'white',
                color: '#64748b',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              disabled={!label.trim()}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                background: label.trim() ? '#3b82f6' : '#cbd5e1',
                color: 'white',
                cursor: label.trim() ? 'pointer' : 'not-allowed',
                fontWeight: '500',
              }}
            >
              ➕ Hinzufügen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNodeDialog;
import React, { useState, useEffect } from 'react';

const EditNodeDialog = ({ node, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('3');

  useEffect(() => {
    if (node) {
      // Convert from UPPERCASE_WITH_UNDERSCORES to normal text
      const normalTitle = node.data.label.toLowerCase().replace(/_/g, ' ');
      setTitle(normalTitle);
      setDescription(node.data.description || '');
      setLevel(node.data.level?.toString() || '3');
    }
  }, [node]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onSave({
        ...node,
        data: {
          ...node.data,
          label: title.toUpperCase().replace(/ /g, '_'),
          description: description.trim(),
          level: parseInt(level)
        }
      });
    }
  };

  if (!node) return null;

  const isLEO = node.data.nodeType === 'leo';

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
            Editing {isLEO ? 'Learning Outcome' : 'Assessment'}
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
        
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500', 
              color: '#1e293b',
              fontSize: '14px'
            }}>
              Title: <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              fontWeight: '500', 
              color: '#1e293b',
              fontSize: '14px'
            }}>
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Level (only for LEO) */}
          {isLEO && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500', 
                color: '#1e293b',
                fontSize: '14px'
              }}>
                Level:
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'white',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="1">Level 1: Remember</option>
                <option value="2">Level 2: Understand</option>
                <option value="3">Level 3: Apply / Analyze</option>
                <option value="4">Level 4: Evaluate</option>
                <option value="5">Level 5: Create</option>
                <option value="6">Level 6: Advanced</option>
              </select>
            </div>
          )}

          {/* Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-end',
            marginTop: '30px'
          }}>
            <button
              type="button"
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
              type="submit"
              disabled={!title.trim()}
              style={{
                padding: '10px 24px',
                border: 'none',
                borderRadius: '6px',
                background: title.trim() ? '#3b82f6' : '#cbd5e1',
                color: 'white',
                cursor: title.trim() ? 'pointer' : 'not-allowed',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNodeDialog;
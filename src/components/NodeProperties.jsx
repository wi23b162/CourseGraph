import React from 'react';

const NodeProperties = ({ node, nodes }) => {
  if (!node) {
    return (
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#94a3b8',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: '18px', 
          fontWeight: '600', 
          margin: '0 0 10px 0',
          color: '#1e293b'
        }}>
          Properties
        </h2>
        <p style={{ fontSize: '14px', margin: 0 }}>
          Select a node to view properties
        </p>
      </div>
    );
  }

  const { data } = node;
  const isLEO = data.nodeType === 'leo';

  // Find connected nodes
  const prerequisites = nodes.filter(n => 
    // This would need actual edge data, simplified for now
    false
  );

  const enables = nodes.filter(n => 
    false
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'inline-block',
          background: isLEO ? '#dbeafe' : '#fce7f3',
          color: isLEO ? '#1e40af' : '#be185d',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '600',
          marginBottom: '12px'
        }}>
          {data.nodeId || node.id}
        </div>
        
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: '600', 
          margin: '0 0 4px 0',
          color: '#1e293b'
        }}>
          {data.label.toLowerCase().replace(/_/g, ' ')}
        </h2>
      </div>

      {/* Description */}
      {data.description && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Description
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            lineHeight: '1.6',
            margin: 0
          }}>
            {data.description}
          </p>
        </div>
      )}

      {/* Level (for LEO) */}
      {isLEO && data.level && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px'
          }}>
            Level: {data.level} {getLevelName(data.level)}
          </h3>
        </div>
      )}

      {/* Tags */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '8px'
        }}>
          Tags:
        </h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {isLEO && (
            <>
              <span style={{
                background: '#e0e7ff',
                color: '#3730a3',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Programming
              </span>
              <span style={{
                background: '#fef3c7',
                color: '#78350f',
                padding: '4px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: '500'
              }}>
                Core
              </span>
            </>
          )}
        </div>
      </div>

      {/* Dependencies */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#1e293b',
          marginBottom: '12px'
        }}>
          Dependencies
        </h3>
        
        {/* Prerequisites */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#64748b',
            marginBottom: '6px'
          }}>
            ↑ Prerequisites
          </div>
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            {prerequisites.length > 0 ? (
              prerequisites.map(n => n.data.label).join(', ')
            ) : (
              'None'
            )}
          </div>
        </div>

        {/* Enables */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#64748b',
            marginBottom: '6px'
          }}>
            ↓ Enables
          </div>
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            {enables.length > 0 ? (
              enables.map(n => n.data.label).join(', ')
            ) : (
              'None'
            )}
          </div>
        </div>

        {/* Tested by */}
        <div>
          <div style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#64748b',
            marginBottom: '6px'
          }}>
            ✓ Tested by
          </div>
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            None
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ 
        display: 'flex', 
        gap: '8px',
        paddingTop: '20px',
        borderTop: '1px solid #e2e8f0'
      }}>
        <button
          style={{
            flex: 1,
            padding: '10px',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            if (data.onDelete && window.confirm('Delete this node?')) {
              data.onDelete(node.id);
            }
          }}
          style={{
            padding: '10px 16px',
            background: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '14px'
          }}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

function getLevelName(level) {
  const names = {
    1: '(Remember)',
    2: '(Understand)',
    3: '(Apply / Analyze)',
    4: '(Evaluate)',
    5: '(Create)',
    6: '(Advanced)'
  };
  return names[level] || '';
}

export default NodeProperties;
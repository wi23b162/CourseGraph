import React from 'react';

const NodeProperties = ({ node, edge, nodes, edges, onChangeEdgeType, onDeleteEdge, onEditNode }) => {
  // Show Edge Properties
  if (edge) {
    const edgeType = edge.data?.edgeType || 'implies';
    const sourceNode = nodes.find(n => n.id === edge.source);
    const targetNode = nodes.find(n => n.id === edge.target);

    const edgeTypeColors = {
      requires: '#f97316',
      implies: '#3b82f6',
      tests: '#10b981'
    };

    return (
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            display: 'inline-block',
            background: `${edgeTypeColors[edgeType]}20`,
            color: edgeTypeColors[edgeType],
            padding: '4px 12px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '600',
            marginBottom: '12px'
          }}>
            Connection
          </div>
          
          <h2 style={{ 
            fontSize: '20px', 
            fontWeight: '600', 
            margin: '0 0 4px 0',
            color: '#1e293b'
          }}>
            {edge.label || 'Connection'}
          </h2>
        </div>

        {/* Connection Details */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '12px'
          }}>
            Connection Details
          </h3>
          
          <div style={{ marginBottom: '12px' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#64748b',
              marginBottom: '6px'
            }}>
              From:
            </div>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '13px',
              color: '#1e293b',
              fontWeight: '500'
            }}>
              {sourceNode?.data.label.toLowerCase().replace(/_/g, ' ')}
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#64748b',
              marginBottom: '6px'
            }}>
              To:
            </div>
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '13px',
              color: '#1e293b',
              fontWeight: '500'
            }}>
              {targetNode?.data.label.toLowerCase().replace(/_/g, ' ')}
            </div>
          </div>
        </div>

        {/* Change Type */}
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '12px'
          }}>
            Connection Type
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['requires', 'implies', 'tests'].map(type => (
              <label
                key={type}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px',
                  border: edgeType === type ? `2px solid ${edgeTypeColors[type]}` : '1px solid #e2e8f0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  background: edgeType === type ? `${edgeTypeColors[type]}10` : 'white'
                }}
              >
                <input
                  type="radio"
                  value={type}
                  checked={edgeType === type}
                  onChange={() => onChangeEdgeType(edge.id, type)}
                  style={{ marginRight: '10px', cursor: 'pointer' }}
                />
                <div style={{ 
                  fontWeight: '500', 
                  color: edgeType === type ? edgeTypeColors[type] : '#64748b',
                  fontSize: '14px'
                }}>
                  {type === 'requires' && '↑ requires'}
                  {type === 'implies' && '→ enables'}
                  {type === 'tests' && '✓ tested by'}
                </div>
              </label>
            ))}
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
            onClick={() => onDeleteEdge(edge.id)}
            style={{
              flex: 1,
              padding: '10px',
              background: '#fef2f2',
              color: '#dc2626',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '14px'
            }}
          >
            🗑️ Delete Connection
          </button>
        </div>
      </div>
    );
  }

  // Show Node Properties
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
          Select a node or connection to view properties
        </p>
      </div>
    );
  }

  const { data } = node;
  const isLEO = data.nodeType === 'leo';

  // Find connected edges
  const incomingEdges = edges.filter(e => e.target === node.id);
  const outgoingEdges = edges.filter(e => e.source === node.id);

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
          Connections
        </h3>
        
        {/* Incoming */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#64748b',
            marginBottom: '6px'
          }}>
            ↓ Incoming ({incomingEdges.length})
          </div>
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            {incomingEdges.length > 0 ? (
              incomingEdges.map(e => e.label || 'connection').join(', ')
            ) : (
              'None'
            )}
          </div>
        </div>

        {/* Outgoing */}
        <div>
          <div style={{
            fontSize: '13px',
            fontWeight: '500',
            color: '#64748b',
            marginBottom: '6px'
          }}>
            ↑ Outgoing ({outgoingEdges.length})
          </div>
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '6px',
            padding: '8px 12px',
            fontSize: '13px',
            color: '#94a3b8'
          }}>
            {outgoingEdges.length > 0 ? (
              outgoingEdges.map(e => e.label || 'connection').join(', ')
            ) : (
              'None'
            )}
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
          onClick={() => {
            console.log("✏️ Edit button clicked for node:", node.id);
            if (onEditNode) {
              onEditNode(node);
            }
          }}
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
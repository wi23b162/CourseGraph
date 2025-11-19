import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import CustomNode from './components/CustomNode';
import AddNodeDialog from './components/AddNodeDialog';
import NodeProperties from './components/NodeProperties';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: {
      label: 'UNDERSTAND_OOP_BASICS',
      description: 'understand basic OOP concepts and principles',
      nodeType: 'leo',
      nodeId: '01_01',
      level: 3,
      onDelete: null,
      onLabelChange: null,
    },
    position: { x: 400, y: 100 },
  },
  {
    id: '2',
    type: 'custom',
    data: {
      label: 'USE_VARIABLES_DATATYPES',
      description: 'declare and use different data types and variables',
      nodeType: 'leo',
      nodeId: '01_02',
      level: 5,
      onDelete: null,
      onLabelChange: null,
    },
    position: { x: 400, y: 300 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'enables',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showDialog, setShowDialog] = useState(false);
  const [nodeIdCounter, setNodeIdCounter] = useState(3);
  const [selectedNode, setSelectedNode] = useState(null);

  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    if (selectedNode?.id === nodeId) {
      setSelectedNode(null);
    }
  }, [setNodes, setEdges, selectedNode]);

  const changeLabelNode = useCallback((nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  }, [setNodes]);

  React.useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onDelete: deleteNode,
          onLabelChange: changeLabelNode,
        },
      }))
    );
  }, [deleteNode, changeLabelNode, setNodes]);

  const addNode = ({ type, label, description, level }) => {
    const nodeId = `0${Math.floor(nodeIdCounter / 10)}_${nodeIdCounter % 10 < 10 ? '0' : ''}${nodeIdCounter % 10}`;
    const newNode = {
      id: `${nodeIdCounter}`,
      type: 'custom',
      data: {
        label: label.toUpperCase().replace(/ /g, '_'),
        description,
        nodeType: type,
        nodeId,
        level: level || 3,
        onDelete: deleteNode,
        onLabelChange: changeLabelNode,
      },
      position: {
        x: Math.random() * 400 + 200,
        y: Math.random() * 300 + 100,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter((id) => id + 1);
    setShowDialog(false);
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ 
      ...params, 
      animated: true, 
      type: 'smoothstep',
      style: { stroke: '#3b82f6', strokeWidth: 2 }
    }, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
  }, []);

  const leoNodes = nodes.filter(n => n.data.nodeType === 'leo');
  const assessmentNodes = nodes.filter(n => n.data.nodeType === 'assessment');

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Toolbar */}
      <div style={{
        height: '60px',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: '10px',
      }}>
        <h1 style={{ 
          color: '#1e293b', 
          margin: 0, 
          fontSize: '20px',
          fontWeight: '600'
        }}>
          CourseGraph
        </h1>
        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setShowDialog({ type: 'leo' })}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            + Add LEO
          </button>
          <button
            onClick={() => setShowDialog({ type: 'assessment' })}
            style={{
              background: 'white',
              color: '#3b82f6',
              border: '2px solid #3b82f6',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            + Assessment
          </button>
          <button
            style={{
              background: 'white',
              color: '#64748b',
              border: '2px solid #e2e8f0',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            Export
          </button>
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            marginLeft: '10px'
          }}>
            <button style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>−</button>
            <span style={{ fontSize: '14px', color: '#64748b' }}>100 %</span>
            <button style={{
              background: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '4px',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '16px'
            }}>+</button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        {/* Left Sidebar - Course Structure */}
        <div style={{
          width: '280px',
          background: '#ffffff',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto'
        }}>
          <div style={{ padding: '20px' }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              margin: '0 0 20px 0',
              color: '#1e293b'
            }}>
              Course Structure
            </h2>
            
            {/* Learning Outcomes */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                cursor: 'pointer'
              }}>
                <span style={{ marginRight: '8px' }}>▼</span>
                <span style={{ fontWeight: '500', color: '#1e293b' }}>
                  Learning Outcomes ({leoNodes.length})
                </span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                {leoNodes.map((node, idx) => (
                  <div 
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      padding: '8px',
                      marginBottom: '4px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: selectedNode?.id === node.id ? '#eff6ff' : 'transparent',
                      fontSize: '14px',
                      color: '#64748b'
                    }}
                  >
                    ├─ LEO-{idx + 1}: {node.data.label.toLowerCase().replace(/_/g, ' ')}
                  </div>
                ))}
              </div>
            </div>

            {/* Assessments */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '10px',
                cursor: 'pointer'
              }}>
                <span style={{ marginRight: '8px' }}>▼</span>
                <span style={{ fontWeight: '500', color: '#1e293b' }}>
                  Assessments ({assessmentNodes.length})
                </span>
              </div>
              <div style={{ paddingLeft: '24px' }}>
                {assessmentNodes.map((node, idx) => (
                  <div 
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    style={{
                      padding: '8px',
                      marginBottom: '4px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      background: selectedNode?.id === node.id ? '#f0fdf4' : 'transparent',
                      fontSize: '14px',
                      color: '#64748b'
                    }}
                  >
                    ├─ {node.data.label.toLowerCase().replace(/_/g, ' ')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center - Graph */}
        <div style={{ flexGrow: 1, background: '#f8fafc' }}>
          {nodes.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: '#94a3b8'
            }}>
              <div style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                background: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: '500',
                marginBottom: '30px'
              }}>
                Your course is empty
              </div>
              <h3 style={{ fontSize: '20px', fontWeight: '500', margin: '0 0 20px 0', color: '#1e293b' }}>
                Start by adding Learning Outcomes
              </h3>
              <button
                onClick={() => setShowDialog({ type: 'leo' })}
                style={{
                  background: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500',
                }}
              >
                + Add LEO
              </button>
            </div>
          ) : (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} color="#cbd5e1" />
            </ReactFlow>
          )}
        </div>

        {/* Right Sidebar - Properties */}
        <div style={{
          width: '320px',
          background: '#ffffff',
          borderLeft: '1px solid #e2e8f0',
          overflow: 'auto'
        }}>
          <NodeProperties node={selectedNode} nodes={nodes} />
        </div>
      </div>

      {/* Add Node Dialog */}
      {showDialog && (
        <AddNodeDialog
          initialType={showDialog.type}
          onAdd={addNode}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}

export default App;
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

// Custom Node Types registrieren
const nodeTypes = {
  custom: CustomNode,
};

// Initial Nodes mit Custom Type
const initialNodes = [
  {
    id: '1',
    type: 'custom',
    data: {
      label: 'Grundlagen verstehen',
      type: 'leo',
      onDelete: null, // wird später gesetzt
      onLabelChange: null, // wird später gesetzt
    },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    type: 'custom',
    data: {
      label: 'Quiz 1',
      type: 'assessment',
      onDelete: null,
      onLabelChange: null,
    },
    position: { x: 250, y: 250 },
  },
];

const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: 'tests',
    type: 'smoothstep',
    animated: true,
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showDialog, setShowDialog] = useState(false);
  const [nodeIdCounter, setNodeIdCounter] = useState(3);

  // Node löschen
  const deleteNode = useCallback((nodeId) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  }, [setNodes, setEdges]);

  // Node Label ändern
  const changeLabelNode = useCallback((nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  }, [setNodes]);

  // Callbacks in Nodes einfügen
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

  // Neuen Node hinzufügen
  const addNode = ({ type, label }) => {
    const newNode = {
      id: `${nodeIdCounter}`,
      type: 'custom',
      data: {
        label,
        type,
        onDelete: deleteNode,
        onLabelChange: changeLabelNode,
      },
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 300 + 100,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setNodeIdCounter((id) => id + 1);
    setShowDialog(false);
  };

  // Verbindung erstellen
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true, type: 'smoothstep' }, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <div style={{
        height: '60px',
        background: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        gap: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}>
        <h1 style={{ color: 'white', margin: 0, fontSize: '20px' }}>
          📊 CourseGraph
        </h1>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setShowDialog(true)}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            ➕ Node hinzufügen
          </button>
          
          <div style={{
            background: '#334155',
            color: '#94a3b8',
            padding: '10px 16px',
            borderRadius: '6px',
            fontSize: '14px',
          }}>
            Nodes: {nodes.length} | Edges: {edges.length}
          </div>
        </div>
      </div>

      {/* ReactFlow Canvas */}
      <div style={{ flexGrow: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Controls />
          <MiniMap
            nodeColor={(node) => node.data.type === 'leo' ? '#3b82f6' : '#10b981'}
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>

      {/* Add Node Dialog */}
      {showDialog && (
        <AddNodeDialog
          onAdd={addNode}
          onCancel={() => setShowDialog(false)}
        />
      )}
    </div>
  );
}

export default App;
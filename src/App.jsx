import React, { useState } from 'react';
import { useNodesState, useEdgesState, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';

// Components
import Toolbar from './components/Toolbar/Toolbar';
import ProjectHeader from './components/ProjectHeader/ProjectHeader';
import LeftSidebar from './components/Sidebars/LeftSidebar';
import RightSidebar from './components/Sidebars/RightSidebar';
import CenterGraph from './components/Graph/CenterGraph';
import CustomNode from './components/CustomNode';

// Dialogs
import AddNodeDialog from './components/AddNodeDialog';
import EdgeTypeDialog from './components/EdgeTypeDialog';
import EditNodeDialog from './components/EditNodeDialog';
import EditConnectionDialog from './components/EditConnectionDialog';
import NewProjectDialog from './components/NewProjectDialog';
import { SaveLoadDialog, useSaveLoad, clearAutoSave } from './components/Saveloadmanager';

// Hooks
import { useNodeManagement } from './hooks/useNodeManagement';
import { useEdgeManagement } from './hooks/useEdgeManagement';
import { useGraphFiltering } from './hooks/useGraphFiltering';
import { useSidebarState } from './hooks/useSidebarState';
import { useUndoRedo } from './hooks/useUndoRedo';
import { useExport } from './hooks/useExport';
import { useProjectName } from './hooks/useProjectName';
import { useGraphNavigation } from './hooks/useGraphNavigation';

// Utils
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const nodeTypes = { custom: CustomNode };

// Default nodes only used when no saved data exists
const defaultNodes = [
  {
    id: '1',
    type: 'custom',
    data: {
      label: 'UNDERSTAND_OOP_BASICS',
      description: 'understand basic OOP concepts and principles',
      nodeType: 'leo',
      nodeId: '01_01',
      level: 3,
      tags: [],
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
      tags: [],
      onDelete: null,
      onLabelChange: null,
    },
    position: { x: 400, y: 300 },
  },
];

const defaultEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    label: '→ enables / implies',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#3b82f6', strokeWidth: 2 },
    data: { edgeType: 'implies' },
  },
];

// Load saved data before component renders
const getInitialState = () => {
  try {
    // First try manual save
    const manualSave = localStorage.getItem('coursegraph_manual_save');
    if (manualSave) {
      const data = JSON.parse(manualSave);
      if (data.nodes && data.nodes.length > 0) {
        return { nodes: data.nodes, edges: data.edges, counter: data.nodes.length + 1 };
      }
    }

    // Then try auto-save
    const autoSave = localStorage.getItem('coursegraph_autosave');
    if (autoSave) {
      const data = JSON.parse(autoSave);
      if (data.nodes && data.nodes.length > 0) {
        return { nodes: data.nodes, edges: data.edges, counter: data.nodes.length + 1 };
      }
    }
  } catch (error) {
    // Failed to load initial state
  }

  // Fall back to defaults
  return { nodes: defaultNodes, edges: defaultEdges, counter: 3 };
};

const initialState = getInitialState();

function AppContent() {
  // Core ReactFlow state
  const [nodes, setNodes, onNodesChange] = useNodesState(initialState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialState.edges);

  // Selection state
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  // Dialog states
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);

  // Custom hooks
  const nodeManagement = useNodeManagement({ nodes, setNodes, edges, setEdges, selectedNode, setSelectedNode });
  const edgeManagement = useEdgeManagement({ nodes, edges, setEdges, selectedEdge, setSelectedEdge });
  const filtering = useGraphFiltering({ nodes, edges });
  const sidebarState = useSidebarState();
  const undoRedo = useUndoRedo({
    nodes,
    edges,
    setNodes,
    setEdges,
    initialNodes: initialState.nodes,
    initialEdges: initialState.edges,
  });
  const projectNameHook = useProjectName();
  const exportFns = useExport({ nodes, edges, setNodes, projectName: projectNameHook.projectName });
  const navigation = useGraphNavigation();

  // Auto-save
  const [lastSaved, setLastSaved] = useState(null);
  useSaveLoad(nodes, edges, setLastSaved);

  // Derived data
  const leoNodes = nodes.filter((n) => n.data.nodeType === 'leo');
  const assessmentNodes = nodes.filter((n) => n.data.nodeType === 'assessment');

  // Handlers
  const handleLoadCourse = (loadedNodes, loadedEdges) => {
    setNodes(loadedNodes);
    setEdges(loadedEdges);
    nodeManagement.setNodeIdCounter(loadedNodes.length + 1);
    setSelectedNode(null);
    setShowSaveLoadDialog(false);
  };

  const handleNewProject = (newProjectName) => {
    setNodes([]);
    setEdges([]);
    nodeManagement.resetCounter();
    setSelectedNode(null);
    setSelectedEdge(null);
    clearAutoSave();
    projectNameHook.setProjectName(newProjectName);
    setShowNewProjectDialog(false);
  };

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const handleEdgeClick = (event, edge) => {
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);

    if (sourceNode && targetNode) {
      edgeManagement.setConnectionToEdit({ edge, sourceNode, targetNode });
      edgeManagement.setShowEditConnectionDialog(true);
    }

    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Toolbar */}
      <Toolbar
        filtering={filtering}
        nodeManagement={nodeManagement}
        exportFns={exportFns}
        navigation={navigation}
        undoRedo={undoRedo}
        onOpenSaveLoad={() => setShowSaveLoadDialog(true)}
      />

      {/* Project Header (Auto Layout, New Project, Project Name) */}
      <ProjectHeader
        onAutoLayout={exportFns.handleAutoLayout}
        onNewProject={() => setShowNewProjectDialog(true)}
        projectName={projectNameHook}
      />

      {/* Main Content */}
      <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
        <LeftSidebar
          {...sidebarState}
          leoNodes={leoNodes}
          assessmentNodes={assessmentNodes}
          selectedNode={selectedNode}
          setSelectedNode={setSelectedNode}
          setSelectedEdge={setSelectedEdge}
        />

        <CenterGraph
          nodes={nodes}
          edges={edges}
          filteredNodes={filtering.filteredNodes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={edgeManagement.onConnect}
          onNodeClick={handleNodeClick}
          onEdgeClick={handleEdgeClick}
          nodeTypes={nodeTypes}
          handleViewportChange={navigation.handleViewportChange}
          onAddLEO={() => nodeManagement.setShowDialog({ type: 'leo' })}
        />

        <RightSidebar
          {...sidebarState}
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          nodes={nodes}
          edges={edges}
          onDeleteEdge={edgeManagement.handleDeleteEdge}
          onEditNode={nodeManagement.handleEditNode}
          onEditConnection={edgeManagement.handleEditConnection}
        />
      </div>

      {/* Dialogs */}
      {nodeManagement.showDialog && (
        <AddNodeDialog
          initialType={nodeManagement.showDialog.type}
          onAdd={nodeManagement.addNode}
          onCancel={() => nodeManagement.setShowDialog(false)}
          allTags={filtering.allTags}
        />
      )}

      {showSaveLoadDialog && (
        <SaveLoadDialog
          nodes={nodes}
          edges={edges}
          onLoad={handleLoadCourse}
          onClose={() => setShowSaveLoadDialog(false)}
          projectName={projectNameHook.projectName}
          onProjectNameChange={projectNameHook.setProjectName}
        />
      )}

      {edgeManagement.showEdgeTypeDialog && edgeManagement.pendingConnection && (
        <EdgeTypeDialog
          sourceNode={edgeManagement.pendingConnection.sourceNode}
          targetNode={edgeManagement.pendingConnection.targetNode}
          onConfirm={edgeManagement.handleEdgeTypeConfirm}
          onCancel={() => {
            edgeManagement.setShowEdgeTypeDialog(false);
            edgeManagement.setPendingConnection(null);
          }}
        />
      )}

      {nodeManagement.showEditDialog && nodeManagement.nodeToEdit && (
        <EditNodeDialog
          node={nodeManagement.nodeToEdit}
          onSave={nodeManagement.handleSaveEdit}
          onCancel={() => {
            nodeManagement.setShowEditDialog(false);
            nodeManagement.setNodeToEdit(null);
          }}
          allTags={filtering.allTags}
        />
      )}

      {edgeManagement.showEditConnectionDialog && edgeManagement.connectionToEdit && (
        <EditConnectionDialog
          edge={edgeManagement.connectionToEdit.edge}
          sourceNode={edgeManagement.connectionToEdit.sourceNode}
          targetNode={edgeManagement.connectionToEdit.targetNode}
          onSave={edgeManagement.handleSaveConnection}
          onDelete={edgeManagement.handleDeleteConnection}
          onCancel={() => {
            edgeManagement.setShowEditConnectionDialog(false);
            edgeManagement.setConnectionToEdit(null);
          }}
        />
      )}

      {showNewProjectDialog && (
        <NewProjectDialog onCancel={() => setShowNewProjectDialog(false)} onConfirm={handleNewProject} />
      )}

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/* Auto-Save Indicator */}
      {lastSaved && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'white',
            padding: '8px 16px',
            borderRadius: '20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            fontSize: '13px',
            color: '#64748b',
            border: '1px solid #e2e8f0',
            zIndex: 999,
          }}
        >
          💾 Auto-saved at {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}

export default App;

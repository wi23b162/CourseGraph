import React, { useState, useCallback } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import CustomNode from "./components/CustomNode";
import AddNodeDialog from "./components/AddNodeDialog";
import NodeProperties from "./components/NodeProperties";
import EdgeTypeDialog from "./components/EdgeTypeDialog";
import EditNodeDialog from "./components/EditNodeDialog";
import {
  SaveLoadDialog,
  useSaveLoad,
  loadFromLocalStorage,
} from "./components/SaveLoadManager";
import { getEdgeStyle, getEdgeLabel } from "./components/edgeUtils";
import { exportToPNG, exportToExcel } from "./utils/exportUtils";
import { autoLayoutGraph } from "./utils/autoLayout";

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: {
      label: "UNDERSTAND_OOP_BASICS",
      description: "understand basic OOP concepts and principles",
      nodeType: "leo",
      nodeId: "01_01",
      level: 3,
      onDelete: null,
      onLabelChange: null,
    },
    position: { x: 400, y: 100 },
  },
  {
    id: "2",
    type: "custom",
    data: {
      label: "USE_VARIABLES_DATATYPES",
      description: "declare and use different data types and variables",
      nodeType: "leo",
      nodeId: "01_02",
      level: 5,
      onDelete: null,
      onLabelChange: null,
    },
    position: { x: 400, y: 300 },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    label: "→ enables",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#3b82f6", strokeWidth: 2 },
    data: { edgeType: "implies" },
  },
];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [showDialog, setShowDialog] = useState(false);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [showEdgeTypeDialog, setShowEdgeTypeDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [pendingConnection, setPendingConnection] = useState(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(3);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [nodeToEdit, setNodeToEdit] = useState(null);

  // Auto-save functionality
  useSaveLoad(nodes, edges);

  // Load from auto-save on mount
  React.useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved && saved.nodes.length > 0) {
      const confirmLoad = window.confirm("Found auto-saved data. Load it?");
      if (confirmLoad) {
        setNodes(saved.nodes);
        setEdges(saved.edges);
        setNodeIdCounter(saved.nodes.length + 1);
      }
    }
  }, []);

  const deleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
      }
    },
    [setNodes, setEdges, selectedNode]
  );

  const changeLabelNode = useCallback(
    (nodeId, newLabel) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, label: newLabel } }
            : node
        )
      );
    },
    [setNodes]
  );

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
    const nodeId = `0${Math.floor(nodeIdCounter / 10)}_${
      nodeIdCounter % 10 < 10 ? "0" : ""
    }${nodeIdCounter % 10}`;
    const newNode = {
      id: `${nodeIdCounter}`,
      type: "custom",
      data: {
        label: label.toUpperCase().replace(/ /g, "_"),
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

  // CRITICAL: onConnect callback
  const onConnect = useCallback(
    (params) => {
      console.log("🔗 Connection attempt detected!", params);

      // Find source and target nodes
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      console.log("📍 Source node:", sourceNode);
      console.log("📍 Target node:", targetNode);

      if (sourceNode && targetNode) {
        console.log("✅ Both nodes found! Opening EdgeTypeDialog...");
        setPendingConnection({ params, sourceNode, targetNode });
        setShowEdgeTypeDialog(true);
      } else {
        console.error("❌ Could not find nodes!");
      }
    },
    [nodes]
  );

  const handleEdgeTypeConfirm = (edgeType) => {
    console.log("✅ Edge type confirmed:", edgeType);

    if (pendingConnection) {
      const style = getEdgeStyle(edgeType);
      const label = getEdgeLabel(edgeType);

      const newEdge = {
        ...pendingConnection.params,
        animated: true,
        type: "smoothstep",
        style,
        label,
        labelStyle: { fontWeight: 600, fontSize: 12 },
        labelBgStyle: { fill: "white", fillOpacity: 0.9 },
        data: { edgeType },
      };

      console.log("➕ Adding edge:", newEdge);
      setEdges((eds) => addEdge(newEdge, eds));
    }

    setShowEdgeTypeDialog(false);
    setPendingConnection(null);
  };

  const onNodeClick = useCallback((event, node) => {
    console.log("🖱️ Node clicked:", node.id);
    setSelectedNode(node);
    setSelectedEdge(null);
  }, []);

  const onEdgeClick = useCallback((event, edge) => {
    console.log("🖱️ Edge clicked:", edge.id);
    setSelectedEdge(edge);
    setSelectedNode(null);
  }, []);

  const handleChangeEdgeType = (edgeId, newType) => {
    console.log("🔄 Changing edge type:", edgeId, "to", newType);
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === edgeId) {
          const style = getEdgeStyle(newType);
          const label = getEdgeLabel(newType);
          return {
            ...edge,
            style,
            label,
            data: { ...edge.data, edgeType: newType },
          };
        }
        return edge;
      })
    );
  };

  const handleDeleteEdge = (edgeId) => {
    if (window.confirm("Delete this connection?")) {
      console.log("🗑️ Deleting edge:", edgeId);
      setEdges((eds) => eds.filter((e) => e.id !== edgeId));
      setSelectedEdge(null);
    }
  };

  const handleEditNode = (node) => {
    console.log("✏️ Opening edit dialog for:", node.id);
    setNodeToEdit(node);
    setShowEditDialog(true);
  };

  const handleSaveEdit = (updatedNode) => {
    console.log("💾 Saving edited node:", updatedNode);
    setNodes((nds) =>
      nds.map((n) => (n.id === updatedNode.id ? updatedNode : n))
    );
    setShowEditDialog(false);
    setNodeToEdit(null);
  };

  const handleLoadCourse = (loadedNodes, loadedEdges) => {
    console.log(
      "📂 Loading course:",
      loadedNodes.length,
      "nodes",
      loadedEdges.length,
      "edges"
    );
    setNodes(loadedNodes);
    setEdges(loadedEdges);
    setNodeIdCounter(loadedNodes.length + 1);
    setSelectedNode(null);
    setShowSaveLoadDialog(false);
  };
  // Export handlers
  const handleExportPNG = async () => {
    console.log("🖼️ Exporting to PNG...");
    const success = await exportToPNG();
    if (success) {
      alert("✅ PNG exported successfully! Check your Downloads folder.");
    }
  };

  const handleExportExcel = () => {
    console.log("📊 Exporting to Excel...");
    const success = exportToExcel(nodes, edges);
    if (success) {
      alert(
        "✅ Excel file exported successfully! Check your Downloads folder."
      );
    }
  };

  const handleAutoLayout = () => {
    setNodes((current) => autoLayoutGraph(current, edges));
  };

  const leoNodes = nodes.filter((n) => n.data.nodeType === "leo");
  const assessmentNodes = nodes.filter((n) => n.data.nodeType === "assessment");

  console.log(
    "🔧 App render - showEdgeTypeDialog:",
    showEdgeTypeDialog,
    "showEditDialog:",
    showEditDialog
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Toolbar */}
      <div
        style={{
          height: "60px",
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          gap: "10px",
        }}
      >
        <h1
          style={{
            color: "#1e293b",
            margin: 0,
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          CourseGraph
        </h1>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => setShowDialog({ type: "leo" })}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            + Add LEO
          </button>
          <button
            onClick={() => setShowDialog({ type: "assessment" })}
            style={{
              background: "white",
              color: "#3b82f6",
              border: "2px solid #3b82f6",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            + Assessment
          </button>
          <button
            onClick={() => setShowSaveLoadDialog(true)}
            style={{
              background: "white",
              color: "#64748b",
              border: "2px solid #e2e8f0",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            💾 Save / Load
          </button>
          <button
            onClick={handleExportPNG}
            style={{
              background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginLeft: "8px",
            }}
            title="Export as PNG image"
          >
            <span>📸</span>
            <span>PNG</span>
          </button>

          <button
            onClick={handleExportExcel}
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginLeft: "8px",
            }}
            title="Export as Excel spreadsheet"
          >
            <span>📊</span>
            <span>Excel</span>
          </button>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <button
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              −
            </button>
            <span style={{ fontSize: "14px", color: "#64748b" }}>100 %</span>
            <button
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              +
            </button>

            <button
              onClick={handleAutoLayout}
              style={{
                background: "white",
                color: "#0f172a",
                border: "2px solid #e2e8f0",
                padding: "10px 16px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              🔀 Auto Layout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Left Sidebar - Course Structure */}
        <div
          style={{
            width: "280px",
            background: "#ffffff",
            borderRight: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <div style={{ padding: "20px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                margin: "0 0 20px 0",
                color: "#1e293b",
              }}
            >
              Course Structure
            </h2>

            {/* Learning Outcomes */}
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <span style={{ marginRight: "8px" }}>▼</span>
                <span style={{ fontWeight: "500", color: "#1e293b" }}>
                  Learning Outcomes ({leoNodes.length})
                </span>
              </div>
              <div style={{ paddingLeft: "24px" }}>
                {leoNodes.map((node, idx) => (
                  <div
                    key={node.id}
                    onClick={() => {
                      console.log("📋 Selected LEO from sidebar:", node.id);
                      setSelectedNode(node);
                      setSelectedEdge(null);
                    }}
                    style={{
                      padding: "8px",
                      marginBottom: "4px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      background:
                        selectedNode?.id === node.id
                          ? "#eff6ff"
                          : "transparent",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    ├─ LEO-{idx + 1}:{" "}
                    {node.data.label.toLowerCase().replace(/_/g, " ")}
                  </div>
                ))}
              </div>
            </div>

            {/* Assessments */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <span style={{ marginRight: "8px" }}>▼</span>
                <span style={{ fontWeight: "500", color: "#1e293b" }}>
                  Assessments ({assessmentNodes.length})
                </span>
              </div>
              <div style={{ paddingLeft: "24px" }}>
                {assessmentNodes.map((node, idx) => (
                  <div
                    key={node.id}
                    onClick={() => {
                      console.log(
                        "📋 Selected Assessment from sidebar:",
                        node.id
                      );
                      setSelectedNode(node);
                      setSelectedEdge(null);
                    }}
                    style={{
                      padding: "8px",
                      marginBottom: "4px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      background:
                        selectedNode?.id === node.id
                          ? "#f0fdf4"
                          : "transparent",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    ├─ {node.data.label.toLowerCase().replace(/_/g, " ")}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Center - Graph */}
        <div style={{ flexGrow: 1, background: "#f8fafc" }}>
          {nodes.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#94a3b8",
              }}
            >
              <div
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "#3b82f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "18px",
                  fontWeight: "500",
                  marginBottom: "30px",
                }}
              >
                Your course is empty
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "500",
                  margin: "0 0 20px 0",
                  color: "#1e293b",
                }}
              >
                Start by adding Learning Outcomes
              </h3>
              <button
                onClick={() => setShowDialog({ type: "leo" })}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
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
              onEdgeClick={onEdgeClick}
              nodeTypes={nodeTypes}
              fitView
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} color="#cbd5e1" />
            </ReactFlow>
          )}
        </div>

        {/* Right Sidebar - Properties */}
        <div
          style={{
            width: "320px",
            background: "#ffffff",
            borderLeft: "1px solid #e2e8f0",
            overflow: "auto",
          }}
        >
          <NodeProperties
            node={selectedNode}
            edge={selectedEdge}
            nodes={nodes}
            edges={edges}
            onChangeEdgeType={handleChangeEdgeType}
            onDeleteEdge={handleDeleteEdge}
            onEditNode={handleEditNode}
          />
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

      {/* Save/Load Dialog */}
      {showSaveLoadDialog && (
        <SaveLoadDialog
          nodes={nodes}
          edges={edges}
          onLoad={handleLoadCourse}
          onClose={() => setShowSaveLoadDialog(false)}
        />
      )}

      {/* Edge Type Dialog */}
      {showEdgeTypeDialog && pendingConnection && (
        <EdgeTypeDialog
          sourceNode={pendingConnection.sourceNode}
          targetNode={pendingConnection.targetNode}
          onConfirm={handleEdgeTypeConfirm}
          onCancel={() => {
            console.log("❌ EdgeTypeDialog cancelled");
            setShowEdgeTypeDialog(false);
            setPendingConnection(null);
          }}
        />
      )}

      {/* Edit Node Dialog */}
      {showEditDialog && nodeToEdit && (
        <EditNodeDialog
          node={nodeToEdit}
          onSave={handleSaveEdit}
          onCancel={() => {
            console.log("❌ Edit cancelled");
            setShowEditDialog(false);
            setNodeToEdit(null);
          }}
        />
      )}
    </div>
  );
}

export default App;

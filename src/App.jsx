import React, { useState, useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import "./App.css";
import CustomNode from "./components/CustomNode";
import AddNodeDialog from "./components/AddNodeDialog";
import NodeProperties from "./components/NodeProperties";
import EdgeTypeDialog from "./components/EdgeTypeDialog";
import EditNodeDialog from "./components/EditNodeDialog";
import NewProjectDialog from "./components/NewProjectDialog";
import EditConnectionDialog from "./components/EditConnectionDialog";
import {
  SaveLoadDialog,
  useSaveLoad,
  clearAutoSave,
} from "./components/Saveloadmanager";
import { getEdgeStyle, getEdgeLabel, getEdgeLabelStyle } from './components/edgeUtils';
import { exportToPNG, exportToExcel } from "./utils/exportUtils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { autoLayoutGraph } from "./utils/autoLayout";


const nodeTypes = {
  custom: CustomNode,
};

// Default nodes only used when no saved data exists
const defaultNodes = [
  {
    id: "1",
    type: "custom",
    data: {
      label: "UNDERSTAND_OOP_BASICS",
      description: "understand basic OOP concepts and principles",
      nodeType: "leo",
      nodeId: "01_01",
      level: 3,
      tags: [],
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
      tags: [],
      onDelete: null,
      onLabelChange: null,
    },
    position: { x: 400, y: 300 },
  },
];

const defaultEdges = [
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

// Load saved data BEFORE component renders
const getInitialState = () => {
  try {
    // First try manual save
    const manualSave = localStorage.getItem('coursegraph_manual_save');
    if (manualSave) {
      const data = JSON.parse(manualSave);
      if (data.nodes && data.nodes.length > 0) {
        console.log('📂 Initial load from manual save');
        return { nodes: data.nodes, edges: data.edges, counter: data.nodes.length + 1 };
      }
    }

    // Then try auto-save
    const autoSave = localStorage.getItem('coursegraph_autosave');
    if (autoSave) {
      const data = JSON.parse(autoSave);
      if (data.nodes && data.nodes.length > 0) {
        console.log('📂 Initial load from auto-save');
        return { nodes: data.nodes, edges: data.edges, counter: data.nodes.length + 1 };
      }
    }
  } catch (error) {
    console.error('Failed to load initial state:', error);
  }

  // Fall back to defaults
  console.log('📂 Using default nodes');
  return { nodes: defaultNodes, edges: defaultEdges, counter: 3 };
};

const initialState = getInitialState();

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialState.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialState.edges);
  const [showDialog, setShowDialog] = useState(false);
  const [showSaveLoadDialog, setShowSaveLoadDialog] = useState(false);
  const [showEdgeTypeDialog, setShowEdgeTypeDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showEditConnectionDialog, setShowEditConnectionDialog] = useState(false);
  const [pendingConnection, setPendingConnection] = useState(null);
  const [nodeIdCounter, setNodeIdCounter] = useState(initialState.counter);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);
  const [nodeToEdit, setNodeToEdit] = useState(null);
  const [connectionToEdit, setConnectionToEdit] = useState(null);
  const [isExportingPNG, setIsExportingPNG] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [tagSearch, setTagSearch] = useState("");
  const [filterTag, setFilterTag] = useState("all");
  const [connFilter, setConnFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [leoExpanded, setLeoExpanded] = useState(true);        
  const [assessmentExpanded, setAssessmentExpanded] = useState(true);
  const [lastSaved, setLastSaved] = useState(null);

  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);

  const [history, setHistory] = useState([{ nodes: initialState.nodes, edges: initialState.edges }]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Auto-save functionality
 useSaveLoad(nodes, edges, setLastSaved);

  // Trigger window resize when sidebars toggle to help ReactFlow adjust
  React.useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 350); // Wait for transition to complete
    return () => clearTimeout(timer);
  }, [isLeftSidebarOpen, isRightSidebarOpen]);

  // Save to history when nodes or edges change
  React.useEffect(() => {
    const currentState = history[currentHistoryIndex];
    const hasNodesChanged = JSON.stringify(currentState.nodes) !== JSON.stringify(nodes);
    const hasEdgesChanged = JSON.stringify(currentState.edges) !== JSON.stringify(edges);

    if (hasNodesChanged || hasEdgesChanged) {
      const newHistory = history.slice(0, currentHistoryIndex + 1);
      newHistory.push({ nodes, edges });

      if (newHistory.length > 50) {
        newHistory.shift();
      } else {
        setCurrentHistoryIndex(currentHistoryIndex + 1);
      }

      setHistory(newHistory);
    }
  }, [nodes, edges, history, currentHistoryIndex]);

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

  // Reset nodeIdCounter when all nodes are deleted
  React.useEffect(() => {
    if (nodes.length === 0) {
      setNodeIdCounter(1);
      console.log('🔄 Node counter reset to 1');
    }
  }, [nodes.length]);

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

  const addNode = ({ type, label, description, level, tags = [] }) => {
    const cleanTags = Array.isArray(tags)
      ? tags.map((t) => String(t).trim()).filter(Boolean)
      : [];

    const nodeId = `0${Math.floor(nodeIdCounter / 10)}_${nodeIdCounter % 10 < 10 ? "0" : ""}${nodeIdCounter % 10}`;

    const newNode = {
      id: `${nodeIdCounter}`,
      type: "custom",
      data: {
        label: label.toUpperCase().replace(/ /g, "_"),
        description,
        nodeType: type,
        nodeId,
        level: level || 3,
        tags: cleanTags, // ✅ HIER
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
    console.log("Edge type confirmed:", edgeType);

    if (pendingConnection) {
      const style = getEdgeStyle(edgeType);
      const label = getEdgeLabel(edgeType);
      const labelStyle = getEdgeLabelStyle(edgeType);

      const newEdge = {
        ...pendingConnection.params,
        animated: true,
        type: "smoothstep",
        style,
        label,
        labelStyle: {
          ...labelStyle,
          fontSize: 13,
          fontWeight: 600,
        },
        labelBgStyle: {
          fill: 'white',
          fillOpacity: 1,
          stroke: '#e2e8f0',
          strokeWidth: 1
        },
        labelBgPadding: [8, 4],
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

    // Find source and target nodes
    const sourceNode = nodes.find((n) => n.id === edge.source);
    const targetNode = nodes.find((n) => n.id === edge.target);

    if (sourceNode && targetNode) {
      setConnectionToEdit({ edge, sourceNode, targetNode });
      setShowEditConnectionDialog(true);
    }

    setSelectedEdge(edge);
    setSelectedNode(null);
  }, [nodes]);

  const handleChangeEdgeType = (edgeId, newType) => {
    console.log("🔄 Changing edge type:", edgeId, "to", newType);
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === edgeId) {
          const style = getEdgeStyle(newType);
          const label = getEdgeLabel(newType);
          const labelStyle = getEdgeLabelStyle(newType);
          return {
            ...edge,
            style,
            label,
            labelStyle: {
              ...labelStyle,
              fontSize: 13,
              fontWeight: 600,
            },
            labelBgStyle: {
              fill: 'white',
              fillOpacity: 1,
              stroke: '#e2e8f0',
              strokeWidth: 1
            },
            labelBgPadding: [8, 4],
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

  const handleSaveConnection = (newEdgeType) => {
    if (connectionToEdit) {
      console.log("💾 Saving connection with type:", newEdgeType);
      handleChangeEdgeType(connectionToEdit.edge.id, newEdgeType);
      setShowEditConnectionDialog(false);
      setConnectionToEdit(null);
    }
  };

  const handleDeleteConnection = () => {
    if (connectionToEdit) {
      console.log("🗑️ Deleting connection:", connectionToEdit.edge.id);
      setEdges((eds) => eds.filter((e) => e.id !== connectionToEdit.edge.id));
      setSelectedEdge(null);
      setShowEditConnectionDialog(false);
      setConnectionToEdit(null);
    }
  };

  const handleEditConnection = (edge, sourceNode, targetNode) => {
    console.log("✏️ Opening edit connection dialog for:", edge.id);
    setConnectionToEdit({ edge, sourceNode, targetNode });
    setShowEditConnectionDialog(true);
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

  // Reset everything and start with an empty project
  const handleNewProject = () => {
    // Clear all nodes and edges
    setNodes([]);
    setEdges([]);

    // Reset internal state
    setNodeIdCounter(1);
    setSelectedNode(null);
    setSelectedEdge(null);
    setNodeToEdit(null);

    // Clear auto-saved data so it does not come back on refresh
    clearAutoSave();

    // Close dialog
    setShowNewProjectDialog(false);
  };

  // Export handlers
  const handleExportPNG = async () => {
    console.log('🖼️ Exporting to PNG...');
    await exportToPNG();
  };

  const handleExportExcel = () => {
    console.log('📊 Exporting to Excel...');
    exportToExcel(nodes, edges);
  };

  const handleAutoLayout = () => {
    setNodes((current) => autoLayoutGraph(current, edges));
  };
  // Undo/Redo functionality
  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      const previousState = history[newIndex];

      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      setCurrentHistoryIndex(newIndex);

      console.log('⏪ Undo to step', newIndex);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      const nextState = history[newIndex];

      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setCurrentHistoryIndex(newIndex);

      console.log('⏩ Redo to step', newIndex);
    }
  };

  // Keyboard shortcuts for Undo/Redo
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Z oder Cmd+Z for Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Ctrl+Y or Cmd+Shift+Z for Redo
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        handleRedo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentHistoryIndex, history]);

  const leoNodes = nodes.filter((n) => n.data.nodeType === "leo");
  const assessmentNodes = nodes.filter((n) => n.data.nodeType === "assessment");

  const degreeMap = React.useMemo(() => {
    const map = {}; // nodeId -> { in: 0, out: 0 }
    nodes.forEach(n => (map[n.id] = { in: 0, out: 0 }));

    edges.forEach(e => {
      if (!map[e.source]) map[e.source] = { in: 0, out: 0 };
      if (!map[e.target]) map[e.target] = { in: 0, out: 0 };
      map[e.source].out += 1;
      map[e.target].in += 1;
    });

    return map;
  }, [nodes, edges]);

  const allTags = React.useMemo(() => {
    const s = new Set();
    nodes.forEach(n => {
      (n.data.tags || []).forEach(t => s.add(String(t).toLowerCase().trim()));
    });
    return Array.from(s).sort();
  }, [nodes]);


  // Apply search & filters to nodes
  // ===== FILTERLOGIK (Text + Typ + Level + Tags + Verbindungen) =====
  const filteredNodes = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tq = tagSearch.trim().toLowerCase();

    return nodes.filter((n) => {
      const inDeg = degreeMap[n.id]?.in ?? 0;
      const outDeg = degreeMap[n.id]?.out ?? 0;

      const tags = (n.data.tags || []).map((t) => String(t).toLowerCase().trim());

      // 1) Textsuche (Label + Description + NodeId + Tags)
      const searchableText = `
      ${n.data.label ?? ""}
      ${n.data.description ?? ""}
      ${n.data.nodeId ?? ""}
      ${tags.join(" ")}
    `.toLowerCase();

      const matchesSearch = q === "" ? true : searchableText.includes(q);

      // 2) Typ-Filter
      const matchesType = filterType === "all" ? true : n.data.nodeType === filterType;

      // 3) Level-Filter
      const matchesLevel =
        filterLevel === "all" ? true : String(n.data.level ?? "") === filterLevel;

      // 4) Tag Dropdown Filter
      const matchesFilterTag =
        filterTag === "all" ? true : tags.includes(String(filterTag).toLowerCase().trim());

      // 5) Tag Suche
      const matchesTagSearch =
        tq === "" ? true : tags.some((t) => t.includes(tq));

      // 6) Verbindungs-Filter
      // all | connected | isolated | hasIncoming | hasOutgoing
      const matchesConn =
        connFilter === "all"
          ? true
          : connFilter === "connected"
            ? inDeg + outDeg > 0
            : connFilter === "isolated"
              ? inDeg + outDeg === 0
              : connFilter === "hasIncoming"
                ? inDeg > 0
                : connFilter === "hasOutgoing"
                  ? outDeg > 0
                  : true;

      return (
        matchesSearch &&
        matchesType &&
        matchesLevel &&
        matchesFilterTag &&
        matchesTagSearch &&
        matchesConn
      );
    });
  }, [nodes, degreeMap, searchQuery, filterType, filterLevel, filterTag, tagSearch, connFilter]);



  console.log(
    "🔧 App render - showEdgeTypeDialog:",
    showEdgeTypeDialog,
    "showEditDialog:",
    showEditDialog
  );
  // Zoom controls
  const handleZoomIn = () => {
    const rfElement = document.querySelector('.react-flow');
    if (rfElement) {
      const zoomInButton = document.querySelector('.react-flow__controls-zoomin');
      if (zoomInButton) {
        zoomInButton.click();
      }
    }
  };

  const handleZoomOut = () => {
    const rfElement = document.querySelector('.react-flow');
    if (rfElement) {
      const zoomOutButton = document.querySelector('.react-flow__controls-zoomout');
      if (zoomOutButton) {
        zoomOutButton.click();
      }
    }
  };

  const handleFitView = () => {
    const rfElement = document.querySelector('.react-flow');
    if (rfElement) {
      const fitViewButton = document.querySelector('.react-flow__controls-fitview');
      if (fitViewButton) {
        fitViewButton.click();
      }
    }
  };

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

          <input
            type="text"
            placeholder="Search nodes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              padding: "8px 12px",
              borderRadius: "6px",
              border: "1px solid #e2e8f0",
              fontSize: "14px",
              width: "200px",
            }}
          />
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setIsFilterOpen((v) => !v)}
              style={{
                background: "white",
                color: "#0f172a",
                border: "1px solid #e2e8f0",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "500",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                whiteSpace: "nowrap",
              }}
            >
              Filter by… <span style={{ fontSize: 12, color: "#64748b" }}>{isFilterOpen ? "▲" : "▼"}</span>
            </button>

            {isFilterOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "44px",
                  right: 0,
                  width: "320px",
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                  padding: "12px",
                  zIndex: 9999,
                }}
              >
                {/* TYPES */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
                    Types
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  >
                    <option value="all">All types</option>
                    <option value="leo">LEO</option>
                    <option value="assessment">Assessment</option>
                  </select>
                </div>

                {/* LEVELS */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
                    Levels
                  </div>
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  >
                    <option value="all">All levels</option>
                    <option value="1">Level 1</option>
                    <option value="2">Level 2</option>
                    <option value="3">Level 3</option>
                    <option value="4">Level 4</option>
                    <option value="5">Level 5</option>
                    <option value="6">Level 6</option>
                  </select>
                </div>

                {/* TAGS */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
                    Tags
                  </div>

                  <input
                    type="text"
                    placeholder="Search tags..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      border: "1px solid #e2e8f0",
                      marginBottom: 8,
                    }}
                  />

                  <select
                    value={filterTag}
                    onChange={(e) => setFilterTag(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  >
                    <option value="all">All tags</option>
                    {allTags.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CONNECTIONS */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#334155", marginBottom: 6 }}>
                    Connections
                  </div>
                  <select
                    value={connFilter}
                    onChange={(e) => setConnFilter(e.target.value)}
                    style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                  >
                    <option value="all">All connections</option>
                    <option value="connected">Connected</option>
                    <option value="isolated">Isolated</option>
                    <option value="hasIncoming">Has incoming</option>
                    <option value="hasOutgoing">Has outgoing</option>
                  </select>
                </div>

                {/* ACTIONS */}
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      setFilterType("all");
                      setFilterLevel("all");
                      setFilterTag("all");
                      setTagSearch("");
                      setConnFilter("all");
                    }}
                    style={{
                      background: "white",
                      border: "1px solid #e2e8f0",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Reset
                  </button>

                  <button
                    onClick={() => setIsFilterOpen(false)}
                    style={{
                      background: "#0f172a",
                      color: "white",
                      border: "none",
                      padding: "8px 10px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: 600,
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

<div style={{ width: "1px", height: "32px", background: "#e2e8f0", marginLeft: "10px", marginRight: "10px" }} />

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

          <div style={{ width: "1px", height: "32px", background: "#e2e8f0", marginLeft: "10px", marginRight: "10px" }} />
          <button
            onClick={handleExportPNG}
            disabled={isExportingPNG}
            style={{
              background: isExportingPNG
                ? "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)"
                : "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: isExportingPNG ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginLeft: "8px",
              opacity: isExportingPNG ? 0.7 : 1,
            }}
            title="Export as PNG image"
          >
            {isExportingPNG ? (
              <>
                <span>⏳</span>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <span>📸</span>
                <span>PNG</span>
              </>
            )}
          </button>

          <button
            onClick={handleExportExcel}
            disabled={isExportingExcel}
            style={{
              background: isExportingExcel
                ? "linear-gradient(135deg, #059669 0%, #047857 100%)"
                : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "6px",
              cursor: isExportingExcel ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginLeft: "8px",
              opacity: isExportingExcel ? 0.7 : 1,
            }}
            title="Export as Excel spreadsheet"
          >
            {isExportingExcel ? (
              <>
                <span>⏳</span>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <span>📊</span>
                <span>Excel</span>
              </>
            )}
          </button>

          <div style={{ width: "1px", height: "32px", background: "#e2e8f0", marginLeft: "10px", marginRight: "10px" }} />
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <button
              onClick={handleZoomOut}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f8fafc")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
              title="Zoom out"
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              onClick={handleFitView}
              style={{
                fontSize: "14px",
                color: "#64748b",
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                padding: "4px 12px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f8fafc")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
              title="Fit view"
            >
              {zoomLevel} %
            </button>
            <button
              onClick={handleZoomIn}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                width: "32px",
                height: "32px",
                cursor: "pointer",
                fontSize: "16px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#f8fafc")}
              onMouseLeave={(e) => (e.target.style.background = "white")}
              title="Zoom in"
              aria-label="Zoom in"
            >
              +
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
          </div>

          {/* Undo/Redo Buttons */}
          <div
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              marginLeft: "15px",
              borderLeft: "1px solid #e2e8f0",
              paddingLeft: "15px",
            }}
          >
            <button
              onClick={handleUndo}
              disabled={currentHistoryIndex === 0}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                width: "36px",
                height: "36px",
                cursor: currentHistoryIndex === 0 ? "not-allowed" : "pointer",
                fontSize: "18px",
                transition: "all 0.2s",
                opacity: currentHistoryIndex === 0 ? 0.4 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (currentHistoryIndex > 0) e.target.style.background = "#f8fafc";
              }}
              onMouseLeave={(e) => (e.target.style.background = "white")}
              title="Undo (Ctrl+Z)"
              aria-label="Undo (Ctrl+Z)"
            >
              ↶
            </button>
            <button
              onClick={handleRedo}
              disabled={currentHistoryIndex >= history.length - 1}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                width: "36px",
                height: "36px",
                cursor: currentHistoryIndex >= history.length - 1 ? "not-allowed" : "pointer",
                fontSize: "18px",
                transition: "all 0.2s",
                opacity: currentHistoryIndex >= history.length - 1 ? 0.4 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onMouseEnter={(e) => {
                if (currentHistoryIndex < history.length - 1) e.target.style.background = "#f8fafc";
              }}
              onMouseLeave={(e) => (e.target.style.background = "white")}
              title="Redo (Ctrl+Y)"
              aria-label="Redo (Ctrl+Y)"
            >
              ↷
            </button>
          </div>
        </div>
      </div>

    {/* Auto Layout & New Project row */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          margin: "10px 20px",
        }}
      >
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

        <button
          onClick={() => setShowNewProjectDialog(true)}
          style={{
            background: "white",
            color: "#b91c1c",
            border: "2px solid #fecaca",
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
          New Project
        </button>
      </div>


      {/* Main Content */}
      <div style={{ display: "flex", flexGrow: 1, overflow: "hidden" }}>
        {/* Left Sidebar - Course Structure */}
        <div
          style={{
            width: isLeftSidebarOpen ? "280px" : "40px",
            minWidth: isLeftSidebarOpen ? "280px" : "40px",
            maxWidth: isLeftSidebarOpen ? "280px" : "40px",
            background: "#ffffff",
            borderRight: "1px solid #e2e8f0",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            transition: "width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease",
            flexShrink: 0,
          }}
        >
          {/* Header with Toggle Button */}
          <div
            style={{
              height: "48px",
              borderBottom: isLeftSidebarOpen ? "1px solid #e2e8f0" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: isLeftSidebarOpen ? "space-between" : "center",
              padding: isLeftSidebarOpen ? "0 10px" : "0",
              flexShrink: 0,
            }}
          >
            {isLeftSidebarOpen && (
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#64748b",
                }}
              >
                Course Structure
              </span>
            )}
            <button
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title={isLeftSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              aria-label={isLeftSidebarOpen ? "Collapse course structure sidebar" : "Expand course structure sidebar"}
              aria-expanded={isLeftSidebarOpen}
            >
              {isLeftSidebarOpen ? "◀" : "▶"}
            </button>
          </div>

          <div style={{ padding: "20px", overflow: "auto", flexGrow: 1, display: isLeftSidebarOpen ? "block" : "none" }}>

            {/* Learning Outcomes */}
            <div style={{ marginBottom: "20px" }}>
              <div
              onClick={() => setLeoExpanded(!leoExpanded)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <span style={{ marginRight: "8px" }}>
                {leoExpanded ? "▼" : "▶"} 
                </span>
                <span style={{ fontWeight: "500", color: "#1e293b" }}>
                  Learning Outcomes ({leoNodes.length})
                </span>
              </div>
              {leoExpanded && (
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
            )}
            </div>

            {/* Assessments */}
            <div>
              <div
               onClick={() => setAssessmentExpanded(!assessmentExpanded)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  cursor: "pointer",
                }}
              >
                <span style={{ marginRight: "8px" }}>
                 {assessmentExpanded ? "▼" : "▶"}
                </span>
                <span style={{ fontWeight: "500", color: "#1e293b" }}>
                  Assessments ({assessmentNodes.length})
                </span>
              </div>
              {assessmentExpanded && (
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
            )}
            </div>
          </div>
        </div>

        {/* Center - Graph */}
        <div style={{
          flexGrow: 1,
          background: "#f8fafc",
          transition: "all 0.3s ease",
          minWidth: 0
        }}>
          {nodes.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#64748b",
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
              nodes={filteredNodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onEdgeClick={onEdgeClick}
              nodeTypes={nodeTypes}
              fitView
              proOptions={{ hideAttribution: true }}
              onMove={(event, viewport) => {
                const zoom = Math.round(viewport.zoom * 100);
                const roundedZoom = Math.round(zoom / 25) * 25;
                setZoomLevel(roundedZoom);
              }}
            >
              <Controls />
              <Background variant="dots" gap={12} size={1} color="#cbd5e1" />
            </ReactFlow>
          )}
        </div>

        {/* Right Sidebar - Properties */}
        <div
          style={{
            width: isRightSidebarOpen ? "320px" : "40px",
            minWidth: isRightSidebarOpen ? "320px" : "40px",
            maxWidth: isRightSidebarOpen ? "320px" : "40px",
            background: "#ffffff",
            borderLeft: "1px solid #e2e8f0",
            overflow: "hidden",
            transition: "width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
          }}
        >
          {/* Header with Toggle Button */}
          <div
            style={{
              height: "48px",
              borderBottom: isRightSidebarOpen ? "1px solid #e2e8f0" : "none",
              display: "flex",
              alignItems: "center",
              justifyContent: isRightSidebarOpen ? "flex-start" : "center",
              padding: isRightSidebarOpen ? "0 10px" : "0",
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                width: "28px",
                height: "28px",
                cursor: "pointer",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              title={isRightSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isRightSidebarOpen ? "▶" : "◀"}
            </button>
            {isRightSidebarOpen && (
              <span
                style={{
                  marginLeft: "10px",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#64748b",
                }}
              >
                Properties
              </span>
            )}
          </div>

          <div style={{ overflow: "auto", flexGrow: 1, display: isRightSidebarOpen ? "block" : "none" }}>
            <NodeProperties
              node={selectedNode}
              edge={selectedEdge}
              nodes={nodes}
              edges={edges}
              onDeleteEdge={handleDeleteEdge}
              onEditNode={handleEditNode}
              onEditConnection={handleEditConnection}
            />
          </div>
        </div>
      </div>

      {/* Add Node Dialog */}
      {
        showDialog && (
          <AddNodeDialog
            initialType={showDialog.type}
            onAdd={addNode}
            onCancel={() => setShowDialog(false)}
            allTags={allTags}
          />
        )
      }

      {/* Save/Load Dialog */}
      {
        showSaveLoadDialog && (
          <SaveLoadDialog
            nodes={nodes}
            edges={edges}
            onLoad={handleLoadCourse}
            onClose={() => setShowSaveLoadDialog(false)}
          />
        )
      }

      {/* Edge Type Dialog */}
      {
        showEdgeTypeDialog && pendingConnection && (
          <EdgeTypeDialog
            sourceNode={pendingConnection.sourceNode}
            targetNode={pendingConnection.targetNode}
            onConfirm={handleEdgeTypeConfirm}
            onCancel={() => {
              console.log("EdgeTypeDialog cancelled");
              setShowEdgeTypeDialog(false);
              setPendingConnection(null);
            }}
          />
        )
      }

      {/* Edit Node Dialog */}
      {showEditDialog && nodeToEdit && (
        <EditNodeDialog
          node={nodeToEdit}
          onSave={handleSaveEdit}
          onCancel={() => {
            console.log("Edit cancelled");
            setShowEditDialog(false);
            setNodeToEdit(null);
          }}
          allTags={allTags}
        />
      )}



      {/* Edit Connection Dialog */}
      {
        showEditConnectionDialog && connectionToEdit && (
          <EditConnectionDialog
            edge={connectionToEdit.edge}
            sourceNode={connectionToEdit.sourceNode}
            targetNode={connectionToEdit.targetNode}
            onSave={handleSaveConnection}
            onDelete={handleDeleteConnection}
            onCancel={() => {
              console.log("❌ Edit connection cancelled");
              setShowEditConnectionDialog(false);
              setConnectionToEdit(null);
            }}
          />
        )
      }

      {/* New Project Dialog */}
      {
        showNewProjectDialog && (
          <NewProjectDialog
            onCancel={() => setShowNewProjectDialog(false)}
            onConfirm={handleNewProject}
          />
        )
      }
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
        <div style={{
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
          zIndex: 999
        }}>
          💾 Auto-saved at {lastSaved.toLocaleTimeString()}
        </div>
      )}
    </div>

);
}

export default App;

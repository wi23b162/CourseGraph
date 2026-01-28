import { useState, useCallback } from 'react';
import { addEdge } from 'reactflow';
import { getEdgeStyle, getEdgeLabel, getEdgeLabelStyle } from '../components/edgeUtils';

/**
 * Custom hook for managing edge operations
 * Handles creating, editing, and deleting edges
 */
export const useEdgeManagement = ({ nodes, edges, setEdges, selectedEdge, setSelectedEdge }) => {
  const [pendingConnection, setPendingConnection] = useState(null);
  const [connectionToEdit, setConnectionToEdit] = useState(null);
  const [showEdgeTypeDialog, setShowEdgeTypeDialog] = useState(false);
  const [showEditConnectionDialog, setShowEditConnectionDialog] = useState(false);

  const onConnect = useCallback(
    (params) => {
      // Find source and target nodes
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);

      if (sourceNode && targetNode) {
        setPendingConnection({ params, sourceNode, targetNode });
        setShowEdgeTypeDialog(true);
      }
    },
    [nodes]
  );

  const handleEdgeTypeConfirm = (edgeType) => {
    if (pendingConnection) {
      const style = getEdgeStyle(edgeType);
      const label = getEdgeLabel(edgeType);
      const labelStyle = getEdgeLabelStyle(edgeType);

      const newEdge = {
        ...pendingConnection.params,
        animated: true,
        type: 'smoothstep',
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
          strokeWidth: 1,
        },
        labelBgPadding: [8, 4],
        data: { edgeType },
      };

      setEdges((eds) => addEdge(newEdge, eds));
    }

    setShowEdgeTypeDialog(false);
    setPendingConnection(null);
  };

  const onNodeClick = useCallback((event, node) => {
    // Node click handler will be passed to components
  }, []);

  const onEdgeClick = useCallback(
    (event, edge) => {
      // Find source and target nodes
      const sourceNode = nodes.find((n) => n.id === edge.source);
      const targetNode = nodes.find((n) => n.id === edge.target);

      if (sourceNode && targetNode) {
        setConnectionToEdit({ edge, sourceNode, targetNode });
        setShowEditConnectionDialog(true);
      }
    },
    [nodes]
  );

  const handleChangeEdgeType = (edgeId, newType) => {
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
              strokeWidth: 1,
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
    if (window.confirm('Delete this connection?')) {
      setEdges((eds) => eds.filter((e) => e.id !== edgeId));
      setSelectedEdge(null);
    }
  };

  const handleSaveConnection = (newEdgeType) => {
    if (connectionToEdit) {
      handleChangeEdgeType(connectionToEdit.edge.id, newEdgeType);
      setShowEditConnectionDialog(false);
      setConnectionToEdit(null);
    }
  };

  const handleDeleteConnection = () => {
    if (connectionToEdit) {
      setEdges((eds) => eds.filter((e) => e.id !== connectionToEdit.edge.id));
      setSelectedEdge(null);
      setShowEditConnectionDialog(false);
      setConnectionToEdit(null);
    }
  };

  const handleEditConnection = (edge, sourceNode, targetNode) => {
    setConnectionToEdit({ edge, sourceNode, targetNode });
    setShowEditConnectionDialog(true);
  };

  return {
    pendingConnection,
    connectionToEdit,
    showEdgeTypeDialog,
    setShowEdgeTypeDialog,
    showEditConnectionDialog,
    setShowEditConnectionDialog,
    onConnect,
    handleEdgeTypeConfirm,
    onNodeClick,
    onEdgeClick,
    handleChangeEdgeType,
    handleDeleteEdge,
    handleEditConnection,
    handleSaveConnection,
    handleDeleteConnection,
    setPendingConnection,
    setConnectionToEdit,
  };
};

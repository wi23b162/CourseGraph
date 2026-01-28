import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for managing node operations
 * Handles adding, editing, deleting nodes and related dialogs
 */
export const useNodeManagement = ({ nodes, setNodes, edges, setEdges, selectedNode, setSelectedNode }) => {
  const [nodeIdCounter, setNodeIdCounter] = useState(1);
  const [nodeToEdit, setNodeToEdit] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Reset nodeIdCounter when all nodes are deleted
  useEffect(() => {
    if (nodes.length === 0) {
      setNodeIdCounter(1);
    }
  }, [nodes.length]);

  const deleteNode = useCallback(
    (nodeId) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
      if (selectedNode?.id === nodeId) {
        setSelectedNode(null);
      }
    },
    [setNodes, setEdges, selectedNode, setSelectedNode]
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

  // Inject callbacks into nodes
  useEffect(() => {
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
        tags: cleanTags,
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

  const handleEditNode = (node) => {
    setNodeToEdit(node);
    setShowEditDialog(true);
  };

  const handleSaveEdit = (updatedNode) => {
    setNodes((nds) => nds.map((n) => (n.id === updatedNode.id ? updatedNode : n)));
    setShowEditDialog(false);
    setNodeToEdit(null);
  };

  const resetCounter = () => {
    setNodeIdCounter(1);
  };

  return {
    nodeIdCounter,
    setNodeIdCounter,
    nodeToEdit,
    showDialog,
    setShowDialog,
    showEditDialog,
    setShowEditDialog,
    addNode,
    deleteNode,
    changeLabelNode,
    handleEditNode,
    handleSaveEdit,
    resetCounter,
  };
};

import { useState, useEffect } from 'react';

/**
 * Custom hook for managing undo/redo history
 * Handles history state, undo/redo operations, and keyboard shortcuts
 */
export const useUndoRedo = ({ nodes, edges, setNodes, setEdges, initialNodes, initialEdges }) => {
  const [history, setHistory] = useState([{ nodes: initialNodes || nodes, edges: initialEdges || edges }]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);

  // Save to history when nodes or edges change
  useEffect(() => {
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
  }, [nodes, edges]);

  const handleUndo = () => {
    if (currentHistoryIndex > 0) {
      const newIndex = currentHistoryIndex - 1;
      const previousState = history[newIndex];

      setNodes(previousState.nodes);
      setEdges(previousState.edges);
      setCurrentHistoryIndex(newIndex);
    }
  };

  const handleRedo = () => {
    if (currentHistoryIndex < history.length - 1) {
      const newIndex = currentHistoryIndex + 1;
      const nextState = history[newIndex];

      setNodes(nextState.nodes);
      setEdges(nextState.edges);
      setCurrentHistoryIndex(newIndex);
    }
  };

  // Keyboard shortcuts for Undo/Redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Z or Cmd+Z for Undo
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

  return {
    handleUndo,
    handleRedo,
    currentHistoryIndex,
    canUndo: currentHistoryIndex > 0,
    canRedo: currentHistoryIndex < history.length - 1,
  };
};

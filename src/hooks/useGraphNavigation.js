import { useState } from 'react';
import { useReactFlow } from 'reactflow';

/**
 * Custom hook for managing graph navigation (zoom, fit view)
 * Uses ReactFlow's useReactFlow hook for better integration
 */
export const useGraphNavigation = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const handleZoomIn = () => {
    zoomIn();
  };

  const handleZoomOut = () => {
    zoomOut();
  };

  const handleFitView = () => {
    fitView();
  };

  const handleViewportChange = (event, viewport) => {
    const zoom = Math.round(viewport.zoom * 100);
    const roundedZoom = Math.round(zoom / 25) * 25;
    setZoomLevel(roundedZoom);
  };

  return {
    zoomLevel,
    handleZoomIn,
    handleZoomOut,
    handleFitView,
    handleViewportChange,
  };
};

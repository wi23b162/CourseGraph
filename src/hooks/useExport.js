import { useState } from 'react';
import { exportToPNG, exportToExcel } from '../utils/exportUtils';
import { autoLayoutGraph } from '../utils/autoLayout';

/**
 * Custom hook for managing export functionality
 * Handles PNG, Excel export, and auto-layout
 */
export const useExport = ({ nodes, edges, setNodes }) => {
  const [isExportingPNG, setIsExportingPNG] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const handleExportPNG = async () => {
    setIsExportingPNG(true);
    try {
      await exportToPNG();
    } finally {
      setIsExportingPNG(false);
    }
  };

  const handleExportExcel = () => {
    setIsExportingExcel(true);
    try {
      exportToExcel(nodes, edges);
    } finally {
      setIsExportingExcel(false);
    }
  };

  const handleAutoLayout = () => {
    setNodes((current) => autoLayoutGraph(current, edges));
  };

  return {
    isExportingPNG,
    isExportingExcel,
    handleExportPNG,
    handleExportExcel,
    handleAutoLayout,
  };
};

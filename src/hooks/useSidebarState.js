import { useState, useEffect } from 'react';

/**
 * Custom hook for managing sidebar state
 * Handles left/right sidebar open/close and LEO/Assessment expansion
 */
export const useSidebarState = () => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [leoExpanded, setLeoExpanded] = useState(true);
  const [assessmentExpanded, setAssessmentExpanded] = useState(true);

  // Trigger window resize when sidebars toggle to help ReactFlow adjust
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 350); // Wait for transition to complete
    return () => clearTimeout(timer);
  }, [isLeftSidebarOpen, isRightSidebarOpen]);

  return {
    isLeftSidebarOpen,
    setIsLeftSidebarOpen,
    isRightSidebarOpen,
    setIsRightSidebarOpen,
    leoExpanded,
    setLeoExpanded,
    assessmentExpanded,
    setAssessmentExpanded,
  };
};

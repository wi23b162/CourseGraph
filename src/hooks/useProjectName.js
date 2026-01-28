import { useState, useEffect } from 'react';

/**
 * Custom hook for managing project name
 * Handles state, localStorage persistence, and edit mode
 */
export const useProjectName = () => {
  const [projectName, setProjectName] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);

  // Load project name from localStorage on mount
  useEffect(() => {
    const savedName = localStorage.getItem('coursegraph_project_name');
    setProjectName(savedName || 'Untitled Project');
  }, []);

  // Save project name to localStorage whenever it changes
  useEffect(() => {
    if (projectName) {
      localStorage.setItem('coursegraph_project_name', projectName);
    }
  }, [projectName]);

  const handleNameClick = () => {
    setIsEditingName(true);
  };

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleNameBlur = () => {
    setIsEditingName(false);
    // Ensure we don't save an empty name
    if (!projectName.trim()) {
      setProjectName('Untitled Project');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNameBlur();
    }
  };

  return {
    projectName,
    setProjectName,
    isEditingName,
    handleNameClick,
    handleNameChange,
    handleNameBlur,
    handleKeyDown,
  };
};

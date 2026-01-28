import React, { useEffect } from 'react';

// Save/Load Manager Hook
export const useSaveLoad = (nodes, edges, onSave) => {
  // Save immediately when nodes or edges change (debounced to avoid too many writes)
  useEffect(() => {
    // Only save if there are actual nodes (avoid overwriting with defaults)
    if (nodes.length > 0) {
      const timeoutId = setTimeout(() => {
        saveToLocalStorage(nodes, edges, onSave);
      }, 500); // 500ms debounce
      return () => clearTimeout(timeoutId);
    }
  }, [nodes, edges, onSave]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToLocalStorage(nodes, edges,onSave);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [nodes, edges,onSave]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage();
  }, []);

  return {
    saveToFile,
    loadFromFile,
    exportAsJSON,
    clearAutoSave
  };
};

// Save to localStorage (auto-save)
const saveToLocalStorage = (nodes, edges, onSaveCallback) => {
  try {
    const projectName = localStorage.getItem('coursegraph_project_name') || 'Untitled Project';
    const data = {
      nodes,
      edges,
      projectName,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('coursegraph_autosave', JSON.stringify(data));

    if (onSaveCallback) {
      onSaveCallback(new Date());
    }
  } catch (error) {
    // Auto-save failed
  }
};

// Load from localStorage
export const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('coursegraph_autosave');
    if (saved) {
      const data = JSON.parse(saved);
      // Restore project name if available
      if (data.projectName) {
        localStorage.setItem('coursegraph_project_name', data.projectName);
      }
      return data;
    }
  } catch (error) {
    // Load from localStorage failed
  }
  return null;
};

// Clear auto-save
export const clearAutoSave = () => {
  localStorage.removeItem('coursegraph_autosave');
  localStorage.removeItem('coursegraph_manual_save');
  localStorage.removeItem('coursegraph_project_name');
};

// Save to localStorage as manual save (when user clicks "Save")
export const saveManualToLocalStorage = (nodes, edges) => {
  try {
    const projectName = localStorage.getItem('coursegraph_project_name') || 'Untitled Project';
    const data = {
      nodes,
      edges,
      projectName,
      timestamp: new Date().toISOString(),
      version: '1.0',
      isManualSave: true
    };
    localStorage.setItem('coursegraph_manual_save', JSON.stringify(data));
    return true;
  } catch (error) {
    // Manual save failed
    return false;
  }
};

// Load manual save from localStorage (priority over auto-save)
export const loadManualFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('coursegraph_manual_save');
    if (saved) {
      const data = JSON.parse(saved);
      // Restore project name if available
      if (data.projectName) {
        localStorage.setItem('coursegraph_project_name', data.projectName);
      }
      return data;
    }
  } catch (error) {
    // Load manual save failed
  }
  return null;
};

// Save to file (download) - also saves to localStorage as manual save
const saveToFile = (nodes, edges, filename = 'course-graph') => {
  try {
    const projectName = localStorage.getItem('coursegraph_project_name') || 'Untitled Project';
    const data = {
      nodes,
      edges,
      projectName,
      timestamp: new Date().toISOString(),
      version: '1.0',
      metadata: {
        projectName,
        totalNodes: nodes.length,
        totalEdges: edges.length,
        leoCount: nodes.filter(n => n.data.nodeType === 'leo').length,
        assessmentCount: nodes.filter(n => n.data.nodeType === 'assessment').length
      }
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Also save to localStorage as manual save (will be loaded on app restart)
    saveManualToLocalStorage(nodes, edges);

    return true;
  } catch (error) {
    // Save to file failed
    return false;
  }
};

// Load from file (upload)
const loadFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        // Validate data structure
        if (!data.nodes || !data.edges) {
          throw new Error('Invalid file format');
        }

        resolve(data);
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
};

// Export as JSON (same as save but with different naming)
const exportAsJSON = (nodes, edges, filename = 'course-graph-export') => {
  return saveToFile(nodes, edges, filename);
};

// Export Dialog Component
export const SaveLoadDialog = ({ nodes, edges, onLoad, onClose, projectName, onProjectNameChange }) => {
  const [activeTab, setActiveTab] = React.useState('save');
  // Use project name as default filename (sanitized for file system)
  const sanitizedProjectName = (projectName || 'my-course').replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase();
  const [filename, setFilename] = React.useState(sanitizedProjectName);
  const [message, setMessage] = React.useState('');
  const dialogRef = React.useRef(null);

  const handleSave = () => {
    saveToFile(nodes, edges, filename);
    onClose();
  };

  // Handle keyboard shortcuts (ESC to close, Enter to save)
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
      if (e.key === 'Enter' && activeTab === 'save') {
        e.preventDefault();
        handleSave();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, activeTab, nodes, edges, filename]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await loadFromFile(file);
      // Restore project name if available
      if (data.projectName) {
        localStorage.setItem('coursegraph_project_name', data.projectName);
        // Update React state so UI reflects the loaded project name
        if (onProjectNameChange) {
          onProjectNameChange(data.projectName);
        }
      }
      onLoad(data.nodes, data.edges);
      setMessage('✅ Course loaded successfully!');
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      setMessage('❌ Failed to load course: ' + error.message);
    }
  };

  const handleLoadAutoSave = () => {
    const saved = loadFromLocalStorage();
    if (saved) {
      // Update React state so UI reflects the loaded project name
      if (saved.projectName && onProjectNameChange) {
        onProjectNameChange(saved.projectName);
      }
      onLoad(saved.nodes, saved.edges);
      setMessage('✅ Auto-save loaded successfully!');
      setTimeout(() => onClose(), 1500);
    } else {
      setMessage('❌ No auto-save found');
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="save-load-dialog-title"
    >
      <div
        ref={dialogRef}
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          minWidth: '500px',
          maxWidth: '600px',
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2
            id="save-load-dialog-title"
            style={{
              margin: 0,
              color: '#1e293b',
              fontSize: '24px',
              fontWeight: '600'
            }}
          >
            Save / Load Course
          </h2>
          <button
            onClick={onClose}
            style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px',
          marginBottom: '24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <button
            onClick={() => setActiveTab('save')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'save' ? '2px solid #3b82f6' : 'none',
              color: activeTab === 'save' ? '#3b82f6' : '#64748b',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            💾 Save
          </button>
          <button
            onClick={() => setActiveTab('load')}
            style={{
              padding: '12px 24px',
              border: 'none',
              background: 'transparent',
              borderBottom: activeTab === 'load' ? '2px solid #3b82f6' : 'none',
              color: activeTab === 'load' ? '#3b82f6' : '#64748b',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            📂 Load
          </button>
        </div>

        {/* Save Tab */}
        {activeTab === 'save' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500', 
                color: '#1e293b',
                fontSize: '14px'
              }}>
                Filename:
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="my-course"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <div style={{ 
                fontSize: '12px', 
                color: '#64748b', 
                marginTop: '4px' 
              }}>
                Will be saved as: {filename}-{Date.now()}.json
              </div>
            </div>

            <div style={{
              background: '#f8fafc',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1e293b' }}>
                Course Summary:
              </h4>
              <div style={{ fontSize: '13px', color: '#64748b' }}>
                📘 Learning Outcomes: {nodes.filter(n => n.data.nodeType === 'leo').length}<br />
                ✅ Assessments: {nodes.filter(n => n.data.nodeType === 'assessment').length}<br />
                🔗 Connections: {edges.length}
              </div>
            </div>

            <button
              onClick={handleSave}
              style={{
                width: '100%',
                padding: '12px',
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              💾 Save Course
            </button>
          </div>
        )}

        {/* Load Tab */}
        {activeTab === 'load' && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '8px', 
                fontWeight: '500', 
                color: '#1e293b',
                fontSize: '14px'
              }}>
                Load from file:
              </label>
              <input
  id="file-upload"
  type="file"
  accept=".json"
  onChange={handleFileSelect}
  style={{ display: 'none' }}
/>
<label
  htmlFor="file-upload"
  style={{
    display: 'block',
    width: '100%',
    padding: '12px',
    background: 'white',
    color: '#1e293b',
    border: '2px dashed #e2e8f0',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    textAlign: 'center',
    boxSizing: 'border-box'
  }}
          >
          📄 Choose File 
            </label>
            </div>

            <div style={{
              textAlign: 'center',
              margin: '20px 0',
              color: '#64748b',
              fontSize: '14px'
            }}>
              — OR —
            </div>

            <button
              onClick={handleLoadAutoSave}
              style={{
                width: '100%',
                padding: '12px',
                background: '#f8fafc',
                color: '#3b82f6',
                border: '2px solid #3b82f6',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              📂 Load from Auto-Save
            </button>

            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: '#fef3c7',
              borderRadius: '6px',
              fontSize: '13px',
              color: '#78350f'
            }}>
              💡 Tip: Your work is auto-saved every 30 seconds
            </div>
          </div>
        )}

        {/* Message */}
        {message && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: message.includes('✅') ? '#d1fae5' : '#fef2f2',
            color: message.includes('✅') ? '#065f46' : '#991b1b',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveLoadDialog;
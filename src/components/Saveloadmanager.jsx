import React, { useEffect } from 'react';

// Save/Load Manager Hook
export const useSaveLoad = (nodes, edges) => {
  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      saveToLocalStorage(nodes, edges);
    }, 30000); // 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [nodes, edges]);

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveToLocalStorage(nodes, edges);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [nodes, edges]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromLocalStorage();
    if (saved) {
      console.log('📂 Loaded from auto-save:', saved.nodes.length, 'nodes');
    }
  }, []);

  return {
    saveToFile,
    loadFromFile,
    exportAsJSON,
    clearAutoSave
  };
};

// Save to localStorage (auto-save)
const saveToLocalStorage = (nodes, edges) => {
  try {
    const data = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem('coursegraph_autosave', JSON.stringify(data));
    console.log('💾 Auto-saved:', nodes.length, 'nodes');
  } catch (error) {
    console.error('❌ Auto-save failed:', error);
  }
};

// Load from localStorage
export const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('coursegraph_autosave');
    if (saved) {
      const data = JSON.parse(saved);
      return data;
    }
  } catch (error) {
    console.error('❌ Load from localStorage failed:', error);
  }
  return null;
};

// Clear auto-save
const clearAutoSave = () => {
  localStorage.removeItem('coursegraph_autosave');
  console.log('🗑️ Auto-save cleared');
};

// Save to file (download)
const saveToFile = (nodes, edges, filename = 'course-graph') => {
  try {
    const data = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
      version: '1.0',
      metadata: {
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

    console.log('💾 Saved to file:', filename);
    return true;
  } catch (error) {
    console.error('❌ Save to file failed:', error);
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

        console.log('📂 Loaded from file:', data.nodes.length, 'nodes');
        resolve(data);
      } catch (error) {
        console.error('❌ Load from file failed:', error);
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
export const SaveLoadDialog = ({ nodes, edges, onLoad, onClose }) => {
  const [activeTab, setActiveTab] = React.useState('save');
  const [filename, setFilename] = React.useState('my-course');
  const [message, setMessage] = React.useState('');

  const handleSave = () => {
    const success = saveToFile(nodes, edges, filename);
    if (success) {
      setMessage('✅ Course saved successfully!');
      setTimeout(() => onClose(), 1500);
    } else {
      setMessage('❌ Failed to save course');
    }
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await loadFromFile(file);
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
      onLoad(saved.nodes, saved.edges);
      setMessage('✅ Auto-save loaded successfully!');
      setTimeout(() => onClose(), 1500);
    } else {
      setMessage('❌ No auto-save found');
    }
  };

  return (
    <div style={{
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
    }}>
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '12px',
        minWidth: '500px',
        maxWidth: '600px',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)',
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ 
            margin: 0, 
            color: '#1e293b',
            fontSize: '24px',
            fontWeight: '600'
          }}>
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
                type="file"
                accept=".json"
                onChange={handleFileSelect}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{
              textAlign: 'center',
              margin: '20px 0',
              color: '#94a3b8',
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
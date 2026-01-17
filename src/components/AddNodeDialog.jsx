import React, { useState, useEffect, useRef } from 'react';

const AddNodeDialog = ({ initialType, onAdd, onCancel, allTags }) => {
  const [nodeType] = useState(initialType || 'leo');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('3');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedExistingTag, setSelectedExistingTag] = useState("");
  const dialogRef = useRef(null);

  // Handle ESC key to close dialog
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);


  const normalizeTag = (t) => t.trim();

  const addTag = () => {
    const t = normalizeTag(tagInput);
    if (!t) return;

    const exists = tags.some(x => String(x).toLowerCase() === t.toLowerCase());
    if (exists) {
      setTagInput('');
      return;
    }

    setTags(prev => [...prev, t]);
    setTagInput('');
  };

  const removeTag = (t) => {
    setTags(prev => prev.filter(x => x !== t));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd({
        type: nodeType,
        label: title.trim(),
        description: description.trim(),
        level: parseInt(level),
        tags: tags.map(t => String(t).trim()).filter(Boolean),
      });

      setTitle('');
      setDescription('');
      setLevel('3');
      setTags([]);
      setTagInput('');
      setSelectedExistingTag("");
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
      aria-labelledby="add-node-dialog-title"
    >
      <div
        ref={dialogRef}
        style={{
          background: 'white',
          padding: '30px',
          borderRadius: '12px',
          minWidth: '500px',
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
            id="add-node-dialog-title"
            style={{
              margin: 0,
              color: '#1e293b',
              fontSize: '24px',
              fontWeight: '600'
            }}
          >
            Adding {nodeType === 'leo' ? 'Learning Outcome' : 'Assessment'}
          </h2>
          <button
            onClick={onCancel}
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

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#1e293b',
              fontSize: '14px'
            }}>
              Title: <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={nodeType === 'leo' ? 'e.g., Apply Object Orientation' : 'e.g., Midterm Exam'}
              autoFocus
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#1e293b',
              fontSize: '14px'
            }}>
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={nodeType === 'leo'
                ? 'Students can create classes and objects and apply the principles of OOP...'
                : 'Assessment description...'}
              rows={4}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>

          {/* Level (only for LEO) */}
          {nodeType === 'leo' && (
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#1e293b',
                fontSize: '14px'
              }}>
                Level:
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  background: 'white',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
              >
                <option value="1">Level 1: Remember</option>
                <option value="2">Level 2: Understand</option>
                <option value="3">Level 3: Apply / Analyze</option>
                <option value="4">Level 4: Evaluate</option>
                <option value="5">Level 5: Create</option>
                <option value="6">Level 6: Advanced</option>
              </select>
            </div>
          )}

          {/* Tags */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#1e293b',
              fontSize: '14px'
            }}>
              Tags:
            </label>

            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag..."
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
              />

              <button
                type="button"
                onClick={addTag}
                style={{
                  padding: '10px 18px',
                  border: 'none',
                  borderRadius: '6px',
                  background: '#0f172a',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  whiteSpace: "nowrap"
                }}
              >
                Add
              </button>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px" }}>
              {tags.length === 0 ? (
                <span style={{ color: "#64748b", fontSize: 13 }}>No tags yet</span>
              ) : (
                tags.map((t) => (
                  <span
                    key={t}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "999px",
                      padding: "6px 10px",
                      background: "white",
                      color: "#334155",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {t}
                    <button
                      type="button"
                      onClick={() => removeTag(t)}
                      style={{
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontWeight: 900,
                        color: "#64748b"
                      }}
                      title="Remove tag"
                    >
                      ✕
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* Existing tags dropdown */}
          <div style={{ marginTop: 10, display: "flex", gap: 10 }}>
            <select
              value={selectedExistingTag}
              onChange={(e) => setSelectedExistingTag(e.target.value)}
              style={{
                flex: 1,
                padding: "12px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "14px",
                background: "white",
                cursor: "pointer",
                boxSizing: "border-box"
              }}
            >
              <option value="">Select existing tag…</option>
              {(allTags || [])
                .filter(t => !tags.some(x => x.toLowerCase() === t.toLowerCase()))
                .map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}

            </select>

            <button
              type="button"
              disabled={!selectedExistingTag}
              onClick={() => {
                const t = String(selectedExistingTag).trim();
                if (!t) return;

                const exists = tags.some(x => String(x).toLowerCase() === t.toLowerCase());
                if (!exists) setTags(prev => [...prev, t]);

                setSelectedExistingTag("");
              }}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "6px",
                background: "#0f172a",
                color: "white",
                cursor: selectedExistingTag ? "pointer" : "not-allowed",
                opacity: selectedExistingTag ? 1 : 0.5,
                whiteSpace: "nowrap"
              }}
            >
              Add selected
            </button>
          </div>



          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end',
            marginTop: '30px'
          }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '10px 24px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: 'white',
                color: '#64748b',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              style={{
                padding: '10px 24px',
                border: 'none',
                borderRadius: '6px',
                background: title.trim() ? '#3b82f6' : '#cbd5e1',
                color: 'white',
                cursor: title.trim() ? 'pointer' : 'not-allowed',
                fontWeight: '500',
                fontSize: '14px'
              }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNodeDialog;
import React from 'react';

/**
 * Filter panel component with dropdowns for type, level, tags, and connections
 */
const FilterPanel = ({
  isFilterOpen,
  setIsFilterOpen,
  filterType,
  setFilterType,
  filterLevel,
  setFilterLevel,
  tagSearch,
  setTagSearch,
  filterTag,
  setFilterTag,
  connFilter,
  setConnFilter,
  allTags,
  resetFilters,
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsFilterOpen((v) => !v)}
        style={{
          background: 'white',
          color: '#0f172a',
          border: '1px solid #e2e8f0',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          whiteSpace: 'nowrap',
        }}
      >
        Filter by… <span style={{ fontSize: 12, color: '#64748b' }}>{isFilterOpen ? '▲' : '▼'}</span>
      </button>

      {isFilterOpen && (
        <div
          style={{
            position: 'absolute',
            top: '44px',
            right: 0,
            width: '320px',
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '10px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.08)',
            padding: '12px',
            zIndex: 9999,
          }}
        >
          {/* Types */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Types
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            >
              <option value="all">All types</option>
              <option value="leo">LEO</option>
              <option value="assessment">Assessment</option>
            </select>
          </div>

          {/* Levels */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Levels
            </div>
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            >
              <option value="all">All levels</option>
              <option value="1">Level 1</option>
              <option value="2">Level 2</option>
              <option value="3">Level 3</option>
              <option value="4">Level 4</option>
              <option value="5">Level 5</option>
              <option value="6">Level 6</option>
            </select>
          </div>

          {/* Tags */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Tags
            </div>

            <input
              type="text"
              placeholder="Search tags..."
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                marginBottom: 8,
              }}
            />

            <select
              value={filterTag}
              onChange={(e) => setFilterTag(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            >
              <option value="all">All tags</option>
              {allTags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          {/* Connections */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Connections
            </div>
            <select
              value={connFilter}
              onChange={(e) => setConnFilter(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            >
              <option value="all">All connections</option>
              <option value="connected">Connected</option>
              <option value="isolated">Isolated</option>
              <option value="hasIncoming">Has incoming</option>
              <option value="hasOutgoing">Has outgoing</option>
            </select>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button
              onClick={resetFilters}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                padding: '8px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Reset
            </button>

            <button
              onClick={() => setIsFilterOpen(false)}
              style={{
                background: '#0f172a',
                color: 'white',
                border: 'none',
                padding: '8px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;

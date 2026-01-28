import React from 'react';

/**
 * Search bar component for filtering nodes
 */
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search nodes..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={{
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #e2e8f0',
        fontSize: '14px',
        width: '200px',
      }}
    />
  );
};

export default SearchBar;

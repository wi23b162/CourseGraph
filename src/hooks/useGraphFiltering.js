import { useState, useMemo } from 'react';

/**
 * Custom hook for managing graph filtering logic
 * Handles search, type, level, tag, and connection filters
 */
export const useGraphFiltering = ({ nodes, edges }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');
  const [tagSearch, setTagSearch] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [connFilter, setConnFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Calculate degree map (in/out connections for each node)
  const degreeMap = useMemo(() => {
    const map = {};
    nodes.forEach((n) => (map[n.id] = { in: 0, out: 0 }));

    edges.forEach((e) => {
      if (!map[e.source]) map[e.source] = { in: 0, out: 0 };
      if (!map[e.target]) map[e.target] = { in: 0, out: 0 };
      map[e.source].out += 1;
      map[e.target].in += 1;
    });

    return map;
  }, [nodes, edges]);

  // Extract all unique tags from nodes
  const allTags = useMemo(() => {
    const s = new Set();
    nodes.forEach((n) => {
      (n.data.tags || []).forEach((t) => s.add(String(t).toLowerCase().trim()));
    });
    return Array.from(s).sort();
  }, [nodes]);

  // Apply all filters to nodes
  const filteredNodes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tq = tagSearch.trim().toLowerCase();

    return nodes.filter((n) => {
      const inDeg = degreeMap[n.id]?.in ?? 0;
      const outDeg = degreeMap[n.id]?.out ?? 0;

      const tags = (n.data.tags || []).map((t) => String(t).toLowerCase().trim());

      // 1) Text search (Label + Description + NodeId + Tags)
      const searchableText = `
        ${n.data.label ?? ''}
        ${n.data.description ?? ''}
        ${n.data.nodeId ?? ''}
        ${tags.join(' ')}
      `.toLowerCase();

      const matchesSearch = q === '' ? true : searchableText.includes(q);

      // 2) Type filter
      const matchesType = filterType === 'all' ? true : n.data.nodeType === filterType;

      // 3) Level filter
      const matchesLevel = filterLevel === 'all' ? true : String(n.data.level ?? '') === filterLevel;

      // 4) Tag dropdown filter
      const matchesFilterTag = filterTag === 'all' ? true : tags.includes(String(filterTag).toLowerCase().trim());

      // 5) Tag search
      const matchesTagSearch = tq === '' ? true : tags.some((t) => t.includes(tq));

      // 6) Connection filter
      const matchesConn =
        connFilter === 'all'
          ? true
          : connFilter === 'connected'
            ? inDeg + outDeg > 0
            : connFilter === 'isolated'
              ? inDeg + outDeg === 0
              : connFilter === 'hasIncoming'
                ? inDeg > 0
                : connFilter === 'hasOutgoing'
                  ? outDeg > 0
                  : true;

      return (
        matchesSearch &&
        matchesType &&
        matchesLevel &&
        matchesFilterTag &&
        matchesTagSearch &&
        matchesConn
      );
    });
  }, [nodes, degreeMap, searchQuery, filterType, filterLevel, filterTag, tagSearch, connFilter]);

  const resetFilters = () => {
    setFilterType('all');
    setFilterLevel('all');
    setFilterTag('all');
    setTagSearch('');
    setConnFilter('all');
  };

  return {
    searchQuery,
    setSearchQuery,
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
    isFilterOpen,
    setIsFilterOpen,
    degreeMap,
    allTags,
    filteredNodes,
    resetFilters,
  };
};

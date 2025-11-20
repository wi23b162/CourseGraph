// Edge styling utilities

export const getEdgeStyle = (edgeType) => {
  const styles = {
    requires: {
      stroke: '#f97316',
      strokeWidth: 3,
      strokeDasharray: '0',
    },
    implies: {
      stroke: '#3b82f6',
      strokeWidth: 2,
      strokeDasharray: '0',
    },
    tests: {
      stroke: '#10b981',
      strokeWidth: 2,
      strokeDasharray: '0',
    }
  };

  return styles[edgeType] || styles.implies;
};

export const getEdgeLabel = (edgeType) => {
  const labels = {
    requires: '↑ requires',
    implies: '→ enables',
    tests: '✓ tested by'
  };

  return labels[edgeType] || 'connection';
};

export const getEdgeLabelStyle = (edgeType) => {
  const colors = {
    requires: '#f97316',
    implies: '#3b82f6',
    tests: '#10b981'
  };

  return {
    fill: colors[edgeType] || '#64748b',
    fontWeight: 600,
    fontSize: 12
  };
};

export default {
  getEdgeStyle,
  getEdgeLabel,
  getEdgeLabelStyle
};
// ------------------------------------------------------------
// Auto Layout Algorithm for CourseGraph
// ------------------------------------------------------------
// Vertical layout: LEOs flow top-to-bottom, Assessments on the right
// ------------------------------------------------------------

export function autoLayoutGraph(nodes, edges) {
  if (!nodes || nodes.length === 0) return nodes;

  // Separate LEOs and Assessments
  const leoNodes = nodes.filter(n => n.data.nodeType === 'leo');
  const assessmentNodes = nodes.filter(n => n.data.nodeType === 'assessment');

  // Build dependency graph for LEOs (requires/implies edges)
  const leoEdges = edges.filter(e => {
    const edgeType = e.data?.edgeType;
    return edgeType === 'requires' || edgeType === 'implies';
  });

  // Map: nodeId → incoming edges
  const incomingMap = new Map();
  const outgoingMap = new Map();

  leoNodes.forEach((node) => {
    incomingMap.set(node.id, []);
    outgoingMap.set(node.id, []);
  });

  leoEdges.forEach((edge) => {
    if (incomingMap.has(edge.target)) {
      incomingMap.get(edge.target).push(edge.source);
    }
    if (outgoingMap.has(edge.source)) {
      outgoingMap.get(edge.source).push(edge.target);
    }
  });

  // Topological sort for LEOs
  const sortedLeos = [];
  const visited = new Set();

  const visit = (nodeId) => {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    // Visit all nodes this one depends on first
    const incoming = incomingMap.get(nodeId) || [];
    incoming.forEach(sourceId => visit(sourceId));

    sortedLeos.push(nodeId);
  };

  // Start with nodes that have outgoing edges but try to maintain order
  leoNodes.forEach(node => visit(node.id));

  // Layout settings - VERTICAL layout
  const ROW_HEIGHT = 160;
  const LEO_X = 350;           // LEOs in center-left
  const ASSESSMENT_X = 750;    // Assessments on the right
  const START_Y = 80;

  const positionedNodes = [];
  const leoPositions = new Map();

  // Position LEOs vertically
  sortedLeos.forEach((nodeId, index) => {
    const node = leoNodes.find(n => n.id === nodeId);
    if (!node) return;

    const y = START_Y + index * ROW_HEIGHT;

    leoPositions.set(nodeId, { x: LEO_X, y });

    positionedNodes.push({
      ...node,
      position: { x: LEO_X, y },
    });
  });

  // Find which LEOs each assessment tests
  const testEdges = edges.filter(e => e.data?.edgeType === 'tests');

  // Position Assessments on the right, aligned with tested LEOs
  const usedYPositions = [];

  assessmentNodes.forEach((assessment) => {
    // Find all LEOs this assessment tests
    const testedLeoIds = testEdges
      .filter(e => e.source === assessment.id)
      .map(e => e.target);

    let y = START_Y;

    if (testedLeoIds.length > 0) {
      // Position at average Y of tested LEOs
      const testedPositions = testedLeoIds
        .map(id => leoPositions.get(id))
        .filter(Boolean);

      if (testedPositions.length > 0) {
        y = testedPositions.reduce((sum, pos) => sum + pos.y, 0) / testedPositions.length;
      }
    }

    // Avoid overlapping assessments - offset if position is taken
    while (usedYPositions.some(usedY => Math.abs(usedY - y) < ROW_HEIGHT - 20)) {
      y += ROW_HEIGHT;
    }
    usedYPositions.push(y);

    positionedNodes.push({
      ...assessment,
      position: { x: ASSESSMENT_X, y },
    });
  });

  return positionedNodes;
}

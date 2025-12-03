// ------------------------------------------------------------
// Auto Layout Algorithm for CourseGraph
// ------------------------------------------------------------
// This algorithm arranges nodes based on their "depth" in the graph.
// It assigns each node to a column (layer) depending on incoming edges.
// Nodes with no incoming edges → layer 0
// A node's layer is always: max(layer of predecessors) + 1
//
// Then nodes inside each layer are stacked vertically with spacing.
// This produces a clean left→right flow layout.
// ------------------------------------------------------------

export function autoLayoutGraph(nodes, edges) {
  if (!nodes || nodes.length === 0) return nodes;

  // Map: nodeId → list of incoming edges
  const incomingMap = new Map();
  nodes.forEach((node) => {
    incomingMap.set(node.id, []);
  });

  edges.forEach((edge) => {
    if (incomingMap.has(edge.target)) {
      incomingMap.get(edge.target).push(edge);
    }
  });

  // Layer map: nodeId → layer index
  const layerMap = new Map();

  // Step 1: initialize root nodes (no incoming edges → layer 0)
  nodes.forEach((node) => {
    const incomingEdges = incomingMap.get(node.id) || [];
    if (incomingEdges.length === 0) {
      layerMap.set(node.id, 0);
    }
  });

  // Step 2: propagate layers through the graph
  // We iterate several passes to ensure all nodes are assigned correctly.
  let updated = true;
  let iterations = 0;

  while (updated && iterations < 15) {
    updated = false;
    iterations++;

    edges.forEach((edge) => {
      const sourceLayer = layerMap.get(edge.source) ?? 0;
      const targetLayer = layerMap.get(edge.target) ?? 0;

      // Ensure target is at least one layer to the right
      if (targetLayer < sourceLayer + 1) {
        layerMap.set(edge.target, sourceLayer + 1);
        updated = true;
      }
    });
  }

  // Step 3: group nodes by layer
  const layerGroups = new Map();
  nodes.forEach((node) => {
    const layer = layerMap.get(node.id) ?? 0;
    if (!layerGroups.has(layer)) {
      layerGroups.set(layer, []);
    }
    layerGroups.get(layer).push(node);
  });

  // Step 4: assign final positions
  const COLUMN_WIDTH = 400;   // horizontal spacing
  const ROW_HEIGHT = 200;     // vertical spacing
  const X_OFFSET = 200;       // initial X
  const Y_OFFSET = 120;        // initial Y

  const updatedNodes = nodes.map((node) => {
    const layer = layerMap.get(node.id) ?? 0;
    const nodesInLayer = layerGroups.get(layer) || [];
    const index = nodesInLayer.findIndex((n) => n.id === node.id);

    const x = X_OFFSET + layer * COLUMN_WIDTH;
    const y = Y_OFFSET + index * ROW_HEIGHT;

    return {
      ...node,
      position: { x, y },
    };
  });

  return updatedNodes;
}

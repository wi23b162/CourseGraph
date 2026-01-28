import React from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import EmptyGraphState from './EmptyGraphState';

/**
 * Center graph wrapper for ReactFlow
 */
const CenterGraph = ({
  nodes,
  edges,
  filteredNodes,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onEdgeClick,
  nodeTypes,
  handleViewportChange,
  onAddLEO,
}) => {
  return (
    <div
      style={{
        flexGrow: 1,
        background: '#f8fafc',
        transition: 'all 0.3s ease',
        minWidth: 0,
      }}
    >
      {nodes.length === 0 ? (
        <EmptyGraphState onAddLEO={onAddLEO} />
      ) : (
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
          onMove={handleViewportChange}
        >
          <Controls />
          <Background variant="dots" gap={12} size={1} color="#cbd5e1" />
        </ReactFlow>
      )}
    </div>
  );
};

export default CenterGraph;

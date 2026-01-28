import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import NodeProperties from '../../components/NodeProperties';

describe('Node Deletion Integration', () => {

    test('deleting a node removes connected edges from display', () => {
        // ARRANGE: Node with connections
        const node1 = {
            id: '1',
            data: {
                label: 'NODE_TO_DELETE',
                description: 'This node will be deleted',
                nodeType: 'leo',
                level: 3,
                tags: ['test'],
                nodeId: '01_01',
                onDelete: vi.fn()
            }
        };

        const node2 = {
            id: '2',
            data: {
                label: 'CONNECTED_NODE',
                description: 'This node is connected',
                nodeType: 'leo',
                level: 2,
                tags: [],
                nodeId: '01_02'
            }
        };

        const edge = {
            id: 'edge-1-2',
            source: '1',
            target: '2',
            label: 'implies',
            data: { edgeType: 'implies' }
        };

        // ACT 1: Render NodeProperties for node1 with connections
        const { unmount } = render(
            <NodeProperties
                node={node1}
                edge={null}
                nodes={[node1, node2]}
                edges={[edge]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: Node is displayed with outgoing connection
        expect(screen.getByText(/node to delete/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(1\)/i)).toBeInTheDocument();

        unmount();

        // ACT 2: Simulate node deletion - only node2 remains
        const remainingNodes = [node2];
        const remainingEdges = []; // Edge is also removed

        render(
            <NodeProperties
                node={node2}
                edge={null}
                nodes={remainingNodes}
                edges={remainingEdges}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: Remaining node has no connections anymore
        expect(screen.getByText(/connected node/i)).toBeInTheDocument();
        expect(screen.getByText(/Incoming \(0\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(0\)/i)).toBeInTheDocument();
    });

    test('node with multiple connections - all edges removed on deletion', () => {
        // ARRANGE: Node with multiple connections
        const centralNode = {
            id: '1',
            data: {
                label: 'CENTRAL_NODE',
                nodeType: 'leo',
                level: 3,
                tags: [],
                nodeId: '01_01'
            }
        };

        const nodeA = {
            id: '2',
            data: {
                label: 'NODE_A',
                nodeType: 'leo',
                level: 2,
                tags: [],
                nodeId: '01_02'
            }
        };

        const nodeB = {
            id: '3',
            data: {
                label: 'NODE_B',
                nodeType: 'leo',
                level: 4,
                tags: [],
                nodeId: '01_03'
            }
        };

        const edges = [
            { id: 'edge-1-2', source: '1', target: '2', label: 'implies', data: { edgeType: 'implies' } },
            { id: 'edge-3-1', source: '3', target: '1', label: 'requires', data: { edgeType: 'requires' } }
        ];

        // ACT 1: Display centralNode with 2 connections
        const { unmount } = render(
            <NodeProperties
                node={centralNode}
                edge={null}
                nodes={[centralNode, nodeA, nodeB]}
                edges={edges}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: Central node has 1 incoming and 1 outgoing
        expect(screen.getByText(/central node/i)).toBeInTheDocument();
        expect(screen.getByText(/Incoming \(1\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(1\)/i)).toBeInTheDocument();

        unmount();

        // ACT 2: After deletion of centralNode - nodeA has no connections anymore
        render(
            <NodeProperties
                node={nodeA}
                edge={null}
                nodes={[nodeA, nodeB]}
                edges={[]} // All edges to centralNode removed
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT
        expect(screen.getByText(/node a/i)).toBeInTheDocument();
        expect(screen.getByText(/Incoming \(0\)/i)).toBeInTheDocument();
    });

    test('deleting assessment node removes test connections', () => {
        // ARRANGE: LEO node connected to Assessment
        const leoNode = {
            id: '1',
            data: {
                label: 'LEARN_PROGRAMMING',
                nodeType: 'leo',
                level: 3,
                tags: ['coding'],
                nodeId: '01_01'
            }
        };

        const assessmentNode = {
            id: '2',
            data: {
                label: 'FINAL_EXAM',
                nodeType: 'assessment',
                tags: ['exam'],
                nodeId: 'A_01'
            }
        };

        const testEdge = {
            id: 'edge-1-2',
            source: '1',
            target: '2',
            label: 'tests',
            data: { edgeType: 'tests' }
        };

        // ACT 1: LEO node shows outgoing connection to Assessment
        const { unmount } = render(
            <NodeProperties
                node={leoNode}
                edge={null}
                nodes={[leoNode, assessmentNode]}
                edges={[testEdge]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        expect(screen.getByText(/Outgoing \(1\)/i)).toBeInTheDocument();
        unmount();

        // ACT 2: After deletion of the Assessment
        render(
            <NodeProperties
                node={leoNode}
                edge={null}
                nodes={[leoNode]}
                edges={[]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: LEO node has no connections anymore
        expect(screen.getByText(/learn programming/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(0\)/i)).toBeInTheDocument();
    });

    test('NodeProperties shows empty state when no node selected after deletion', () => {
        // ACT: Render NodeProperties without node (after deletion)
        render(
            <NodeProperties
                node={null}
                edge={null}
                nodes={[]}
                edges={[]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: Empty state is displayed
        expect(screen.getByText(/Select a node or connection/i)).toBeInTheDocument();
    });
});

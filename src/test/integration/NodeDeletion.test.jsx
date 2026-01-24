import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import NodeProperties from '../../components/NodeProperties';

describe('Node Deletion Integration', () => {

    test('deleting a node removes connected edges from display', () => {
        // ARRANGE: Node mit Connections
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

        // ACT 1: Render NodeProperties für node1 mit Connections
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

        // ASSERT: Node wird angezeigt mit Outgoing Connection
        expect(screen.getByText(/node to delete/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(1\)/i)).toBeInTheDocument();

        unmount();

        // ACT 2: Simuliere Node-Löschung - nur node2 bleibt
        const remainingNodes = [node2];
        const remainingEdges = []; // Edge wird auch entfernt

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

        // ASSERT: Verbleibender Node hat keine Connections mehr
        expect(screen.getByText(/connected node/i)).toBeInTheDocument();
        expect(screen.getByText(/Incoming \(0\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(0\)/i)).toBeInTheDocument();
    });

    test('node with multiple connections - all edges removed on deletion', () => {
        // ARRANGE: Node mit mehreren Connections
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

        // ACT 1: Zeige centralNode mit 2 Connections
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

        // ASSERT: Central Node hat 1 Incoming und 1 Outgoing
        expect(screen.getByText(/central node/i)).toBeInTheDocument();
        expect(screen.getByText(/Incoming \(1\)/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(1\)/i)).toBeInTheDocument();

        unmount();

        // ACT 2: Nach Löschung von centralNode - nodeA hat keine Connections mehr
        render(
            <NodeProperties
                node={nodeA}
                edge={null}
                nodes={[nodeA, nodeB]}
                edges={[]} // Alle Edges zu centralNode entfernt
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
        // ARRANGE: LEO Node verbunden mit Assessment
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

        // ACT 1: LEO Node zeigt Outgoing Connection zu Assessment
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

        // ACT 2: Nach Löschung des Assessments
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

        // ASSERT: LEO Node hat keine Connections mehr
        expect(screen.getByText(/learn programming/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(0\)/i)).toBeInTheDocument();
    });

    test('NodeProperties shows empty state when no node selected after deletion', () => {
        // ACT: Render NodeProperties ohne Node (nach Löschung)
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

        // ASSERT: Empty State wird angezeigt
        expect(screen.getByText(/Select a node or connection/i)).toBeInTheDocument();
    });
});

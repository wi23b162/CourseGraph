import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import EdgeTypeDialog from '../../components/EdgeTypeDialog';
import NodeProperties from '../../components/NodeProperties';

describe('Edge Creation Integration', () => {

    test('created edge data is correctly passed to NodeProperties', () => {
        // ARRANGE: Create two nodes to be connected
        const sourceNode = {
            id: '1',
            data: {
                label: 'SOURCE_NODE_LABEL',
                description: 'Source node description',
                nodeType: 'leo',
                level: 3,
                tags: ['tag1']
            }
        };

        const targetNode = {
            id: '2',
            data: {
                label: 'TARGET_NODE_LABEL',
                description: 'Target node description',
                nodeType: 'leo',
                level: 2,
                tags: ['tag2']
            }
        };

        let createdEdge = null;

        const handleConfirm = (edgeType) => {
            // Simulate what App.jsx does: create edge object
            createdEdge = {
                id: 'edge-1-2',
                source: sourceNode.id,
                target: targetNode.id,
                label: edgeType,
                data: {
                    edgeType: edgeType
                }
            };
        };

        // ACT 1: Render EdgeTypeDialog and create edge
        const { unmount } = render(
            <EdgeTypeDialog
                sourceNode={sourceNode}
                targetNode={targetNode}
                onConfirm={handleConfirm}
                onCancel={() => { }}
            />
        );

        // Select "requires" edge type
        const requiresRadio = screen.getByLabelText(/requires/i);
        fireEvent.click(requiresRadio);

        // Click Create Connection
        fireEvent.click(screen.getByText('Create Connection'));

        // Cleanup
        unmount();

        // ASSERT: Edge was created correctly
        expect(createdEdge).not.toBeNull();
        expect(createdEdge.data.edgeType).toBe('requires');

        // ACT 2: Render NodeProperties with the created edge
        render(
            <NodeProperties
                node={null}
                edge={createdEdge}
                nodes={[sourceNode, targetNode]}
                edges={[createdEdge]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: NodeProperties displays the correct edge data
        expect(screen.getAllByText(/requires/i).length).toBeGreaterThan(0);
        expect(screen.getByText(/source node label/i)).toBeInTheDocument();
        expect(screen.getByText(/target node label/i)).toBeInTheDocument();
    });

    test('edge with "implies" type is correctly displayed', () => {
        // ARRANGE
        const sourceNode = {
            id: '1',
            data: {
                label: 'LEARN_BASICS',
                nodeType: 'leo'
            }
        };

        const targetNode = {
            id: '2',
            data: {
                label: 'APPLY_ADVANCED',
                nodeType: 'leo'
            }
        };

        let createdEdge = null;

        const handleConfirm = (edgeType) => {
            createdEdge = {
                id: 'edge-1-2',
                source: '1',
                target: '2',
                label: edgeType,
                data: { edgeType }
            };
        };

        // ACT 1: Render EdgeTypeDialog - "implies" is already selected by default
        const { unmount } = render(
            <EdgeTypeDialog
                sourceNode={sourceNode}
                targetNode={targetNode}
                onConfirm={handleConfirm}
                onCancel={() => { }}
            />
        );

        // Click Create Connection directly (implies is default)
        fireEvent.click(screen.getByText('Create Connection'));
        unmount();

        // ASSERT: Edge was created with implies
        expect(createdEdge.data.edgeType).toBe('implies');

        // ACT 2: Display in NodeProperties
        render(
            <NodeProperties
                node={null}
                edge={createdEdge}
                nodes={[sourceNode, targetNode]}
                edges={[createdEdge]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: "enables" is displayed (implies shows "enables" in UI)
        expect(screen.getByText(/enables/i)).toBeInTheDocument();
    });

    test('edge with "tests" type connects LEO to Assessment correctly', () => {
        // ARRANGE: LEO node and Assessment node
        const leoNode = {
            id: '1',
            data: {
                label: 'UNDERSTAND_CONCEPTS',
                nodeType: 'leo',
                level: 2
            }
        };

        const assessmentNode = {
            id: '2',
            data: {
                label: 'FINAL_EXAM',
                nodeType: 'assessment'
            }
        };

        let createdEdge = null;

        const handleConfirm = (edgeType) => {
            createdEdge = {
                id: 'edge-1-2',
                source: '1',
                target: '2',
                label: edgeType,
                data: { edgeType }
            };
        };

        // ACT 1: Render EdgeTypeDialog
        const { unmount } = render(
            <EdgeTypeDialog
                sourceNode={leoNode}
                targetNode={assessmentNode}
                onConfirm={handleConfirm}
                onCancel={() => { }}
            />
        );

        // Select "tests" edge type
        const testsRadio = screen.getByLabelText(/tested by/i);
        fireEvent.click(testsRadio);

        fireEvent.click(screen.getByText('Create Connection'));
        unmount();

        // ASSERT
        expect(createdEdge.data.edgeType).toBe('tests');

        // ACT 2: Display in NodeProperties
        render(
            <NodeProperties
                node={null}
                edge={createdEdge}
                nodes={[leoNode, assessmentNode]}
                edges={[createdEdge]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: "tested by" is displayed
        expect(screen.getByText(/tested by/i)).toBeInTheDocument();
    });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import EditNodeDialog from '../../components/EditNodeDialog';
import NodeProperties from '../../components/NodeProperties';

describe('Node Editing Integration', () => {

    test('edited node data is correctly updated and displayed in NodeProperties', () => {
        // ARRANGE: Erstelle einen existierenden Node
        const originalNode = {
            id: '1',
            data: {
                label: 'ORIGINAL_TITLE',
                description: 'Original description',
                nodeType: 'leo',
                level: 2,
                tags: ['original-tag'],
                nodeId: '01_01'
            }
        };

        let updatedNode = null;

        const handleSave = (nodeData) => {
            // Simuliere was App.jsx macht: Node-Daten aktualisieren
            updatedNode = nodeData;
        };

        // ACT 1: Render EditNodeDialog und bearbeite Node
        const { unmount } = render(
            <EditNodeDialog
                node={originalNode}
                onSave={handleSave}
                onCancel={() => { }}
                allTags={['existing-tag-1', 'existing-tag-2']}
            />
        );

        // Ändere den Titel
        const titleInput = screen.getByDisplayValue(/original title/i);
        fireEvent.change(titleInput, { target: { value: 'Updated Title' } });

        // Ändere die Description
        const descriptionInput = screen.getByDisplayValue('Original description');
        fireEvent.change(descriptionInput, { target: { value: 'Updated description text' } });

        // Ändere das Level
        const levelSelect = screen.getByDisplayValue(/Level 2/i);
        fireEvent.change(levelSelect, { target: { value: '4' } });

        // Klicke Save Changes
        fireEvent.click(screen.getByText('Save Changes'));

        // Cleanup
        unmount();

        // ASSERT: Node wurde korrekt aktualisiert
        expect(updatedNode).not.toBeNull();
        expect(updatedNode.data.label).toBe('UPDATED_TITLE');
        expect(updatedNode.data.description).toBe('Updated description text');
        expect(updatedNode.data.level).toBe(4);

        // ACT 2: Render NodeProperties mit dem aktualisierten Node
        render(
            <NodeProperties
                node={updatedNode}
                edge={null}
                nodes={[updatedNode]}
                edges={[]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: NodeProperties zeigt die aktualisierten Daten
        expect(screen.getByText(/updated title/i)).toBeInTheDocument();
        expect(screen.getByText('Updated description text')).toBeInTheDocument();
        expect(screen.getByText(/Level: 4/i)).toBeInTheDocument();
    });

    test('adding a tag in EditNodeDialog is reflected in NodeProperties', () => {
        // ARRANGE
        const originalNode = {
            id: '1',
            data: {
                label: 'TEST_NODE',
                description: '',
                nodeType: 'leo',
                level: 3,
                tags: [],
                nodeId: '01_02'
            }
        };

        let updatedNode = null;

        const handleSave = (nodeData) => {
            updatedNode = nodeData;
        };

        // ACT 1: Render EditNodeDialog
        const { unmount } = render(
            <EditNodeDialog
                node={originalNode}
                onSave={handleSave}
                onCancel={() => { }}
                allTags={[]}
            />
        );

        // Füge einen neuen Tag hinzu
        const tagInput = screen.getByPlaceholderText(/Add tag/i);
        fireEvent.change(tagInput, { target: { value: 'new-tag' } });
        fireEvent.click(screen.getByText('Add'));

        // Speichere
        fireEvent.click(screen.getByText('Save Changes'));
        unmount();

        // ASSERT: Tag wurde hinzugefügt
        expect(updatedNode.data.tags).toContain('new-tag');

        // ACT 2: Render NodeProperties
        render(
            <NodeProperties
                node={updatedNode}
                edge={null}
                nodes={[updatedNode]}
                edges={[]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: Tag wird in NodeProperties angezeigt
        expect(screen.getByText('new-tag')).toBeInTheDocument();
    });

    test('editing an Assessment node (without level) works correctly', () => {
        // ARRANGE: Assessment Node (hat kein Level)
        const assessmentNode = {
            id: '1',
            data: {
                label: 'MIDTERM_EXAM',
                description: 'Midterm examination',
                nodeType: 'assessment',
                tags: ['exam'],
                nodeId: 'A_01'
            }
        };

        let updatedNode = null;

        const handleSave = (nodeData) => {
            updatedNode = nodeData;
        };

        // ACT 1: Render EditNodeDialog
        const { unmount } = render(
            <EditNodeDialog
                node={assessmentNode}
                onSave={handleSave}
                onCancel={() => { }}
                allTags={['exam', 'quiz']}
            />
        );

        // Prüfe dass kein Level-Dropdown angezeigt wird (nur für LEO)
        expect(screen.queryByText(/Level 1/i)).not.toBeInTheDocument();

        // Ändere den Titel
        const titleInput = screen.getByDisplayValue('midterm exam');
        fireEvent.change(titleInput, { target: { value: 'Final Exam' } });

        // Speichere
        fireEvent.click(screen.getByText('Save Changes'));
        unmount();

        // ASSERT
        expect(updatedNode.data.label).toBe('FINAL_EXAM');
        expect(updatedNode.data.nodeType).toBe('assessment');

        // ACT 2: Render NodeProperties
        render(
            <NodeProperties
                node={updatedNode}
                edge={null}
                nodes={[updatedNode]}
                edges={[]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: Assessment wird korrekt angezeigt
        expect(screen.getByText(/final exam/i)).toBeInTheDocument();
    });

    test('node connections are preserved after editing', () => {
        // ARRANGE: Node mit Connections
        const node1 = {
            id: '1',
            data: {
                label: 'NODE_ONE',
                description: 'First node',
                nodeType: 'leo',
                level: 3,
                tags: [],
                nodeId: '01_01'
            }
        };

        const node2 = {
            id: '2',
            data: {
                label: 'NODE_TWO',
                description: 'Second node',
                nodeType: 'leo',
                level: 3,
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

        let updatedNode = null;

        const handleSave = (nodeData) => {
            updatedNode = nodeData;
        };

        // ACT 1: Bearbeite Node 1
        const { unmount } = render(
            <EditNodeDialog
                node={node1}
                onSave={handleSave}
                onCancel={() => { }}
                allTags={[]}
            />
        );

        const titleInput = screen.getByDisplayValue(/node one/i);
        fireEvent.change(titleInput, { target: { value: 'Edited Node One' } });
        fireEvent.click(screen.getByText('Save Changes'));
        unmount();

        // ACT 2: Render NodeProperties mit Connections
        render(
            <NodeProperties
                node={updatedNode}
                edge={null}
                nodes={[updatedNode, node2]}
                edges={[edge]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: Node wurde aktualisiert und Connections sind sichtbar
        expect(screen.getByText(/edited node one/i)).toBeInTheDocument();
        expect(screen.getByText(/Outgoing \(1\)/i)).toBeInTheDocument();
    });
});

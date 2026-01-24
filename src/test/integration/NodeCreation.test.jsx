import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import AddNodeDialog from '../../components/AddNodeDialog';
import NodeProperties from '../../components/NodeProperties';

describe('Node Creation Integration', () => {

    test('created node data is correctly passed to NodeProperties', () => {
        // ARRANGE: Simuliere was passiert wenn ein Node erstellt wird                                                                  
        let createdNode = null;

        const handleAdd = (nodeData) => {
            // Simuliere was App.jsx macht: Node-Objekt erstellen                                                                         
            createdNode = {
                id: '1',
                data: {
                    label: nodeData.label,
                    description: nodeData.description,
                    nodeType: nodeData.type,
                    level: nodeData.level,
                    tags: nodeData.tags,
                    nodeId: '01_01'
                }
            };
        };

        // ACT 1: Render AddNodeDialog und erstelle Node                                                                                
        const { unmount } = render(
            <AddNodeDialog
                initialType="leo"
                onAdd={handleAdd}
                onCancel={() => { }}
                allTags={[]}
            />
        );

        // Fülle Formular aus                                                                                                           
        const titleInput = screen.getByPlaceholderText(/Apply Object Orientation/i);
        fireEvent.change(titleInput, { target: { value: 'Test Learning Outcome' } });

        // Klicke Create                                                                                                                
        fireEvent.click(screen.getByText('Create'));

        // Cleanup                                                                                                                      
        unmount();

        // ACT 2: Render NodeProperties mit dem erstellten Node                                                                         
        render(
            <NodeProperties
                node={createdNode}
                edge={null}
                nodes={[createdNode]}
                edges={[]}
                onDeleteEdge={() => { }}
                onEditNode={() => { }}
                onEditConnection={() => { }}
            />
        );

        // ASSERT: NodeProperties zeigt die korrekten Daten                                                                             
        expect(screen.getByText(/test learning outcome/i)).toBeInTheDocument();
    });
});                                                                                                                            
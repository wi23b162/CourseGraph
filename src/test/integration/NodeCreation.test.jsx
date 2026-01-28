import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import AddNodeDialog from '../../components/AddNodeDialog';
import NodeProperties from '../../components/NodeProperties';

describe('Node Creation Integration', () => {

    test('created node data is correctly passed to NodeProperties', () => {
        // ARRANGE: Simulate what happens when a node is created                                                                  
        let createdNode = null;

        const handleAdd = (nodeData) => {
            // Simulate what App.jsx does: create node object                                                                         
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

        // ACT 1: Render AddNodeDialog and create node                                                                                
        const { unmount } = render(
            <AddNodeDialog
                initialType="leo"
                onAdd={handleAdd}
                onCancel={() => { }}
                allTags={[]}
            />
        );

        // Fill out form                                                                                                           
        const titleInput = screen.getByPlaceholderText(/Apply Object Orientation/i);
        fireEvent.change(titleInput, { target: { value: 'Test Learning Outcome' } });

        // Click Create                                                                                                                
        fireEvent.click(screen.getByText('Create'));

        // Cleanup                                                                                                                      
        unmount();

        // ACT 2: Render NodeProperties with the created node                                                                         
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

        // ASSERT: NodeProperties displays the correct data                                                                             
        expect(screen.getByText(/test learning outcome/i)).toBeInTheDocument();
    });
});                                                                                                                            
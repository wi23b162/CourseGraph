
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import EditNodeDialog from '../components/EditNodeDialog';

describe('EditNodeDialog', () => {
    const mockNode = {
        id: '1',
        data: {
            label: 'TEST_LABEL',
            description: 'Test description',
            nodeType: 'leo',
            level: 3,
            tags: ['tag1']
        }
    };

    // Test 1: Rendert nichts wenn node null ist                                                                                                       
    test('renders nothing when node is null', () => {
        const { container } = render(
            <EditNodeDialog
                node={null}
                onSave={() => { }}
                onCancel={() => { }}
                allTags={[]}
            />
        );
        expect(container.firstChild).toBeNull();
    });

    // Test 2: Rendert Dialog mit Node Daten                                                                                                           
    test('renders dialog with node data', () => {
        render(
            <EditNodeDialog
                node={mockNode}
                onSave={() => { }}
                onCancel={() => { }}
                allTags={[]}
            />
        );
        expect(screen.getByText(/Editing Learning Outcome/)).toBeInTheDocument();
    });

    // Test 3: Cancel ruft onCancel auf                                                                                                                
    test('calls onCancel when Cancel is clicked', () => {
        const mockOnCancel = vi.fn();
        render(
            <EditNodeDialog
                node={mockNode}
                onSave={() => { }}
                onCancel={mockOnCancel}
                allTags={[]}
            />
        );
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockOnCancel).toHaveBeenCalled();
    });

    // Test 4: Save Button ist disabled ohne Titel                                                                                                     
    test('Save button is disabled when title is empty', () => {
        const nodeWithEmptyLabel = { ...mockNode, data: { ...mockNode.data, label: '' } };
        render(
            <EditNodeDialog
                node={nodeWithEmptyLabel}
                onSave={() => { }}
                onCancel={() => { }}
                allTags={[]}
            />
        );
        // Titel leeren                                                                                                                                  
        const inputs = screen.getAllByRole('textbox');
        const titleInput = inputs[0];
        fireEvent.change(titleInput, { target: { value: '' } });

        expect(screen.getByText('Save Changes')).toBeDisabled();
    });
});           
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import EdgeTypeDialog from '../components/EdgeTypeDialog';

describe('EdgeTypeDialog', () => {
    const mockSourceNode = {
        data: { label: 'SOURCE_NODE_LABEL', nodeType: 'leo' }
    };
    const mockTargetNode = {
        data: { label: 'TARGET_NODE_LABEL', nodeType: 'leo' }
    };

    // Test 1: Rendert Dialog Titel                                                                                                                    
    test('renders dialog title', () => {
        render(
            <EdgeTypeDialog
                sourceNode={mockSourceNode}
                targetNode={mockTargetNode}
                onConfirm={() => { }}
                onCancel={() => { }}
            />
        );
        expect(screen.getByText('Connection Type')).toBeInTheDocument();
    });

    // Test 2: Zeigt alle drei Edge-Typen                                                                                                              
    test('displays all three edge types', () => {
        render(
            <EdgeTypeDialog
                sourceNode={mockSourceNode}
                targetNode={mockTargetNode}
                onConfirm={() => { }}
                onCancel={() => { }}
            />
        );
        expect(screen.getByText('↑ requires')).toBeInTheDocument();
        expect(screen.getByText('→ implies / enables')).toBeInTheDocument();
        expect(screen.getByText('✓ tested by')).toBeInTheDocument();
    });

    // Test 3: Cancel ruft onCancel auf                                                                                                                
    test('calls onCancel when Cancel is clicked', () => {
        const mockOnCancel = vi.fn();
        render(
            <EdgeTypeDialog
                sourceNode={mockSourceNode}
                targetNode={mockTargetNode}
                onConfirm={() => { }}
                onCancel={mockOnCancel}
            />
        );
        fireEvent.click(screen.getByText('Cancel'));
        expect(mockOnCancel).toHaveBeenCalled();
    });

    // Test 4: onConfirm wird mit ausgewähltem Typ aufgerufen                                                                                          
    test('calls onConfirm with selected edge type', () => {
        const mockOnConfirm = vi.fn();
        render(
            <EdgeTypeDialog
                sourceNode={mockSourceNode}
                targetNode={mockTargetNode}
                onConfirm={mockOnConfirm}
                onCancel={() => { }}
            />
        );
        fireEvent.click(screen.getByText('Create Connection'));
        expect(mockOnConfirm).toHaveBeenCalledWith('implies'); // Default                                                                                
    });
});                    
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { SaveLoadDialog } from '../components/Saveloadmanager';

describe('SaveLoadDialog', () => {
    const mockNodes = [
        { id: '1', data: { nodeType: 'leo' } }
    ];
    const mockEdges = [];

    // Test 1: Renders dialog title                                                                                                                    
    test('renders dialog title', () => {
        render(
            <SaveLoadDialog
                nodes={mockNodes}
                edges={mockEdges}
                onLoad={() => { }}
                onClose={() => { }}
            />
        );
        expect(screen.getByText('Save / Load Course')).toBeInTheDocument();
    });

    // Test 2: Displays Save and Load tabs                                                                                                                
    test('displays Save and Load tabs', () => {
        render(
            <SaveLoadDialog
                nodes={mockNodes}
                edges={mockEdges}
                onLoad={() => { }}
                onClose={() => { }}
            />
        );
        expect(screen.getByText('💾 Save')).toBeInTheDocument();
        expect(screen.getByText('📂 Load')).toBeInTheDocument();
    });

    // Test 3: Close button calls onClose                                                                                                           
    test('calls onClose when close button is clicked', () => {
        const mockOnClose = vi.fn();
        render(
            <SaveLoadDialog
                nodes={mockNodes}
                edges={mockEdges}
                onLoad={() => { }}
                onClose={mockOnClose}
            />
        );
        fireEvent.click(screen.getByLabelText('Close dialog'));
        expect(mockOnClose).toHaveBeenCalled();
    });

    // Test 4: Displays course summary                                                                                                                    
    test('displays course summary', () => {
        render(
            <SaveLoadDialog
                nodes={mockNodes}
                edges={mockEdges}
                onLoad={() => { }}
                onClose={() => { }}
            />
        );
        expect(screen.getByText(/Learning Outcomes: 1/)).toBeInTheDocument();
    });
});        
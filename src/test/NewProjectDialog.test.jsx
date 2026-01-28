import { render, screen, fireEvent } from '@testing-library/react';                                                                                  
  import { describe, test, expect, vi } from 'vitest';                                                                                                 
  import NewProjectDialog from '../components/NewProjectDialog';                                                                                                   
                                                                                                                                                       
  describe('NewProjectDialog', () => {                                                                                                                 
    // Test 1: Renders dialog title                                                                                                                    
    test('renders dialog title', () => {                                                                                                               
      render(<NewProjectDialog onConfirm={() => {}} onCancel={() => {}} />);                                                                           
      expect(screen.getByText('Start a new project?')).toBeInTheDocument();                                                                            
    });                                                                                                                                                
                                                                                                                                                       
    // Test 2: Displays warning                                                                                                                           
    test('displays warning message', () => {                                                                                                           
      render(<NewProjectDialog onConfirm={() => {}} onCancel={() => {}} />);                                                                           
      expect(screen.getByText(/cannot be undone/i)).toBeInTheDocument();                                                                               
    });                                                                                                                                                
                                                                                                                                                       
    // Test 3: Cancel calls onCancel                                                                                                                
    test('calls onCancel when Cancel is clicked', () => {                                                                                              
      const mockOnCancel = vi.fn();                                                                                                                    
      render(<NewProjectDialog onConfirm={() => {}} onCancel={mockOnCancel} />);                                                                       
      fireEvent.click(screen.getByText('Cancel'));                                                                                                     
      expect(mockOnCancel).toHaveBeenCalled();                                                                                                         
    });                                                                                                                                                
                                                                                                                                                       
    // Test 4: Confirm calls onConfirm                                                                                                              
    test('calls onConfirm when Start New Project is clicked', () => {                                                                                  
      const mockOnConfirm = vi.fn();                                                                                                                   
      render(<NewProjectDialog onConfirm={mockOnConfirm} onCancel={() => {}} />);                                                                      
      fireEvent.click(screen.getByText(/Start New Project/));                                                                                          
      expect(mockOnConfirm).toHaveBeenCalled();                                                                                                        
    });                                                                                                                                                
  });                 
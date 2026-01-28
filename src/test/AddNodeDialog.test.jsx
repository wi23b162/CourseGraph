import { render, screen, fireEvent } from '@testing-library/react';                                                                                  
  import { describe, test, expect, vi } from 'vitest';                                                                                                 
  import AddNodeDialog from '../components/AddNodeDialog';                                                                                                         
                                                                                                                                                       
  describe('AddNodeDialog', () => {                                                                                                                    
    // Test 1: Dialog renders with correct title                                                                                                      
    test('renders with LEO title when initialType is leo', () => {                                                                                     
      render(                                                                                                                                          
        <AddNodeDialog                                                                                                                                 
          initialType="leo"                                                                                                                            
          onAdd={() => {}}                                                                                                                             
          onCancel={() => {}}                                                                                                                          
          allTags={[]}                                                                                                                                 
        />                                                                                                                                             
      );                                                                                                                                               
      expect(screen.getByText(/Adding Learning Outcome/i)).toBeInTheDocument();                                                                        
    });                                                                                                                                                
                                                                                                                                                       
    // Test 2: Dialog renders with Assessment title                                                                                                     
    test('renders with Assessment title when initialType is assessment', () => {                                                                       
      render(                                                                                                                                          
        <AddNodeDialog                                                                                                                                 
          initialType="assessment"                                                                                                                     
          onAdd={() => {}}                                                                                                                             
          onCancel={() => {}}                                                                                                                          
          allTags={[]}                                                                                                                                 
        />                                                                                                                                             
      );                                                                                                                                               
      expect(screen.getByText(/Adding Assessment/i)).toBeInTheDocument();                                                                              
    });                                                                                                                                                
                                                                                                                                                       
    // Test 3: Cancel button calls onCancel                                                                                                         
    test('calls onCancel when Cancel button is clicked', () => {                                                                                       
      const mockOnCancel = vi.fn();                                                                                                                    
      render(                                                                                                                                          
        <AddNodeDialog                                                                                                                                 
          initialType="leo"                                                                                                                            
          onAdd={() => {}}                                                                                                                             
          onCancel={mockOnCancel}                                                                                                                      
          allTags={[]}                                                                                                                                 
        />                                                                                                                                             
      );                                                                                                                                               
      fireEvent.click(screen.getByText('Cancel'));                                                                                                     
      expect(mockOnCancel).toHaveBeenCalled();                                                                                                         
    });                                                                                                                                                
                                                                                                                                                       
    // Test 4: Create button is disabled without title                                                                                                   
    test('Create button is disabled when title is empty', () => {                                                                                      
      render(                                                                                                                                          
        <AddNodeDialog                                                                                                                                 
          initialType="leo"                                                                                                                            
          onAdd={() => {}}                                                                                                                             
          onCancel={() => {}}                                                                                                                          
          allTags={[]}                                                                                                                                 
        />                                                                                                                                             
      );                                                                                                                                               
      const createButton = screen.getByText('Create');                                                                                                 
      expect(createButton).toBeDisabled();                                                                                                             
    });                                                                                                                                                
                                                                                                                                                       
    // Test 5: onAdd is called with correct data                                                                                               
    test('calls onAdd with correct data when form is submitted', () => {                                                                               
      const mockOnAdd = vi.fn();                                                                                                                       
      render(                                                                                                                                          
        <AddNodeDialog                                                                                                                                 
          initialType="leo"                                                                                                                            
          onAdd={mockOnAdd}                                                                                                                            
          onCancel={() => {}}                                                                                                                          
          allTags={[]}                                                                                                                                 
        />                                                                                                                                             
      );                                                                                                                                               
                                                                                                                                                       
      // Enter title                                                                                                                                
      const titleInput = screen.getByPlaceholderText(/Apply Object Orientation/i);                                                                     
      fireEvent.change(titleInput, { target: { value: 'Test Title' } });                                                                               
                                                                                                                                                       
      // Submit                                                                                                                                        
      fireEvent.click(screen.getByText('Create'));                                                                                                     
                                                                                                                                                       
      expect(mockOnAdd).toHaveBeenCalledWith(                                                                                                          
        expect.objectContaining({                                                                                                                      
          type: 'leo',                                                                                                                                 
          label: 'Test Title'                                                                                                                          
        })                                                                                                                                             
      );                                                                                                                                               
    });                                                                                                                                                
  });                       
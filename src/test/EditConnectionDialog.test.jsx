import { render, screen, fireEvent } from '@testing-library/react';                                                                                  
  import { describe, test, expect, vi } from 'vitest';                                                                                                 
  import EditConnectionDialog from '../components/EditConnectionDialog';                                                                                           
                                                                                                                                                       
  describe('EditConnectionDialog', () => {                                                                                                             
    const mockEdge = { data: { edgeType: 'implies' } };                                                                                                
    const mockSourceNode = { data: { label: 'SOURCE_LABEL' } };                                                                                        
    const mockTargetNode = { data: { label: 'TARGET_LABEL' } };                                                                                        
                                                                                                                                                       
    // Test 1: Rendert Dialog Titel                                                                                                                    
    test('renders dialog title', () => {                                                                                                               
      render(                                                                                                                                          
        <EditConnectionDialog                                                                                                                          
          edge={mockEdge}                                                                                                                              
          sourceNode={mockSourceNode}                                                                                                                  
          targetNode={mockTargetNode}                                                                                                                  
          onSave={() => {}}                                                                                                                            
          onDelete={() => {}}                                                                                                                          
          onCancel={() => {}}                                                                                                                          
        />                                                                                                                                             
      );                                                                                                                                               
      expect(screen.getByText('Edit Connection')).toBeInTheDocument();                                                                                 
    });                                                                                                                                                
                                                                                                                                                       
    // Test 2: Zeigt Source und Target                                                                                                                 
    test('displays source and target labels', () => {                                                                                                  
      render(                                                                                                                                          
        <EditConnectionDialog                                                                                                                          
          edge={mockEdge}                                                                                                                              
          sourceNode={mockSourceNode}                                                                                                                  
          targetNode={mockTargetNode}                                                                                                                  
          onSave={() => {}}                                                                                                                            
          onDelete={() => {}}                                                                                                                          
          onCancel={() => {}}                                                                                                                          
        />                                                                                                                                             
      );                                                                                                                                               
      expect(screen.getByText('source label')).toBeInTheDocument();                                                                                    
      expect(screen.getByText('target label')).toBeInTheDocument();                                                                                    
    });                                                                                                                                                
                                                                                                                                                       
    // Test 3: Save Changes ruft onSave auf                                                                                                            
    test('calls onSave when Save Changes is clicked', () => {                                                                                          
      const mockOnSave = vi.fn();                                                                                                                      
      render(                                                                                                                                          
        <EditConnectionDialog                                                                                                                          
          edge={mockEdge}                                                                                                                              
          sourceNode={mockSourceNode}                                                                                                                  
          targetNode={mockTargetNode}                                                                                                                  
          onSave={mockOnSave}                                                                                                                          
          onDelete={() => {}}                                                                                                                          
          onCancel={() => {}}                                                                                                                          
        />                                                                                                                                             
      );                                                                                                                                               
      fireEvent.click(screen.getByText('Save Changes'));                                                                                               
      expect(mockOnSave).toHaveBeenCalled();                                                                                                           
    });                                                                                                                                                
                                                                                                                                                       
    // Test 4: Cancel ruft onCancel auf                                                                                                                
    test('calls onCancel when Cancel is clicked', () => {                                                                                              
      const mockOnCancel = vi.fn();                                                                                                                    
      render(                                                                                                                                          
        <EditConnectionDialog                                                                                                                          
          edge={mockEdge}                                                                                                                              
          sourceNode={mockSourceNode}                                                                                                                  
          targetNode={mockTargetNode}                                                                                                                  
          onSave={() => {}}                                                                                                                            
          onDelete={() => {}}                                                                                                                          
          onCancel={mockOnCancel}                                                                                                                      
        />                                                                                                                                             
      );                                                                                                                                               
      fireEvent.click(screen.getByText('Cancel'));                                                                                                     
      expect(mockOnCancel).toHaveBeenCalled();                                                                                                         
    });                                                                                                                                                
  });                   
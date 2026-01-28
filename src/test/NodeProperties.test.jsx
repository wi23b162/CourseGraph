import { render, screen, fireEvent } from '@testing-library/react';                                                                                  
  import { describe, test, expect, vi } from 'vitest';                                                                                                 
  import NodeProperties from '../components/NodeProperties';                                                                                                       
                                                                                                                                                       
  describe('NodeProperties', () => {                                                                                                                   
    // Test 1: Shows placeholder when nothing is selected                                                                                                
    test('shows placeholder when nothing selected', () => {                                                                                            
      render(                                                                                                                                          
        <NodeProperties                                                                                                                                
          node={null}                                                                                                                                  
          edge={null}                                                                                                                                  
          nodes={[]}                                                                                                                                   
          edges={[]}                                                                                                                                   
          onDeleteEdge={() => {}}                                                                                                                      
          onEditNode={() => {}}                                                                                                                        
          onEditConnection={() => {}}                                                                                                                  
        />                                                                                                                                             
      );                                                                                                                                               
      expect(screen.getByText(/Select a node or connection/i)).toBeInTheDocument();                                                                    
    });                                                                                                                                                
                                                                                                                                                       
    // Test 2: Shows node properties when node is selected                                                                                              
    test('shows node properties when node is selected', () => {                                                                                        
      const mockNode = {                                                                                                                               
        id: '1',                                                                                                                                       
        data: {                                                                                                                                        
          label: 'TEST_LABEL',                                                                                                                         
          description: 'Test description',                                                                                                             
          nodeType: 'leo',                                                                                                                             
          nodeId: '01_01',                                                                                                                             
          level: 3,                                                                                                                                    
          tags: []                                                                                                                                     
        }                                                                                                                                              
      };                                                                                                                                               
      render(                                                                                                                                          
        <NodeProperties                                                                                                                                
          node={mockNode}                                                                                                                              
          edge={null}                                                                                                                                  
          nodes={[mockNode]}                                                                                                                           
          edges={[]}                                                                                                                                   
          onDeleteEdge={() => {}}                                                                                                                      
          onEditNode={() => {}}                                                                                                                        
          onEditConnection={() => {}}                                                                                                                  
        />                                                                                                                                             
      );                                                                                                                                               
      expect(screen.getByText('test label')).toBeInTheDocument();                                                                                      
    });                                                                                                                                                
                                                                                                                                                       
    // Test 3: Edit button calls onEditNode                                                                                                         
    test('calls onEditNode when Edit button is clicked', () => {                                                                                       
      const mockOnEditNode = vi.fn();                                                                                                                  
      const mockNode = {                                                                                                                               
        id: '1',                                                                                                                                       
        data: {                                                                                                                                        
          label: 'TEST_LABEL',                                                                                                                         
          nodeType: 'leo',                                                                                                                             
          nodeId: '01_01',                                                                                                                             
          tags: []                                                                                                                                     
        }                                                                                                                                              
      };                                                                                                                                               
      render(                                                                                                                                          
        <NodeProperties                                                                                                                                
          node={mockNode}                                                                                                                              
          edge={null}                                                                                                                                  
          nodes={[mockNode]}                                                                                                                           
          edges={[]}                                                                                                                                   
          onDeleteEdge={() => {}}                                                                                                                      
          onEditNode={mockOnEditNode}                                                                                                                  
          onEditConnection={() => {}}                                                                                                                  
        />                                                                                                                                             
      );                                                                                                                                               
      fireEvent.click(screen.getByText('Edit'));                                                                                                       
      expect(mockOnEditNode).toHaveBeenCalledWith(mockNode);                                                                                           
    });                                                                                                                                                
  });           
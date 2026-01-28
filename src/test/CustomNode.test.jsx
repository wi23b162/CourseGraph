import { render, screen } from '@testing-library/react';                                                                                             
  import { describe, test, expect } from 'vitest';                                                                                                     
  import CustomNode from '../components/CustomNode';                                                                                                               
                                                                                                                                                       
  // Mock for reactflow Handle component                                                                                                              
  vi.mock('reactflow', () => ({                                                                                                                        
    Handle: () => null,                                                                                                                                
    Position: { Top: 'top', Right: 'right', Bottom: 'bottom', Left: 'left' }                                                                           
  }));                                                                                                                                                 
                                                                                                                                                       
  describe('CustomNode', () => {                                                                                                                       
    const mockLeoData = {                                                                                                                              
      label: 'TEST_LABEL',                                                                                                                             
      description: 'Test description',                                                                                                                 
      nodeType: 'leo',                                                                                                                                 
      nodeId: '01_01',                                                                                                                                 
      level: 3                                                                                                                                         
    };                                                                                                                                                 
                                                                                                                                                       
    const mockAssessmentData = {                                                                                                                       
      label: 'ASSESSMENT_LABEL',                                                                                                                       
      description: 'Assessment description',                                                                                                           
      nodeType: 'assessment',                                                                                                                          
      nodeId: '01_02'                                                                                                                                  
    };                                                                                                                                                 
                                                                                                                                                       
    // Test 1: Renders LEO node with label                                                                                                              
    test('renders LEO node with label', () => {                                                                                                        
      render(<CustomNode id="1" data={mockLeoData} isConnectable={true} />);                                                                           
      expect(screen.getByText('TEST_LABEL')).toBeInTheDocument();                                                                                      
    });                                                                                                                                                
                                                                                                                                                       
    // Test 2: Renders description                                                                                                                     
    test('renders description', () => {                                                                                                                
      render(<CustomNode id="1" data={mockLeoData} isConnectable={true} />);                                                                           
      expect(screen.getByText('Test description')).toBeInTheDocument();                                                                                
    });                                                                                                                                                
                                                                                                                                                       
    // Test 3: Displays level badge for LEO                                                                                                               
    test('displays level badge for LEO node', () => {                                                                                                  
      render(<CustomNode id="1" data={mockLeoData} isConnectable={true} />);                                                                           
      expect(screen.getByText(/L3/)).toBeInTheDocument();                                                                                              
    });                                                                                                                                                
                                                                                                                                                       
    // Test 4: Displays "A" badge for Assessment                                                                                                          
    test('displays A badge for assessment node', () => {                                                                                               
      render(<CustomNode id="1" data={mockAssessmentData} isConnectable={true} />);                                                                    
      expect(screen.getByText('A')).toBeInTheDocument();                                                                                               
    });                                                                                                                                                
                                                                                                                                                       
    // Test 5: Displays node ID                                                                                                                           
    test('displays node ID', () => {                                                                                                                   
      render(<CustomNode id="1" data={mockLeoData} isConnectable={true} />);                                                                           
      expect(screen.getByText('01_01')).toBeInTheDocument();                                                                                           
    });                                                                                                                                                
  });                         
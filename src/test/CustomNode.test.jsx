import { render, screen } from '@testing-library/react';                                                                                             
  import { describe, test, expect } from 'vitest';                                                                                                     
  import CustomNode from '../components/CustomNode';                                                                                                               
                                                                                                                                                       
  // Mock für reactflow Handle Komponente                                                                                                              
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
                                                                                                                                                       
    // Test 1: Rendert LEO Node mit Label                                                                                                              
    test('renders LEO node with label', () => {                                                                                                        
      render(<CustomNode id="1" data={mockLeoData} isConnectable={true} />);                                                                           
      expect(screen.getByText('TEST_LABEL')).toBeInTheDocument();                                                                                      
    });                                                                                                                                                
                                                                                                                                                       
    // Test 2: Rendert Description                                                                                                                     
    test('renders description', () => {                                                                                                                
      render(<CustomNode id="1" data={mockLeoData} isConnectable={true} />);                                                                           
      expect(screen.getByText('Test description')).toBeInTheDocument();                                                                                
    });                                                                                                                                                
                                                                                                                                                       
    // Test 3: Zeigt Level Badge für LEO                                                                                                               
    test('displays level badge for LEO node', () => {                                                                                                  
      render(<CustomNode id="1" data={mockLeoData} isConnectable={true} />);                                                                           
      expect(screen.getByText(/L3/)).toBeInTheDocument();                                                                                              
    });                                                                                                                                                
                                                                                                                                                       
    // Test 4: Zeigt "A" Badge für Assessment                                                                                                          
    test('displays A badge for assessment node', () => {                                                                                               
      render(<CustomNode id="1" data={mockAssessmentData} isConnectable={true} />);                                                                    
      expect(screen.getByText('A')).toBeInTheDocument();                                                                                               
    });                                                                                                                                                
                                                                                                                                                       
    // Test 5: Zeigt Node ID                                                                                                                           
    test('displays node ID', () => {                                                                                                                   
      render(<CustomNode id="1" data={mockLeoData} isConnectable={true} />);                                                                           
      expect(screen.getByText('01_01')).toBeInTheDocument();                                                                                           
    });                                                                                                                                                
  });                         
// src/utils/exportUtils.js
// Complete export utilities for CourseGraph

import { toPng } from 'html-to-image';
import * as XLSX from 'xlsx';

/**
 * Export graph as PNG image
 */
export const exportToPNG = async () => {
  const element = document.querySelector('.react-flow');
  
  if (!element) {
    alert('Canvas not found. Please try again.');
    return;
  }

  try {
    console.log('📸 Starting PNG export...');
    
    const dataUrl = await toPng(element, {
      backgroundColor: '#f8fafc',
      width: 1920,
      height: 1080,
      pixelRatio: 2,
      cacheBust: true
    });
    
    const link = document.createElement('a');
    link.download = `coursegraph-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    link.click();
    
    console.log('✅ PNG export successful');
    return true;
  } catch (error) {
    console.error('❌ PNG export failed:', error);
    alert('PNG export failed. Please try again.');
    return false;
  }
};

/**
 * Export graph data as Excel file
 */
export const exportToExcel = (nodes, edges) => {
  try {
    console.log('📊 Starting Excel export...');
    
    // Sheet 1: Learning Outcomes
    const nodesData = nodes.map((node, index) => ({
      'Nr.': index + 1,
      'ID': node.data.nodeId || node.id,
      'Label': node.data.label || 'Untitled',
      'Description': node.data.description || '',
      'Type': node.data.nodeType === 'leo' ? 'Learning Outcome' : 'Assessment',
      'Level': node.data.level || 'N/A',
      'Position X': Math.round(node.position.x),
      'Position Y': Math.round(node.position.y)
    }));
    
    // Sheet 2: Connections
    const edgesData = edges.map((edge, index) => {
      const sourceNode = nodes.find(n => n.id === edge.source);
      const targetNode = nodes.find(n => n.id === edge.target);
      
      return {
        'Nr.': index + 1,
        'From ID': sourceNode?.data.nodeId || edge.source,
        'From Label': sourceNode?.data.label || 'Unknown',
        'Connection Type': edge.data?.edgeType || edge.label || 'undefined',
        'To ID': targetNode?.data.nodeId || edge.target,
        'To Label': targetNode?.data.label || 'Unknown',
        'Animated': edge.animated ? 'Yes' : 'No'
      };
    });
    
    // Sheet 3: Statistics
    const leoCount = nodes.filter(n => n.data.nodeType === 'leo').length;
    const assessmentCount = nodes.filter(n => n.data.nodeType === 'assessment').length;
    const isolatedNodes = nodes.filter(n => {
      return !edges.some(e => e.source === n.id || e.target === n.id);
    });
    
    const statistics = [
      { 'Metric': 'Total Nodes', 'Value': nodes.length },
      { 'Metric': 'Learning Outcomes', 'Value': leoCount },
      { 'Metric': 'Assessments', 'Value': assessmentCount },
      { 'Metric': 'Total Connections', 'Value': edges.length },
      { 'Metric': 'Avg Connections per Node', 'Value': nodes.length > 0 ? (edges.length / nodes.length).toFixed(2) : 0 },
      { 'Metric': 'Isolated Nodes', 'Value': isolatedNodes.length },
      { 'Metric': 'Export Date', 'Value': new Date().toLocaleString() }
    ];
    
    // Create workbook
    const wb = XLSX.utils.book_new();
    
    // Add sheets
    const ws1 = XLSX.utils.json_to_sheet(nodesData);
    const ws2 = XLSX.utils.json_to_sheet(edgesData);
    const ws3 = XLSX.utils.json_to_sheet(statistics);
    
    // Set column widths
    ws1['!cols'] = [
      { wch: 5 },
      { wch: 12 },
      { wch: 30 },
      { wch: 40 },
      { wch: 18 },
      { wch: 8 },
      { wch: 10 },
      { wch: 10 }
    ];
    
    ws2['!cols'] = [
      { wch: 5 },
      { wch: 12 },
      { wch: 25 },
      { wch: 15 },
      { wch: 12 },
      { wch: 25 },
      { wch: 10 }
    ];
    
    ws3['!cols'] = [
      { wch: 25 },
      { wch: 15 }
    ];
    
    XLSX.utils.book_append_sheet(wb, ws1, "Learning Outcomes");
    XLSX.utils.book_append_sheet(wb, ws2, "Connections");
    XLSX.utils.book_append_sheet(wb, ws3, "Statistics");
    
    const filename = `coursegraph-${new Date().toISOString().slice(0, 10)}.xlsx`;
    
    XLSX.writeFile(wb, filename);
    
    console.log('✅ Excel export successful');
    return true;
  } catch (error) {
    console.error('❌ Excel export failed:', error);
    alert('Excel export failed. Please try again.');
    return false;
  }
};
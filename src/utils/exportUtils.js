// src/utils/exportUtils.js
import { toPng } from 'html-to-image';
import * as XLSX from 'xlsx';

/**
 * Export graph as PNG image (Mac & Windows compatible)
 */
export const exportToPNG = async () => {
  const element = document.querySelector('.react-flow__viewport');
  
  if (!element) {
    alert('Canvas not found. Please try again.');
    return false;
  }

  try {
    console.log('📸 Starting PNG export...');
    
    // Hide controls temporarily
    const controls = document.querySelector('.react-flow__controls');
    const attribution = document.querySelector('.react-flow__attribution');
    const minimap = document.querySelector('.react-flow__minimap');
    
    if (controls) controls.style.display = 'none';
    if (attribution) attribution.style.display = 'none';
    if (minimap) minimap.style.display = 'none';
    
    const dataUrl = await toPng(element, {
      backgroundColor: '#f8fafc',
      pixelRatio: 2,
      cacheBust: true,
    });
    
    // Show controls again
    if (controls) controls.style.display = '';
    if (attribution) attribution.style.display = '';
    if (minimap) minimap.style.display = '';
    
    const link = document.createElement('a');
    link.download = `coursegraph-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    
    document.body.appendChild(link);
    link.click();
    
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
    
    console.log('✅ PNG export successful');
    return true;
  } catch (error) {
    console.error('❌ PNG export failed:', error);
    
    // Show controls again even on error
    const controls = document.querySelector('.react-flow__controls');
    const attribution = document.querySelector('.react-flow__attribution');
    const minimap = document.querySelector('.react-flow__minimap');
    if (controls) controls.style.display = '';
    if (attribution) attribution.style.display = '';
    if (minimap) minimap.style.display = '';
    
    alert('PNG export failed. Please try again.');
    return false;
  }
};
/**
 * Export graph data as Excel file (Mac & Windows compatible)
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
      { wch: 5 }, { wch: 12 }, { wch: 30 }, { wch: 40 },
      { wch: 18 }, { wch: 8 }, { wch: 10 }, { wch: 10 }
    ];
    
    ws2['!cols'] = [
      { wch: 5 }, { wch: 12 }, { wch: 25 },
      { wch: 15 }, { wch: 12 }, { wch: 25 }, { wch: 10 }
    ];
    
    ws3['!cols'] = [{ wch: 25 }, { wch: 15 }];
    
    XLSX.utils.book_append_sheet(wb, ws1, "Learning Outcomes");
    XLSX.utils.book_append_sheet(wb, ws2, "Connections");
    XLSX.utils.book_append_sheet(wb, ws3, "Statistics");
    
    // Mac-compatible export
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coursegraph-${new Date().toISOString().slice(0, 10)}.xlsx`;
    
    // Important for Mac compatibility
    document.body.appendChild(link);
    link.click();
    
    // Cleanup
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
    
    console.log('✅ Excel export successful');
    return true;
  } catch (error) {
    console.error('❌ Excel export failed:', error);
    alert('Excel export failed. Please try again.');
    return false;
  }
};
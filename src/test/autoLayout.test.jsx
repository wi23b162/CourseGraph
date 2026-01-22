import { describe, test, expect } from 'vitest';
import { autoLayoutGraph } from '../utils/autoLayout';

describe('autoLayoutGraph', () => {

  // ============ Edge Cases ============
  describe('edge cases', () => {

    test('returns empty array when nodes is empty', () => {
      const result = autoLayoutGraph([], []);
      expect(result).toEqual([]);
    });

    test('returns nodes unchanged when nodes is null', () => {
      const result = autoLayoutGraph(null, []);
      expect(result).toBeNull();
    });

    test('returns nodes unchanged when nodes is undefined', () => {
      const result = autoLayoutGraph(undefined, []);
      expect(result).toBeUndefined();
    });
  });

  // ============ Single Node ============
  describe('single node', () => {

    test('positions single node at initial offset', () => {
      const nodes = [{ id: '1', position: { x: 0, y: 0 } }];
      const edges = [];

      const result = autoLayoutGraph(nodes, edges);

      expect(result[0].position.x).toBe(200); // X_OFFSET
      expect(result[0].position.y).toBe(120); // Y_OFFSET
    });
  });

  // ============ Multiple Nodes Without Edges ============
  describe('multiple nodes without edges', () => {

    test('places all nodes in layer 0 (same x position)', () => {
      const nodes = [
        { id: '1', position: { x: 0, y: 0 } },
        { id: '2', position: { x: 0, y: 0 } },
        { id: '3', position: { x: 0, y: 0 } }
      ];
      const edges = [];

      const result = autoLayoutGraph(nodes, edges);

      // All nodes should have same x (layer 0)
      expect(result[0].position.x).toBe(200);
      expect(result[1].position.x).toBe(200);
      expect(result[2].position.x).toBe(200);
    });

    test('stacks nodes vertically with correct spacing', () => {
      const nodes = [
        { id: '1', position: { x: 0, y: 0 } },
        { id: '2', position: { x: 0, y: 0 } },
        { id: '3', position: { x: 0, y: 0 } }
      ];
      const edges = [];

      const result = autoLayoutGraph(nodes, edges);

      // Y positions: 120, 320, 520 (ROW_HEIGHT = 200)
      expect(result[0].position.y).toBe(120);
      expect(result[1].position.y).toBe(320);
      expect(result[2].position.y).toBe(520);
    });
  });

  // ============ Nodes With Edges ============
  describe('nodes with edges', () => {

    test('places connected nodes in different layers', () => {
      const nodes = [
        { id: '1', position: { x: 0, y: 0 } },
        { id: '2', position: { x: 0, y: 0 } }
      ];
      const edges = [
        { source: '1', target: '2' }
      ];

      const result = autoLayoutGraph(nodes, edges);

      // Node 1: layer 0, x = 200
      // Node 2: layer 1, x = 600 (200 + 400)
      expect(result.find(n => n.id === '1').position.x).toBe(200);
      expect(result.find(n => n.id === '2').position.x).toBe(600);
    });

    test('handles chain of three nodes', () => {
      const nodes = [
        { id: '1', position: { x: 0, y: 0 } },
        { id: '2', position: { x: 0, y: 0 } },
        { id: '3', position: { x: 0, y: 0 } }
      ];
      const edges = [
        { source: '1', target: '2' },
        { source: '2', target: '3' }
      ];

      const result = autoLayoutGraph(nodes, edges);

      // Node 1: layer 0, x = 200
      // Node 2: layer 1, x = 600
      // Node 3: layer 2, x = 1000
      expect(result.find(n => n.id === '1').position.x).toBe(200);
      expect(result.find(n => n.id === '2').position.x).toBe(600);
      expect(result.find(n => n.id === '3').position.x).toBe(1000);
    });
  });

  // ============ Preserves Node Data ============
  describe('preserves node data', () => {

    test('keeps original node properties', () => {
      const nodes = [
        {
          id: '1',
          position: { x: 0, y: 0 },
          data: { label: 'Test', nodeType: 'leo' }
        }
      ];
      const edges = [];

      const result = autoLayoutGraph(nodes, edges);

      expect(result[0].id).toBe('1');
      expect(result[0].data.label).toBe('Test');
      expect(result[0].data.nodeType).toBe('leo');
    });
  });

});

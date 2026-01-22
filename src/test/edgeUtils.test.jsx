import { describe, test, expect } from 'vitest';
import { getEdgeStyle, getEdgeLabel, getEdgeLabelStyle } from '../components/edgeUtils';

describe('edgeUtils', () => {

  // ============ getEdgeStyle Tests ============
  describe('getEdgeStyle', () => {

    test('returns orange style for requires type', () => {
      const style = getEdgeStyle('requires');
      expect(style.stroke).toBe('#f97316');
      expect(style.strokeWidth).toBe(3);
    });

    test('returns blue style for implies type', () => {
      const style = getEdgeStyle('implies');
      expect(style.stroke).toBe('#3b82f6');
      expect(style.strokeWidth).toBe(2);
    });

    test('returns green style for tests type', () => {
      const style = getEdgeStyle('tests');
      expect(style.stroke).toBe('#10b981');
      expect(style.strokeWidth).toBe(2);
    });

    test('returns default (implies) style for unknown type', () => {
      const style = getEdgeStyle('unknown');
      expect(style.stroke).toBe('#3b82f6');
    });
  });

  // ============ getEdgeLabel Tests ============
  describe('getEdgeLabel', () => {

    test('returns correct label for requires', () => {
      expect(getEdgeLabel('requires')).toBe('↑ requires');
    });

    test('returns correct label for implies', () => {
      expect(getEdgeLabel('implies')).toBe('→ enables');
    });

    test('returns correct label for tests', () => {
      expect(getEdgeLabel('tests')).toBe('✓ tested by');
    });

    test('returns default label for unknown type', () => {
      expect(getEdgeLabel('unknown')).toBe('connection');
    });
  });

  // ============ getEdgeLabelStyle Tests ============
  describe('getEdgeLabelStyle', () => {

    test('returns orange color for requires', () => {
      const style = getEdgeLabelStyle('requires');
      expect(style.fill).toBe('#f97316');
      expect(style.fontWeight).toBe(600);
      expect(style.fontSize).toBe(12);
    });

    test('returns blue color for implies', () => {
      const style = getEdgeLabelStyle('implies');
      expect(style.fill).toBe('#3b82f6');
    });

    test('returns green color for tests', () => {
      const style = getEdgeLabelStyle('tests');
      expect(style.fill).toBe('#10b981');
    });

    test('returns default gray color for unknown type', () => {
      const style = getEdgeLabelStyle('unknown');
      expect(style.fill).toBe('#64748b');
    });
  });

});

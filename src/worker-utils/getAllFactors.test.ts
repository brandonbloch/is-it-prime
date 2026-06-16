import getAllFactors from '@/worker-utils/getAllFactors.ts';
import { describe, expect, test } from 'bun:test';

describe('getAllFactors', () => {
  test('1', () => {
    expect(getAllFactors(1)).toEqual([1]);
  });
  test('2', () => {
    expect(getAllFactors(2)).toEqual([1, 2]);
  });
  test('59', () => {
    expect(getAllFactors(59)).toEqual([1, 59]);
  });
  test('60', () => {
    expect(getAllFactors(60)).toEqual([1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60]);
  });
});

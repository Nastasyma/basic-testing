import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 7, action: Action.Add });
    expect(result).toBe(13);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 3, action: Action.Subtract });
    expect(result).toBe(2);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 4, b: 8, action: Action.Multiply });
    expect(result).toBe(32);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 16, b: 4, action: Action.Divide });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 3,
      b: 4,
      action: Action.Exponentiate,
    });
    expect(result).toBe(81);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 10, b: 2, action: 'Invalid action' });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '33', b: 8, action: Action.Add });
    expect(result).toBeNull();
  });
});

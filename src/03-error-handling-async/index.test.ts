import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const res = await resolveValue(55);
    expect(res).toBe(55);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('Something went wrong...');
    } catch (error: unknown) {
      expect((error as Error).message).toBe('Something went wrong...');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (error: unknown) {
      expect((error as Error).message).toBe('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    try {
      throwCustomError();
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(MyAwesomeError);
    }
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});

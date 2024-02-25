import path from 'node:path';
import fs from 'node:fs';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const timeout = 3000;

    doStuffByTimeout(callback, timeout);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 3000;

    doStuffByTimeout(callback, timeout);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);
    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setInterval');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const interval = 1000;

    doStuffByInterval(callback, interval);
    expect(setInterval).toHaveBeenLastCalledWith(callback, interval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const totalTimeout = 3000;
    const interval = 1000;

    doStuffByInterval(callback, interval);

    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(totalTimeout);
    expect(callback).toHaveBeenCalledTimes(totalTimeout / interval);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(path, 'join');
    const pathToFile = 'text.txt';

    await readFileAsynchronously(pathToFile);

    expect(mockJoin).toHaveBeenCalledWith(__dirname, pathToFile);

    mockJoin.mockRestore();
  });

  test('should return null if file does not exist', async () => {
    const pathToFile = 'text.txt';

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);

    const read = jest.spyOn(fs.promises, 'readFile');

    const result = await readFileAsynchronously(pathToFile);

    expect(read).not.toHaveBeenCalled();
    expect(result).toBe(null);

    jest.restoreAllMocks();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'text.txt';
    const content = 'text';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);

    const read = jest
      .spyOn(fs.promises, 'readFile')
      .mockReturnValue(Promise.resolve(content));

    const result = await readFileAsynchronously(pathToFile);

    expect(read).toHaveBeenCalled();
    expect(result).toBe(content);

    jest.restoreAllMocks();
  });
});

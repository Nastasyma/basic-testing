import axios from 'axios';
import { THROTTLE_TIME, throttledGetDataFromApi } from './index';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;
const url = 'https://jsonplaceholder.typicode.com';
const data = { id: 1, name: 'Jhon Doe', email: 'info@example.com' };
const path = '/users/1';

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    axiosMock.create.mockReturnThis();
    axiosMock.get.mockResolvedValue({ data });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(path);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axiosMock.create).toHaveBeenCalledWith({ baseURL: url });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(path);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(axiosMock.get).toHaveBeenCalledWith(path);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(path);
    jest.advanceTimersByTime(THROTTLE_TIME);
    expect(result).toEqual(data);
  });
});

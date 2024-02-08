import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const elements = [11, 22, 33, 44];
    const list = {
      value: 11,
      next: {
        value: 22,
        next: {
          value: 33,
          next: {
            value: 44,
            next: {
              value: null,
              next: null,
            },
          },
        },
      },
    };

    expect(generateLinkedList(elements)).toStrictEqual(list);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [44, 55, 66];
    const list = generateLinkedList(elements);

    expect(list).toMatchSnapshot();
  });
});

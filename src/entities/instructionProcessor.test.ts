import process from './instructionProcessor';
import input from './instructionMessageExample';
import { East, Right, Forward, North, Left, West } from './types';

test('extracts grid dimensions from input', () => {
  expect(process(input)).toMatchObject({
    upperRight: { x: 5, y: 3 },
  });
});

test('throws if input length exceeds 100', () => {
  expect(() => process('A'.repeat(101))).toThrow(
    'Input length exceeds limit: 100'
  );
});

test('throws if any coordinate value exceeds 50', () => {
  expect(() => process('51 3')).toThrow('Coordinate value exceeds limit: 50');
  expect(() =>
    process(`
5 5
51 3 N
`)
  ).toThrow('Coordinate value exceeds limit: 50');
});

test('extracts robot instructions from input', () => {
  expect(process(input)).toMatchObject({
    robotInstructions: [
      {
        landAt: { x: 1, y: 1, orientation: East },
        instructionSet: [
          Right,
          Forward,
          Right,
          Forward,
          Right,
          Forward,
          Right,
          Forward,
        ],
      },
      {
        landAt: { x: 3, y: 2, orientation: North },
        instructionSet: [
          Forward,
          Right,
          Right,
          Forward,
          Left,
          Left,
          Forward,
          Forward,
          Right,
          Right,
          Forward,
          Left,
          Left,
        ],
      },
      {
        landAt: { x: 0, y: 3, orientation: West },
        instructionSet: [
          Left,
          Left,
          Forward,
          Forward,
          Forward,
          Left,
          Forward,
          Left,
          Forward,
          Left,
        ],
      },
    ],
  });
});

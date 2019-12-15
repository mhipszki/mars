import process from './instructionProcessor';

const input = `
5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL
`;

test('extracts grid dimensions from input', () => {
  expect(process(input)).toMatchObject({
    upperRight: { x: 5, y: 3 },
  });
});

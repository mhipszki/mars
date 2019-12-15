import Robot from './robot';
import { Grid, Position } from './types';

const grid = ([x0, y0]: number[], [x1, y1]: number[]): Grid => ({
  lowerLeft: { x: x0, y: y0 },
  upperRight: { x: x1, y: y1 },
});

test('has current position when created with grid and landing position', () => {
  const landAt: Position = { x: 1, y: 1, orientation: 'N' };
  const robot = new Robot(grid([0, 0], [5, 5]), landAt);
  expect(robot.currentPosition).toEqual('1 1 N');
});

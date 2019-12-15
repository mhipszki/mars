import Robot from './robot';
import { Grid, Position, Left, Right, Forward } from './types';

const grid = ([x0, y0]: number[], [x1, y1]: number[]): Grid => ({
  lowerLeft: { x: x0, y: y0 },
  upperRight: { x: x1, y: y1 },
});

test('has current position when created with grid and landing position', () => {
  const landAt: Position = { x: 1, y: 1, orientation: 'N' };
  const robot = new Robot(grid([0, 0], [5, 5]), landAt);
  expect(robot.currentPosition).toEqual('1 1 N');
});

test('can change orientation', () => {
  const landAt: Position = { x: 1, y: 1, orientation: 'N' };
  const robot = new Robot(grid([0, 0], [5, 5]), landAt);

  robot.execute([Left]);
  expect(robot.currentPosition).toEqual('1 1 W');
  robot.execute([Left]);
  expect(robot.currentPosition).toEqual('1 1 S');
  robot.execute([Left]);
  expect(robot.currentPosition).toEqual('1 1 E');
  robot.execute([Left]);
  expect(robot.currentPosition).toEqual('1 1 N');

  robot.execute([Right]);
  expect(robot.currentPosition).toEqual('1 1 E');
  robot.execute([Right]);
  expect(robot.currentPosition).toEqual('1 1 S');
  robot.execute([Right]);
  expect(robot.currentPosition).toEqual('1 1 W');
  robot.execute([Right]);
  expect(robot.currentPosition).toEqual('1 1 N');
});

test('can move forward in any directions', () => {
  const landAt: Position = { x: 1, y: 1, orientation: 'N' };
  const robot = new Robot(grid([0, 0], [5, 5]), landAt);

  robot.execute([Forward]);
  expect(robot.currentPosition).toEqual('1 2 N');

  robot.execute([Left]);
  robot.execute([Forward]);
  expect(robot.currentPosition).toEqual('0 2 W');

  robot.execute([Left]);
  robot.execute([Forward]);
  expect(robot.currentPosition).toEqual('0 1 S');

  robot.execute([Left]);
  robot.execute([Forward]);
  expect(robot.currentPosition).toEqual('1 1 E');
});

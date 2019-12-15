import Robot from './robot';
import { Grid, Position, Left, Right, Forward, East } from './types';
import { createExecutor } from './robotCommands';

const grid = (
  [x0, y0]: number[],
  [x1, y1]: number[],
  positionsToIgnore?: Position[]
): Grid => ({
  lowerLeft: { x: x0, y: y0 },
  upperRight: { x: x1, y: y1 },
  positionsToIgnore,
});

const landAt = (x, y, orientation): Position => ({ x, y, orientation });

const commandExecutor = (positionsToIgnore?: Position[]) =>
  createExecutor(grid([0, 0], [5, 5], positionsToIgnore));

test('is created with landing position and command executor', () => {
  const robot = new Robot(landAt(1, 1, 'N'), commandExecutor());
  expect(robot.currentPosition).toEqual('1 1 N');
});

test('can change orientation', () => {
  const robot = new Robot(landAt(1, 1, 'N'), commandExecutor());

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
  const robot = new Robot(landAt(1, 1, 'N'), commandExecutor());

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

test('can follow a sequence of instructions', () => {
  const robot = new Robot(landAt(1, 1, 'N'), commandExecutor());

  robot.execute([Forward, Left, Forward, Left, Forward, Left, Forward]);
  expect(robot.currentPosition).toEqual('1 1 E');
});

test('does not move forward from positions with ignored orientation', () => {
  const positionsToIgnore: Position[] = [{ x: 2, y: 1, orientation: East }];
  const robot = new Robot(
    landAt(1, 1, 'E'),
    commandExecutor(positionsToIgnore)
  );

  robot.execute([Forward, Forward]);
  expect(robot.currentPosition).toEqual('2 1 E');
});

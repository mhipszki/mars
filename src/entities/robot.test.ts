import Robot from './robot';
import { Grid, Position, Left, Right, Forward, East, West } from './types';
import { createExecutor } from './robotCommands';

const createGrid = (
  [x0, y0]: number[] = [0, 0],
  [x1, y1]: number[] = [5, 5],
  positionsToIgnore: Position[] = []
): Grid => ({
  lowerLeft: { x: x0, y: y0 },
  upperRight: { x: x1, y: y1 },
  positionsToIgnore,
});

const landAt = (x, y, orientation): Position => ({ x, y, orientation });

const commandExecutor = (grid: Grid = createGrid()) => createExecutor(grid);

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
  const grid = createGrid([0, 0], [5, 5], positionsToIgnore);
  const robot = new Robot(landAt(1, 1, 'E'), commandExecutor(grid));

  robot.execute([Forward, Forward]);
  expect(robot.currentPosition).toEqual('2 1 E');
});

test('marks and reports the position where it fell "off" the grid', () => {
  const grid = createGrid([0, 0], [5, 5]);
  const robot = new Robot(landAt(1, 1, 'W'), commandExecutor(grid));

  robot.execute([Forward, Forward]);

  expect(grid.positionsToIgnore).toContainEqual(
    expect.objectContaining({
      x: 0,
      y: 1,
      orientation: West,
    })
  );

  expect(robot.isLost).toBe(true);
  expect(robot.currentPosition).toEqual('0 1 W LOST');
});

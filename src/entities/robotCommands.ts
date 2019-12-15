import {
  Position,
  Instruction,
  orientations,
  Left,
  Right,
  Forward,
  North,
  West,
  South,
  East,
  Grid,
} from './types';

const turnLeftAt = (position: Position): Position => {
  const index = orientations.indexOf(position.orientation);
  const next = (index + 1) % orientations.length;
  const orientation = orientations[next];
  return { ...position, orientation };
};

const turnRightAt = (position: Position): Position => {
  const index = orientations.indexOf(position.orientation);
  const previous = index - 1;
  const orientation = orientations.slice(previous)[0];
  return { ...position, orientation };
};

const isIgnored = (
  position: Position,
  positionsToIgnore: Position[]
): boolean =>
  positionsToIgnore.some(
    ({ x, y, orientation }) =>
      position.x === x &&
      position.y === y &&
      position.orientation === orientation
  );

const calculateNextPositionFrom = ({
  x,
  y,
  orientation,
}: Position): Position => {
  switch (orientation) {
    case North:
      return { x, y: y + 1, orientation };
    case West:
      return { x: x - 1, y, orientation };
    case South:
      return { x, y: y - 1, orientation };
    case East:
      return { x: x + 1, y, orientation };
  }
};

const isPositionOffGrid = (position: Position, grid: Grid): boolean =>
  position.x < grid.lowerLeft.x ||
  position.x > grid.upperRight.x ||
  position.y < grid.lowerLeft.y ||
  position.y > grid.upperRight.y;

const markPositionAsIgnored = (position: Position, grid: Grid) => {
  grid.positionsToIgnore.push(position);
};

const moveForwardFrom = (position: Position, grid: Grid): Position => {
  if (isIgnored(position, grid.positionsToIgnore)) {
    return position;
  }
  const nextPosition = calculateNextPositionFrom(position);
  const isOffGrid = isPositionOffGrid(nextPosition, grid);
  if (isOffGrid) {
    markPositionAsIgnored(position, grid);
  }
  return { ...nextPosition, isOffGrid };
};

export type CommandExecutor = (
  instruction: Instruction,
  position: Position
) => Position;

export const createExecutor = (grid: Grid): CommandExecutor => (
  instruction,
  position
) => {
  if (instruction === Left) {
    return turnLeftAt(position);
  }
  if (instruction === Right) {
    return turnRightAt(position);
  }
  if (instruction === Forward) {
    return moveForwardFrom(position, grid);
  }
};

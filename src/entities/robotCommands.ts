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
): boolean => {
  return (positionsToIgnore || []).some(
    ({ x, y, orientation }) =>
      position.x === x &&
      position.y === y &&
      position.orientation === orientation
  );
};

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

const moveForwardFrom = (
  position: Position,
  positionsToIgnore: Position[]
): Position => {
  if (isIgnored(position, positionsToIgnore)) {
    return position;
  }
  return calculateNextPositionFrom(position);
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
    return moveForwardFrom(position, grid.positionsToIgnore);
  }
};

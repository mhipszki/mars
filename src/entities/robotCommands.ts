import { Position, orientations, North, West, South, East } from './types';

export const calculateNextPositionFrom = ({
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

export const turnLeftAt = (position: Position): Position => {
  const index = orientations.indexOf(position.orientation);
  const next = (index + 1) % orientations.length;
  const orientation = orientations[next];
  return { ...position, orientation };
};

export const turnRightAt = (position: Position): Position => {
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

export const moveForwardFrom = (
  position: Position,
  positionsToIgnore: Position[]
): Position => {
  if (isIgnored(position, positionsToIgnore)) {
    return position;
  }
  return calculateNextPositionFrom(position);
};

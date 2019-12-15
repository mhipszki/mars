export interface Coordinate {
  x: number;
  y: number;
}

const North = 'N';
const South = 'S';
const East = 'E';
const West = 'W';

const orientations = [North, South, East, West] as const;

export type Orientation = typeof orientations[number];

export interface Position extends Coordinate {
  orientation: Orientation;
}

export interface Grid {
  lowerLeft: Coordinate;
  upperRight: Coordinate;
  // if robot is in an ignored position with a specific orientation
  // then any subsequent 'F' instruction should be skipped
  positionsToIgnore?: Position[];
}

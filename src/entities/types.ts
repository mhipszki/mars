export interface Coordinate {
  x: number;
  y: number;
}

export const North = 'N';
export const West = 'W';
export const South = 'S';
export const East = 'E';

export const orientations = [North, West, South, East] as const;

export type Orientation = typeof orientations[number];

export interface Position extends Coordinate {
  orientation: Orientation;
  isOffGrid?: boolean;
}

export interface Grid {
  lowerLeft: Coordinate;
  upperRight: Coordinate;
  positionsToIgnore: Position[];
}

export const Left = 'L';
export const Right = 'R';
export const Forward = 'F';

export const instructions = [Left, Right, Forward] as const;

export type Instruction = typeof instructions[number];

export interface RobotInstruction {
  landAt: Position;
  instructionSet: Instruction[];
}

export interface ConfigurationSet {
  upperRight: Coordinate;
  robotInstructions: RobotInstruction[];
}

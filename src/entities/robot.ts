import {
  Grid,
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
} from './types';

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

class Robot {
  readonly grid: Grid;
  private position: Position;
  private instructions: Instruction[] = [];

  constructor(grid: Grid, landAt: Position) {
    this.grid = grid;
    this.position = landAt;
  }

  turnLeft() {
    const index = orientations.indexOf(this.position.orientation);
    const next = (index + 1) % orientations.length;
    this.position.orientation = orientations[next];
  }

  turnRight() {
    const index = orientations.indexOf(this.position.orientation);
    const previous = index - 1;
    this.position.orientation = orientations.slice(previous)[0];
  }

  shouldNotMoveForwardFrom(position: Position) {
    return (this.grid.positionsToIgnore || []).some(
      ({ x, y, orientation }) =>
        position.x === x &&
        position.y === y &&
        position.orientation === orientation
    );
  }

  moveForward() {
    if (this.shouldNotMoveForwardFrom(this.position)) {
      return;
    }
    this.position = calculateNextPositionFrom(this.position);
  }

  run(instruction: Instruction) {
    if (instruction === Left) {
      this.turnLeft();
    }
    if (instruction === Right) {
      this.turnRight();
    }
    if (instruction === Forward) {
      this.moveForward();
    }
  }

  followInstructions() {
    while (this.instructions.length > 0) {
      const nextInstruction = this.instructions.shift();
      this.run(nextInstruction);
    }
  }

  // processes instructions and moves robot
  // skips 'Forward' instructions in ignored positions to avoid falling off the grid
  // stops execution and marks position when robot moves "off" the grid
  execute(instructions: Instruction[]): Robot {
    this.instructions = instructions;
    this.followInstructions();
    return this;
  }

  // returns the current position of the robot e.g. `1 1 E`
  get currentPosition(): string {
    const { x, y, orientation } = this.position;
    return `${x} ${y} ${orientation}`;
  }
}

export default Robot;

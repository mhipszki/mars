import {
  Grid,
  Position,
  Instruction,
  orientations,
  Left,
  Right,
} from './types';

class Robot {
  readonly grid: Grid;
  private position: Position;
  private instructions: Instruction[] = [];

  constructor(grid: Grid, landAt: Position) {
    this.grid = grid;
    this.position = landAt;
  }

  run(instruction: Instruction) {
    const index = orientations.indexOf(this.position.orientation);
    if (instruction === Left) {
      const next = (index + 1) % orientations.length;
      this.position.orientation = orientations[next];
    }
    if (instruction === Right) {
      const previous = index - 1;
      this.position.orientation = orientations.slice(previous)[0];
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

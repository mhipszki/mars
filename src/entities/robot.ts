import { Grid, Position, Instruction, Left, Right, Forward } from './types';
import { turnLeftAt, turnRightAt, moveForwardFrom } from './robotCommands';

class Robot {
  readonly grid: Grid;
  private position: Position;
  private instructions: Instruction[] = [];

  constructor(grid: Grid, landAt: Position) {
    this.grid = grid;
    this.position = landAt;
  }

  run(instruction: Instruction) {
    if (instruction === Left) {
      this.position = turnLeftAt(this.position);
    }
    if (instruction === Right) {
      this.position = turnRightAt(this.position);
    }
    if (instruction === Forward) {
      this.position = moveForwardFrom(
        this.position,
        this.grid.positionsToIgnore
      );
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

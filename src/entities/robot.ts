import { Position, Instruction } from './types';
import { CommandExecutor } from './robotCommands';

class Robot {
  readonly getUpdatedPosition: CommandExecutor;
  private position: Position;
  private instructions: Instruction[] = [];

  constructor(landAt: Position, commandExecutor: CommandExecutor) {
    this.position = landAt;
    this.getUpdatedPosition = commandExecutor;
  }

  // processes instructions and moves robot
  // skips 'Forward' instructions in ignored positions to avoid falling off the grid
  // stops execution and marks position when robot moves "off" the grid
  execute(instructions: Instruction[]): Robot {
    this.instructions = instructions;
    while (this.instructions.length > 0) {
      const nextInstruction = this.instructions.shift();
      this.position = this.getUpdatedPosition(nextInstruction, this.position);
    }
    return this;
  }

  // returns the current position of the robot e.g. `1 1 E`
  get currentPosition(): string {
    const { x, y, orientation } = this.position;
    return `${x} ${y} ${orientation}`;
  }
}

export default Robot;

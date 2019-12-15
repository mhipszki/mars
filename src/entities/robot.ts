import { Position, Instruction } from './types';
import { CommandExecutor } from './robotCommands';

class Robot {
  readonly getUpdatedPosition: CommandExecutor;
  private position: Position;
  private instructions: Instruction[] = [];
  private isOffGrid: boolean = false;

  constructor(landAt: Position, commandExecutor: CommandExecutor) {
    this.position = landAt;
    this.getUpdatedPosition = commandExecutor;
  }

  private process(instructions: Instruction[]) {
    this.instructions = instructions;

    while (this.instructions.length > 0) {
      const nextInstruction = this.instructions.shift() as Instruction;
      const updatedPosition = this.getUpdatedPosition(
        nextInstruction,
        this.position
      );
      if (updatedPosition.isOffGrid) {
        this.isOffGrid = true;
        break;
      } else {
        this.position = updatedPosition;
      }
    }
  }

  execute(instructions: Instruction[]): Robot {
    if (this.isLost) {
      return this;
    }

    this.process(instructions);

    return this;
  }

  get currentPosition(): string {
    const { x, y, orientation } = this.position;
    const lost = this.isOffGrid ? ' LOST' : '';
    return `${x} ${y} ${orientation}${lost}`;
  }

  get isLost(): boolean {
    return this.isOffGrid;
  }
}

export default Robot;

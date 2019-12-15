import { Grid, Position } from './types';

class Robot {
  readonly grid: Grid;
  private position: Position;

  constructor(grid: Grid, landAt: Position) {
    this.grid = grid;
    this.position = landAt;
  }

  // returns the current position of the robot e.g. `1 1 E`
  get currentPosition(): string {
    const { x, y, orientation } = this.position;
    return `${x} ${y} ${orientation[0]}`;
  }
}

export default Robot;

# Problem: Martian Robots

## Task

> Write a program that determines each sequence of robot positions and reports the final position of the robot.

## Captured requirements

- robots move on a **rectangular grid**
- robot **position**: grid coordinate `(x, y)` + orientation (`N`,`S`,`E`,`W`)
  - e.g. `North` corresponds to the direction from grid point `(x, y)` to grid point `(x, y + 1)`
  - coordinates are **zero based**
- robot **instruction**: sequence of the following characters:
  - `L`: the robot turns left 90 degrees and remains on the current grid point
  - `R`: the robot turns right 90 degrees and remains on the current grid point
  - `F`: the robot moves forward one grid point in the direction of the current
    orientation and maintains the same orientation
  - **additional command types** may be required in the future
- a robot moving "off" the grid is lost forever
  - lost positions on grid are marked
  - other robots will ignore instructions to avoid moving "off" the grid at those positions
- `input`
  - `1st line`: upper-right coordinates, representing the size of the grid e.g. `5 3`, whitespace separated
  - `2nd line`: robot position and orientation e.g. `1 1 E`, whitespace separated
  - `3rd line`: robot instructions e.g. `RFRFRFRF`
  - robot command executions are sequential
  - coordinate max value is `50`
  - instruction string length less than `100`
- `output`
  - final coordinates and orientation of the robot e.g. `1 1 E`
  - followed by `LOST` if a robot falls "off" the edge of the grid e.g. `3 3 N LOST`

## Identified types

### Coordinate

```ts
interface Coordinate {
  x: number;
  y: number;
}
```

### Position

```ts
type North = 'N';
type South = 'S';
type East = 'E';
type West = 'W';

type Orientation = North | South | East | West;

interface Position extends Coordinate {
  orientation: Orientation;
}
```

### Grid

- represented by its lower left and upper right coordinates
- has coordinates which robots should ignore to move onto

```ts
interface Grid {
  lowerLeft: Coordinate;
  upperRight: Coordinate;
  // if robot is in an ignored position with a specific orientation
  // then any subsequent 'F' instruction should be skipped
  positionsToIgnore: Position[];
}
```

### Robot instructions

```ts
type Left = 'L';
type Right = 'R';
type Forward = 'F';
type Instruction = Left | Right | Forward;
```

### Robot

A robot:

- can be created providing a landing position and a command executor
- can receive instructions to process and execute via command executor
- provides access to its current position
- can tell if lost

```ts
abstract class Robot {
  readonly grid: Grid;
  private position: Position;
  private instructions: Instruction[];
  private isOffGrid: boolean;

  constructor(grid: Grid, landAt: Position);

  // processes instructions and moves robot
  // skips 'Forward' instructions in ignored positions to avoid falling off the grid
  // stops execution and marks position when robot moves "off" the grid
  execute(instructions: Instruction[]): Robot;

  // returns the current position of the robot e.g. `1 1 E`
  get currentPosition(): string;
  // returns `true` if the robot moved "off" the grid
  get isLost(): boolean;
}
```

### EarthHQ

Earth HQ sends a set of instructions to Mars HQ.

```ts
abstract class EarthHQ {
  constructor(marsHQ: MarsHQ) {}

  abstract sendToMars(instructionSet: string): void;
}
```

### MarsHQ

Mars HQ:

- receives a set of instructions from Earth HQ
- processes instruction set
- lands robots on Mars to specific positions and instructs them to move around

```ts
abstract class MarsHQ {
  abstract receiveAndProcess(instructionSet: string): void;
}
```

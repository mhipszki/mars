# Problem: Martian Robots

## Task

> Write a program that determines each sequence of robot positions and reports the final position of the robot.

## The solution

- was written in `TypeScript` in a test-driven manner
- focuses on the extendability of robot instructions besides implementing all requirements
- does not have UI but has a simple CLI script for demonstration
- Create React App was used to scaffold the project

> Earth HQ sends input to Marsh HQ to process which will configure and deploy robots to Mars, then returns their final positions to Earth HQ.

Possible improvements:

- thorough input validation with feedback on errors e.g. invalid robot landing position etc.
- demonstrate extendability via passing in different command executor
- some funny UI to see the robots executing instructions on a grid and marking positions where falling off :)

First install dependencies, please run:

```
yarn
```

To demonstrate the project please run:

```
yarn deploy-robots
```

which will pass the _sample instruction string_ (input) from Earth HQ to Marsh HQ to be processed and executed.

The response with the _expected robot positions_ (output) will be logged to the console:

```
Mars HQ has responded with robot locations:
1 1 E
3 3 N LOST
2 3 S
```

To run all unit tests please run:

```
yarn test
```

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

## Identified types

### Coordinate

```ts
interface Coordinate {
  x: number;
  y: number;
}
```

### Position

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

### Robot

A robot:

- can be created providing a landing position and a command executor
- can receive instructions to process and execute via command executor
- provides access to its current position
- can tell if lost

```ts
abstract class Robot {
  readonly getUpdatedPosition: CommandExecutor;
  private position: Position;
  private instructions: Instruction[];
  private isOffGrid: boolean;

  constructor(landAt: Position, commandExecutor: CommandExecutor);

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

  abstract sendToMars(input: string): void;
}
```

### MarsHQ

Mars HQ:

- receives a set of instructions from Earth HQ
- processes instruction set
- lands robots on Mars to specific positions and instructs them to move around

```ts
abstract class MarsHQ {
  abstract receiveAndProcess(input: string): void;
}
```

# Problem: Martian Robots

## Task

> Write a program that determines each sequence of robot positions and reports the final position of the robot.

## Captured requirements

- robots move on a __rectangular grid__
- robot __position__: grid coordinate `(x, y)` + orientation (`N`,`S`,`E`,`W`)
  - e.g. `North` corresponds to the direction from grid point `(x, y)` to grid point `(x, y + 1)`
  - coordinates are __zero based__
- robot __instruction__: sequence of the following characters:
  - `L`: the robot turns left 90 degrees and remains on the current grid point
  - `R`: the robot turns right 90 degrees and remains on the current grid point
  - `F`: the robot moves forward one grid point in the direction of the current
orientation and maintains the same orientation
  - __additional command types__ may be required in the future
- a robot moving "off" the grid is lost forever
  - last positions on grid are marked
  - other robots will ignore instructions to move "off" the grid at those positions
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

import Robot from './robot';
import processInstructions from './instructionProcessor';
import { Grid, RobotInstruction } from './types';
import { CommandExecutor, createExecutor } from './robotCommands';

class MarsHQ {
  receiveAndProcess(input: string) {
    const { upperRight, robotInstructions } = processInstructions(input);

    const grid: Grid = {
      lowerLeft: { x: 0, y: 0 },
      upperRight,
      positionsToIgnore: [],
    };

    const robotPositions = robotInstructions.map(
      ({ landAt, instructionSet }: RobotInstruction) => {
        const commandExecutor: CommandExecutor = createExecutor(grid);
        const robot = new Robot(landAt, commandExecutor);
        robot.execute(instructionSet);
        return robot.currentPosition;
      }
    );

    return robotPositions.join('\n');
  }
}

export default MarsHQ;

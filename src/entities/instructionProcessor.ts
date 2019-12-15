import {
  ConfigurationSet,
  RobotInstruction,
  Position,
  Orientation,
  Instruction,
} from './types';

const extractCoordinatesFrom = (line: string) =>
  line.split(' ').map(v => Number(v));

const extractPositionFrom = (line: string): Position => {
  const [x, y, orientation] = line.split(' ') as [string, string, Orientation];
  return { x: Number(x), y: Number(y), orientation };
};

const extractInstructionSetFrom = (line: string): Instruction[] =>
  line.split('') as Instruction[];

const processInstructions = (input: string): ConfigurationSet => {
  const [firstLine, ...restOfLines] = input.split('\n').filter(line => !!line);

  const [x, y] = extractCoordinatesFrom(firstLine);
  const upperRight = { x, y };

  const robotInstructions = restOfLines.reduce<RobotInstruction[]>(
    (instructions, nextLine, i) => {
      const isPosition = i % 2 === 0;

      if (isPosition) {
        instructions.push({
          landAt: extractPositionFrom(nextLine),
          instructionSet: [],
        });
      } else {
        const lastInstruction = instructions[instructions.length - 1];
        lastInstruction.instructionSet = extractInstructionSetFrom(nextLine);
      }

      return instructions;
    },
    []
  );

  return { upperRight, robotInstructions };
};

export default processInstructions;

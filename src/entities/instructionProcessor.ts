import {
  ConfigurationSet,
  RobotInstruction,
  Position,
  Orientation,
  Instruction,
  Coordinate,
} from './types';

const MAX_INPUT_LENGTH = 100;
const MAX_COORDINATE_VALUE = 50;

const extractCoordinatesFrom = (line: string) =>
  line.split(' ').map(v => Number(v));

const extractPositionFrom = (line: string): Position => {
  const [x, y, orientation] = line.split(' ') as [string, string, Orientation];
  return { x: Number(x), y: Number(y), orientation };
};

const extractInstructionSetFrom = (line: string): Instruction[] =>
  line.split('') as Instruction[];

const exceedsLimit = ({ x, y }: Coordinate) =>
  x > MAX_COORDINATE_VALUE || y > MAX_COORDINATE_VALUE;

const checkCoordinateLimit = (coordinate: Coordinate) => {
  if (exceedsLimit(coordinate)) {
    throw new Error(`Coordinate value exceeds limit: ${MAX_COORDINATE_VALUE}`);
  }
};

const checkInputLimit = (input: string) => {
  if (input.length > MAX_INPUT_LENGTH) {
    throw new Error(`Input length exceeds limit: ${MAX_INPUT_LENGTH}`);
  }
};

const processInstructions = (input: string): ConfigurationSet => {
  checkInputLimit(input);

  const [firstLine, ...restOfLines] = input.split('\n').filter(line => !!line);

  const [x, y] = extractCoordinatesFrom(firstLine);
  const upperRight = { x, y };

  checkCoordinateLimit(upperRight);

  const robotInstructions = restOfLines.reduce<RobotInstruction[]>(
    (instructions, nextLine, i) => {
      const isPosition = i % 2 === 0;

      if (isPosition) {
        const landAt = extractPositionFrom(nextLine);
        checkCoordinateLimit(landAt);
        instructions.push({ landAt, instructionSet: [] });
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

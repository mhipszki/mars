import { InstructionSet } from './types';

const processInstructions = (input: string): InstructionSet => {
  const [upperRightCoords] = input.split('\n').filter(line => !!line);

  const [x, y] = upperRightCoords.split(' ').map(v => Number(v));
  const upperRight = { x, y };

  return { upperRight };
};

export default processInstructions;

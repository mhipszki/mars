import MarsHQ from './marsHQ';
import input from './instructionMessageExample';

test('deploys robots on Mars when receives instructions', () => {
  const marsHQ = new MarsHQ();
  const robotPositions = marsHQ.receiveAndProcess(input);
  expect(robotPositions).toBe(['1 1 E', '3 3 N LOST', '2 3 S'].join('\n'));
});

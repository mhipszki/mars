import EarthHQ from './earthHQ';
import input from './instructionMessageExample';

test('sends instructions to Mars to deploys robots', () => {
  const earthHQ = new EarthHQ();
  const response = earthHQ.sendToMars(input);
  expect(response).toBe(
    `1 1 E
3 3 N LOST
2 3 S`
  );
});

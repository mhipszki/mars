import EarthHQ from './entities/earthHQ';

const earthHQ = new EarthHQ();

const response = earthHQ.sendToMars(
  `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`
);

console.log('Mars HQ has responded with robot locations:');
console.log(response);

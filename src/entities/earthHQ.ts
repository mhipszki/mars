import MarsHQ from './marsHQ';

class EarthHQ {
  private marsHQ: MarsHQ;
  constructor() {
    this.marsHQ = new MarsHQ();
  }

  sendToMars(input: string) {
    return this.marsHQ.receiveAndProcess(input);
  }
}

export default EarthHQ;

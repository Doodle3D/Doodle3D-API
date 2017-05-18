import * as rest from '../rest.js';

export default class Printer {
  constructor(api) {
    this.api = api;
  }
  temperature() {
    return rest.get(`${ this.api }printer/temperature`);
  }
  progress() {
    return rest.get(`${ this.api }printer/progress`);
  }
  state() {
    return rest.get(`${ this.api }printer/state`);
  }
  listAll() {
    return rest.get(`${ this.api }printer/listall`);
  }
  heatup() {
    return rest.post(`${ this.api }printer/heatup`, {});
  }
  print(gcode = '', first = false, start = false, last) {
    return rest.post(`${ this.api }printer/print`, { gcode, first, start, last });
  }
  stop(gcode = '') {
    return rest.post(`${ this.api }printer/stop`, { gcode });
  }
  fetch(gcode = '') {
    rest.post(`https://tranquil-meadow-94621.herokuapp.com/upload`, { gcode })
      .then(response => {
        rest.post(`${ this.api }printer/fetch`, { id: response.id });
      }).catch(err => {
        console.log(err);
      });
  }
  async _sendBatch(gcode, start, index) {
    try {
      const response = await this.print(gcode, start, start);

      console.log(`batch sent: ${ index }`);
    } catch(error) {
      console.log(`failed sending batch: ${ index }`);

      await sleep(1000);

      await this._sendBatch(gcode, index);
    }
  }
}

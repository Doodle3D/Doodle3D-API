import { parseFetch, sleep } from '../utils.js';

export default class Printer {
  constructor(api) {
    this.api = api;
  }
  temperature() {
    return fetch(`${this.api}printer/temperature`, { method: 'GET' }).then(parseFetch);
  }
  progress() {
    return fetch(`${this.api}printer/progress`, { method: 'GET' }).then(parseFetch);
  }
  state() {
    return fetch(`${this.api}printer/state`, { method: 'GET' }).then(parseFetch);
  }
  listAll() {
    return fetch(`${this.api}printer/listall`, { method: 'GET' }).then(parseFetch);
  }
  heatup() {
    const body = new URLSearchParams();

    return fetch(`${this.api}printer/heatup`, { method: 'POST', body }).then(parseFetch);
  }
  fetch(id, startCode = 'g28', endCode = 'g28') {
    const body = new URLSearchParams();
    body.append('id', id);
    body.append('start_code', startCode);
    body.append('end_code', endCode);

    return fetch(`${this.api}printer/fetch`, { method: 'POST', body }).then(parseFetch);
  }
  print(gcode = '', first = false, start = false, last) {
    const body = new URLSearchParams();
    body.append('gcode', gcode);
    body.append('first', first);
    body.append('start', start);
    body.append('last', last);

    return fetch(`${this.api}printer/print`, { method: 'POST', body }).then(parseFetch);
  }
  stop(gcode = '') {
    const body = new URLSearchParams();
    body.append('gcode', gcode);

    return fetch(`${this.api}printer/stop`, { method: 'POST', body }).then(parseFetch);
  }
  async _sendBatch(gcode, start, index) {
    try {
      const response = await this.print(gcode, start, start);
      console.log(`batch sent: ${index}`);
    } catch(error) {
      console.log(`failed sending batch: ${index}`);
      await sleep(1000);
      await this._sendBatch(gcode, index);
    }
  }
}

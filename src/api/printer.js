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
    return fetch(`${this.api}printer/heatup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).then(parseFetch);
  }
  print(gcode = '', first = false, start = false, last) {
    return fetch(`${this.api}printer/print`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gcode, first, start, last })
    }).then(parseFetch);
  }
  stop(gcode = '') {
    return fetch(`${this.api}printer/stop`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gcode, first, start, last })
    }).then(parseFetch);
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

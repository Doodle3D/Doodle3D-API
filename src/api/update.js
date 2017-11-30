import { parseFetch } from '../utils.js';

export default class Update {
  constructor(api) {
    this.api = api;
  }
  status() {
    return fetch(`${this.api}update/status`, { method: 'GET' }).then(parseFetch);
  }
  download() {
    //not tested
    return fetch(`${this.api}update/download`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).then(parseFetch);
  }
  install() {
    //not tested
    return fetch(`${this.api}update/install`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).then(parseFetch);
  }
  clear() {
    //not tested
    return fetch(`${this.api}update/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).then(parseFetch);
  }
}

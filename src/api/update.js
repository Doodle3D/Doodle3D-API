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
    const body = new URLSearchParams();

    return fetch(`${this.api}update/download`, { method: 'POST', body }).then(parseFetch);
  }
  install() {
    //not tested
    const body = new URLSearchParams();

    return fetch(`${this.api}update/install`, { method: 'POST', body }).then(parseFetch);
  }
  clear() {
    //not tested
    const body = new URLSearchParams();

    return fetch(`${this.api}update/clear`, { method: 'POST', body }).then(parseFetch);
  }
}

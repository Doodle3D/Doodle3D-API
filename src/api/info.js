import { parseFetch } from '../utils.js';

export default class Info {
  constructor(api) {
    this.api = api;
  }
  get() {
    return fetch(`${this.api}info`, { method: 'GET' }).then(parseFetch);
  }
  status() {
    return fetch(`${this.api}info/status`, { method: 'GET' }).then(parseFetch);
  }
  downloadLogFiles() {
    window.location = `${this.api}info/logfiles`;
  }
  acces() {
    return fetch(`${this.api}info/access`, { method: 'GET' }).then(parseFetch);
  }
}

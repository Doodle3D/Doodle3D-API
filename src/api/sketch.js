import { parseFetch } from '../utils.js';

export default class Sketch {
  constructor(api) {
    this.api = api;
  }
  getSketch(id) {
    return fetch(`${this.api}sketch/?id=${id}`, { method: 'GET' }).then(parseFetch);
  }
  set(data = '') {
    const body = new URLSearchParams();
    body.append('data', data);

    return fetch(`${this.api}sketch`, { method: 'POST', body }).then(parseFetch);
  }
  status() {
    return fetch(`${this.api}sketch/status`, { method: 'GET' }).then(parseFetch);
  }
  clear() {
    const body = new URLSearchParams();

    return fetch(`${this.api}sketch/clear`, { method: 'POST', body }).then(parseFetch);
  }
}

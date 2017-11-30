import { parseFetch } from '../utils.js';

export default class Sketch {
  constructor(api) {
    this.api = api;
  }
  getSketch(id) {
    return fetch(`${this.api}sketch/?id=${id}`, { method: 'GET' }).then(parseFetch);
  }
  set(data = '') {
    return fetch(`${this.api}sketch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    }).then(parseFetch);
  }
  status() {
    return fetch(`${this.api}sketch/status`, { method: 'GET' }).then(parseFetch);
  }
  clear() {
    return fetch(`${this.api}sketch/clear`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).then(parseFetch);
  }
}

import { parseFetch } from '../utils.js';

export default class Config {
  constructor(api) {
    this.api = api;
  }
  get(...keys) {
    return fetch(`${this.api}config/?${keys.join('=&')}=`, { method: 'GET' }).then(parseFetch);
  }
  getAll() {
    return fetch(`${this.api}config/all`, { method: 'GET' }).then(parseFetch);
  }
  set(data) {
    return fetch(`${this.api}config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(parseFetch);
  }
}

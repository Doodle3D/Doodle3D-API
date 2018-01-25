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
    const body = new URLSearchParams();
    for (const key in data) {
      body.append(key, data[key]);
    }

    return fetch(`${this.api}config`, { method: 'POST', body }).then(parseFetch);
  }
}

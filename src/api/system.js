import { parseFetch } from '../utils.js';

export default class System {
  constructor(api) {
    this.api = api;
  }
  versions() {
    return fetch(`${this.api}system/fwversions`, { method: 'GET' }).then(parseFetch);
  }
}

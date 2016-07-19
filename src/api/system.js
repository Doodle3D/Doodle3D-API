import * as rest from '../rest.js';

export default class System {
  constructor(api) {
    this.api = api;
  }
  versions() {
    return rest.get(`${ this.api }system/fwversions`);
  }
}

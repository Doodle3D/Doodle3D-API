import * as rest from '../rest.js';

export default class Network {
  constructor(api) {
    this.api = api;
  }
  scan() {
    return rest.get(`${ this.api }network/scan`);
  }
  known() {
    return rest.get(`${ this.api }network/known`);
  }
  status() {
    return rest.get(`${ this.api }network/status`);
  }
  assosiate(ssid, phrase, recreate = false) {
    return rest.post(`${ this.api }network/associate`, { ssid, phrase, recreate });
  }
  disassociate() {
    //not tested
    return rest.post(`${ this.api }network/disassociate`, {});
  }
  openAccesPoint() {
    //not tested
    return rest.post(`${ this.api }network/openap`, {});
  }
  remove(ssid) {
    return rest.post(`${ this.api }network/remove`, { ssid });
  }
  signin() {
    return rest.get(`${ this.api }network/signin`);
  }
  async alive() {
    try {
      await rest.get(`${ this.api }network/alive`);

      return true;
    } catch(error) {
      return false;
    }
  }
}

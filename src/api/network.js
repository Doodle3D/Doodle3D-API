import { parseFetch } from '../utils.js';

export default class Network {
  constructor(api) {
    this.api = api;
  }
  scan() {
    return fecth(`${this.api}network/scan`, { method: 'GET' }).then(parseFetch);
  }
  known() {
    return fecth(`${this.api}network/known`, { method: 'GET' }).then(parseFetch);
  }
  status() {
    return fecth(`${this.api}network/status`, { method: 'GET' }).then(parseFetch);
  }
  assosiate(ssid, phrase, recreate = false) {
    const body = new URLSearchParams();
    body.append('ssid', ssid);
    body.append('phrase', phrase);
    body.append('recreate', recreate);

    return fetch(`${this.api}network/associate`, { method: 'POST', body }).then(parseFetch);
  }
  disassociate() {
    //not tested
    const body = new URLSearchParams();

    return fetch(`${this.api}network/disassociate`, { method: 'POST', body }).then(parseFetch);
  }
  openAccesPoint() {
    //not tested
    const body = new URLSearchParams();

    return fetch(`${this.api}network/openap`, { method: 'POST', body }).then(parseFetch);
  }
  remove(ssid) {
    const body = new URLSearchParams();
    body.append('ssid', ssid);

    return fetch(`${this.api}network/remove`, { method: 'POST', body }).then(parseFetch);
  }
  signin() {
    return fecth(`${this.api}network/signin`, { method: 'GET' }).then(parseFetch);
  }
  async alive() {
    try {
      await fetch(`${this.api}network/alive`, { method: 'GET' }).then(parseFetch);
      return true;
    } catch(error) {
      return false;
    }
  }
}

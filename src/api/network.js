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
    return fetch(`${this.api}network/associate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssid, phrase, recreate })
    }).then(parseFetch);
  }
  disassociate() {
    //not tested
    return fetch(`${this.api}network/disassociate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).then(parseFetch);
  }
  openAccesPoint() {
    //not tested
    return fetch(`${this.api}network/openap`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    }).then(parseFetch);
  }
  remove(ssid) {
    return fetch(`${this.api}network/remove`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssid })
    }).then(parseFetch);
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

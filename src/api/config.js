import * as rest from '../rest.js';

export default class Config {
	constructor(api) {
		this.api = api;
	}
	get(...keys) {
		return rest.get(`${ this.api }config/?${ keys.join('=&') }=`);
	}
	getAll() {
		return rest.get(`${ this.api }config/all`);
	}
	set(data) {
		return rest.post(`${ this.api }config`, data);
	}
}

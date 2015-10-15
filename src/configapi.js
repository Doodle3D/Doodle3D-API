import * as rest from './restapi.js';

export default class {
	constructor (api) {
		this.api = api;
	}

	get (...keys) {
		return rest.get(`${this.api}config/?${keys.join('=&')}=`);
	}

	getAll () {
		return rest.get(`${this.api}config/all`);
	}

	set (data) {
		return rest.post(`${this.api}config`, data);
	}
}

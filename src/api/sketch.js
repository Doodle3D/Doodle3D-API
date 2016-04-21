import * as rest from './restapi.js';

export default class {
	constructor (api) {
		this.api = api;
	}

	getSketch (id) {
		return rest.get(`${ this.api }sketch/?id=${ id }`);
	}

	set (data = '') {
		return rest.post(`${ this.api }sketch`, { data });
	}

	status () {
		return rest.get(`${ this.api }sketch/status`);
	}

	clear () {
		return rest.post(`${ this.api }sketch/clear`);
	}
}

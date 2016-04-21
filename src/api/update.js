import * as rest from '../rest.js';

export default class {
	constructor (api) {
		this.api = api;
	}

	status () {
		return rest.get(`${ this.api }update/status`);
	}

	download () {
		//not tested

		return rest.post(`${ this.api }update/download`, {});
	}

	install () {
		//not tested

		return rest.post(`${ this.api }update/install`, {});
	}

	clear () {
		//not tested

		return rest.post(`${ this.api }update/clear`, {});
	}
}

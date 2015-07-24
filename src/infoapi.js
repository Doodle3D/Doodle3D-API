import * as rest from './restapi.js';

export default class {
	constructor (api) {
		this.api = api;
	}

	get () {
		return rest.get(this.api + 'info');
	}

	status () {
		return rest.get(this.api + 'info/status');
	}

	downloadLogFiles () {
		window.location = this.api + 'info/logfiles';
	}

	acces () {
		return rest.get(this.api + 'info/access');
	}
}
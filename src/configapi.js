import * as rest from './restapi.js';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = 'http://' + localIP + '/d3dapi/';
	}

	get (keys) {
		return rest.get(this.api + 'config/?' + keys.join('=&') + '=');
	}

	getAll () {
		return rest.get(this.api + 'config/all');
	}

	set (data) {
		var scope = this;

		return rest.post(this.api + 'config', data);
	}
}
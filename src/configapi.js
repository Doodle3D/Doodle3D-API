import rest from './restapi.js';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = 'http://' + localIP + '/d3dapi/';
	}

	get (keys, callback) {
		rest.get(this.api + 'config/?' + keys.join('=&') + '=', callback);
	}

	getAll (callback) {
		rest.get(this.api + 'config/all', callback);
	}

	set (data, callback) {
		var scope = this;

		rest.post(this.api + 'config', data, function (response) {

			if (callback !== undefined) {
				callback(response);
			}
		});
	}
}
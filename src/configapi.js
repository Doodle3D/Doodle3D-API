import rest from 'rest-API';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = 'http://' + localIP + '/d3dapi/';
	}

	get (keys, callback) {
		rest.get(this.api + 'config/?' + keys.join('=&') + '=', callback);

		return this;
	}

	getAll (callback) {
		rest.get(this.api + 'config/all', callback);

		return this;
	}

	set (data, callback) {
		var scope = this;

		rest.post(this.api + 'config', data, function (response) {
			/*for (var i in response.validation) {
				if (response.validation[i] === 'ok') {
					scope[i] = data[i];
				}
			}*/

			if (callback !== undefined) {
				callback(response);
			}
		});

		return this;
	}
}
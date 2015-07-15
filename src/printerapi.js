import rest from 'rest-API';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	temperature (callback) {
		rest.get(this.api + 'printer/temperature', callback);

		return this;
	}

	progress (callback) {
		rest.get(this.api + 'printer/progress', callback);

		return this;
	}

	state (callback) {
		rest.get(this.api + 'printer/state', callback);

		return this;
	}

	listAll (callback) {
		rest.get(this.api + 'printer/listall', callback);

		return this;
	}

	heatup (callback) {
		rest.post(this.api + 'printer/heatup', {}, callback);

		return this;
	}

	print (data, callback) {
		rest.post(this.api + 'printer/print', data, callback);

		return this;
	}

	stop (data, callback) {
		rest.post(this.api + 'printer/stop', data, callback);

		return this;
	}
}
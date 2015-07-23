import rest from './restapi.js';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	temperature (callback) {
		rest.get(this.api + 'printer/temperature', callback);
	}

	progress (callback) {
		rest.get(this.api + 'printer/progress', callback);
	}

	state (callback) {
		rest.get(this.api + 'printer/state', callback);
	}

	listAll (callback) {
		rest.get(this.api + 'printer/listall', callback);
	}

	heatup (callback) {
		rest.post(this.api + 'printer/heatup', {}, callback);
	}

	print (data, callback) {
		rest.post(this.api + 'printer/print', data, callback);
	}

	stop (data, callback) {
		rest.post(this.api + 'printer/stop', data, callback);
	}
}
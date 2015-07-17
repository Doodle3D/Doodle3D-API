import rest from 'rest-API';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	get (callback) {
		rest.get(this.api + 'info', callback);
	}

	status (callback) {
		rest.get(this.api + 'info/status', callback);
	}

	downloadLogFiles () {
		window.location = this.api + 'info/logfiles';
	}

	acces (callback) {
		rest.get(this.api + 'info/access', callback);
	}
}
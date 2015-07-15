import rest from 'src/restapi';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	get (callback) {
		rest.get(this.api + 'info', callback);

		return this;
	}

	status (callback) {
		rest.get(this.api + 'info/status', callback);

		return this;
	}

	downloadLogFiles () {
		window.location = this.api + 'info/logfiles';
	}

	acces (callback) {
		rest.get(this.api + 'info/access', callback);

		return this;
	}
}
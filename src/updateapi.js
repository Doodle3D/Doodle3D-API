import rest from 'rest-API';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	status (callback) {
		rest.get(this.api + 'update/status', callback);
	}

	download (callback) {
		//not tested

		rest.post(this.api + 'update/download', {}, callback);
	}

	install (callback) {
		//not tested

		rest.post(this.api + 'update/install', {}, callback);
	}

	clear (callback) {
		//not tested

		rest.post(this.api + 'update/clear', {}, callback);
	}
}
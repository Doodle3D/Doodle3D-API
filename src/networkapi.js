import rest from './restapi.js';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	scan (callback) {
		rest.get(this.api + 'network/scan', callback);
	}

	known (callback) {
		rest.get(this.api + 'network/known', callback);
	}

	status (callback) {
		rest.get(this.api + 'network/status', callback);
	}

	assosiate (data, callback) {
		rest.post(this.api + 'network/associate', data, callback);	
	}

	disassosiate (callback) {
		//not tested

		rest.post(this.api + 'network/disassociate', {}, callback);
	}

	openAccesPoint (callback) {
		//not tested

		rest.post(this.api + 'network/openap', {}, callback);
	}

	remove (ssid, callback) {
		rest.post(this.api + 'network/remove', {
			'ssid': ssid
		}, callback);
	}

	signin (callback) {
		rest.get(this.api + 'network/signin', callback);
	}

	alive (callback) {
		rest.get(this.api + 'network/alive', callback);
	}
}
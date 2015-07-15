import rest from 'rest-API';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	scan (callback) {
		rest.get(this.api + 'network/scan', callback);

		return this;
	}

	known (callback) {
		rest.get(this.api + 'network/known', callback);

		return this;
	}

	status (callback) {
		rest.get(this.api + 'network/status', callback);

		return this;
	}

	assosiate (data, callback) {
		rest.post(this.api + 'network/associate', data, callback);	

		return this;
	}

	disassosiate (callback) {
		//not tested

		rest.post(this.api + 'network/disassociate', {}, callback);

		return this;	
	}

	openAccesPoint (callback) {
		//not tested

		rest.post(this.api + 'network/openap', {}, callback);

		return this;	
	}

	remove (ssid, callback) {
		rest.post(this.api + 'network/remove', {
			'ssid': ssid
		}, callback);

		return this;	
	}

	signin (callback) {
		rest.get(this.api + 'network/signin', callback);

		return this;
	}

	alive (callback) {
		rest.get(this.api + 'network/alive', callback);

		return this;
	}
}
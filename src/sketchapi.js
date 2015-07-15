import rest from 'rest-API';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

		getSketch (id, callback) {
		rest.get(this.api + 'sketch/?id=' + id, callback);
		
		return this;
	}

	set (data, callback) {
		rest.post(this.api + 'sketch', {
			'data': data
		}, callback);
		
		return this;
	}

	status (callback) {
		rest.get(this.api + 'sketch/status', callback);
		
		return this;
	}

	clear (callback) {
		rest.post(this.api + 'sketch/clear', callback);
		
		return this;
	}
}
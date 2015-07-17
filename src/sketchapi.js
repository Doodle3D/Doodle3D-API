import rest from 'rest-API';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	getSketch (id, callback) {
		rest.get(this.api + 'sketch/?id=' + id, callback);
	}

	set (data, callback) {
		rest.post(this.api + 'sketch', {
			'data': data
		}, callback);
	}

	status (callback) {
		rest.get(this.api + 'sketch/status', callback);
	}

	clear (callback) {
		rest.post(this.api + 'sketch/clear', callback);
	}
}
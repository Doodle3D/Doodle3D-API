import * as rest from './restapi.js';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	getSketch (id) {
		return rest.get(this.api + 'sketch/?id=' + id);
	}

	set (data) {
		return rest.post(this.api + 'sketch', {
			'data': data
		});
	}

	status () {
		return rest.get(this.api + 'sketch/status');
	}

	clear () {
		return rest.post(this.api + 'sketch/clear');
	}
}
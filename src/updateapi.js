import * as rest from './restapi.js';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	status () {
		return rest.get(this.api + 'update/status');
	}

	download () {
		//not tested

		return rest.post(this.api + 'update/download', {});
	}

	install () {
		//not tested

		return rest.post(this.api + 'update/install', {});
	}

	clear () {
		//not tested

		return rest.post(this.api + 'update/clear', {});
	}
}
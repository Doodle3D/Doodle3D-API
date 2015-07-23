import * as rest from './restapi.js';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	temperature () {
		return rest.get(this.api + 'printer/temperature');
	}

	progress () {
		return rest.get(this.api + 'printer/progress');
	}

	state () {
		return rest.get(this.api + 'printer/state');
	}

	listAll () {
		return rest.get(this.api + 'printer/listall');
	}

	heatup () {
		return rest.post(this.api + 'printer/heatup', {});
	}

	print (data) {
		return rest.post(this.api + 'printer/print', data);
	}

	stop (data) {
		return rest.post(this.api + 'printer/stop', data);
	}
}
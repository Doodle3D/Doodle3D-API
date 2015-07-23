import rest from './restapi.js';

export default class {
	constructor (localIP) {
		this.localIP = localIP;
		this.api = `http://${localIP}/d3dapi/`;
	}

	versions (callback) {
		rest.get(this.api + 'system/fwversions', callback);
	}
}
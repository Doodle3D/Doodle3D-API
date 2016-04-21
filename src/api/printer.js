import * as rest from '../rest.js';

export default class {
	constructor (api) {
		this.api = api;
	}

	temperature () {
		return rest.get(`${ this.api }printer/temperature`);
	}

	progress () {
		return rest.get(`${ this.api }printer/progress`);
	}

	state () {
		return rest.get(`${ this.api }printer/state`);
	}

	listAll () {
		return rest.get(`${ this.api }printer/listall`);
	}

	heatup () {
		return rest.post(`${ this.api }printer/heatup`, {});
	}

	print (gcode = '', first = false, start = false, last) {
		const data = { gcode, first, start, last };

		return rest.post(`${ this.api }printer/print`, data);
	}

	stop (gcode = '') {
		const data = { gcode };

		return rest.post(`${ this.api }printer/stop`, data);
	}
}

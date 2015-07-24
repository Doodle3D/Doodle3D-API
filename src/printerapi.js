import * as rest from './restapi.js';

export default class {
	constructor (api) {
		this.api = api;
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

	print (gcode = '', first = false, start = false, last = false) {
		var data = {gcode, first, start}
		if (last) data.last = last;

		return rest.post(this.api + 'printer/print', data);
	}

	stop (gcode = '') {
		return rest.post(this.api + 'printer/stop', {gcode});
	}
}
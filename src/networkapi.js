import * as rest from './restapi.js';

export default class {
	constructor (api) {
		this.api = api;
	}

	scan () {
		return rest.get(this.api + 'network/scan');
	}

	known () {
		return rest.get(this.api + 'network/known');
	}

	status () {
		return rest.get(this.api + 'network/status');
	}

	assosiate (ssid, phrase = null, recreate = false) {
		var data = {ssid, recreate};
		if (phrase) data.phrase = phrase;

		return rest.post(this.api + 'network/associate', data);
	}

	disassosiate () {
		//not tested

		return rest.post(this.api + 'network/disassociate', {});
	}

	openAccesPoint () {
		//not tested

		return rest.post(this.api + 'network/openap', {});
	}

	remove (ssid) {
		return rest.post(this.api + 'network/remove', {
			'ssid': ssid
		});
	}

	signin () {
		return rest.get(this.api + 'network/signin');
	}

	alive () {
		return rest.get(this.api + 'network/alive');
	}
}
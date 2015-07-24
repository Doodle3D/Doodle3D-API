import * as rest from './restapi.js';
import Doodle3DAPI from './doodle3dapi.js';
import EventDispatcher from 'casperlamboo/EventDispatcher';

export default class extends EventDispatcher {
	constructor () {
		super();

		this.boxes = [];
		this.api = 'http://connect.doodle3d.com/api/';
	}

	setAutoUpdate (autoUpdate = true, rate = 5000) {
		if (autoUpdate) {
			this._checkNew();

			if (this.interval !== undefined) {
				clearInterval(this.interval);
			}

			this.interval = setInterval(() => {
				this._checkNew();
			}, rate);
		}
		else if (this.interval !== undefined) {
			clearInterval(this.interval);
			delete this.interval;
		}

		return this;
	}

	addBox (boxData) {
		var box = new Doodle3DAPI(boxData);

		this.boxes.push(box);

		this.dispatchEvent({
			type: 'boxappeared', 
			box: box
		});
	}

	_checkNew () {
		rest.get(this.api + 'list.php').then((boxes) => {
			
			var knownIPs = this.boxes.map((box) => box.boxData.localip);

			for (var boxData of boxes) {
				if (knownIPs.indexOf(boxData.localip) === -1) {
					this.addBox(boxData);
				}
			}

		});
	}
}
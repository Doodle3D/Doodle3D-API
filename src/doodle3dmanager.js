import * as rest from './restapi.js';
import Doodle3DAPI from './doodle3dapi.js';
import EventDispatcher from 'casperlamboo/EventDispatcher';
import {sleep} from './utils.js';

export default class Doodle3DManager extends EventDispatcher {
	constructor () {
		super();

		this.api = 'http://connect.doodle3d.com/api/';

		this.boxes = [];

		this.nonServerBoxes = [{
			wifiboxid: 'Wired Printer',
			localip: '192.168.5.1'
		}/*, {
			wifiboxid: 'Node JS Server',
			localip: '127.0.0.1:3000'
		}*/];
		this.checkNonServerBoxes = true;

		this.autoUpdate = false;
	}

	setAutoUpdate (autoUpdate = true, updateInterval = 1000) {
		this.updateInterval = updateInterval;

		if (this.autoUpdate === autoUpdate) {
			return;
		}

		this.autoUpdate = autoUpdate;

		if (autoUpdate) {
			this._update();
		}

		return this;
	}

	async _update () {
		while (this.autoUpdate) {
			await this._checkAlive();
			await this._checkNew();

			await sleep(this.updateInterval);
		}
	}

	_checkAlive () {
		return new Promise(async (resolve, reject) => {

			await Promise.all(this.boxes.map((box) => {
				let promise = box.checkAlive();
				promise.then((alive) => {
					if (!alive) {
						this._removeBox(box);
					}
				})

				return promise;
			}));

			resolve();
		});
	}

	_checkNew () {
		return new Promise(async (resolve, reject) => {	
			let boxes;	
			try {
				boxes = await rest.get(`${this.api}list.php`);
			}
			catch (error) {
				console.warn('fail connecting to Doodle3D server', error);
				return;
			}

			if (this.checkNonServerBoxes) {
				boxes = [...boxes, ...this.nonServerBoxes];
			}

			let knownIPs = this.boxes.map((box) => box.boxData.localip);

			for (let boxData of boxes) {
				if (knownIPs.indexOf(boxData.localip) === -1) {
					let box = new Doodle3DAPI(boxData);

					let alive = await box.checkAlive();

					if (alive) {
						this._addBox(box);
					}
				}
			}

			resolve();
		});
	}

	_addBox (box) {
		this.boxes.push(box);

		this.dispatchEvent({ type: 'boxappeared', box });
	}

	_removeBox (box) {
		let index = this.boxes.indexOf(box);
		if (index !== -1) {
			this.boxes.splice(index, 1);
			this.dispatchEvent({ type: 'boxdisappeared', box });
		}
	}
}

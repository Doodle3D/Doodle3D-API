import * as rest from './restapi.js';
import Doodle3DAPI from './doodle3dapi.js';
import EventDispatcher from 'casperlamboo/EventDispatcher';

export default class extends EventDispatcher {
	constructor () {
		super();

		this.boxes = [];
		this.nonServerBoxes = [{
			wifiboxid: 'Wired Printer', 
			localip: '192.168.5.1'
		}, {
			wifiboxid: 'Node JS Server', 
			localip: '127.0.0.1:2000'
		}];
		this.checkNonServerBoxes = true;
		this.api = 'http://connect.doodle3d.com/api/';
	}

	setAutoUpdate (autoUpdate = true, rate = 5000) {
		if (autoUpdate) {
			this._update();

			if (this.interval !== undefined) {
				clearInterval(this.interval);
			}

			this.interval = setInterval(() => {
				this._update();
			}, rate);
		}
		else if (this.interval !== undefined) {
			clearInterval(this.interval);
			delete this.interval;
		}

		return this;
	}

	_addBox (box) {
		this.boxes.push(box);

		this.dispatchEvent({
			type: 'boxappeared', 
			box
		});
	}

	_removeBox (box) {
		var index = this.boxes.indexOf(box);
		if (index !== -1) {
			this.boxes.splice(index, 1);
			this.dispatchEvent({
				type: 'boxdisappeared', 
				box
			});
		}
	}

	_update () {
		this._checkAlive();
		this._checkNew();
	}

	_checkAlive () {
		for (var box of this.boxes) {
			((box) => {
				var request = box.network.alive();
				request.catch(() => {
					this._removeBox(box);
				});
			})(box);
		}
	}

	_checkNew () {

		var request = rest.get(this.api + 'list.php');
		request.then((boxes) => {

			if (this.checkNonServerBoxes) {
				boxes = boxes.concat(this.nonServerBoxes);
			}

			var knownIPs = this.boxes.map((box) => box.boxData.localip);

			for (var boxData of boxes) {
				if (knownIPs.indexOf(boxData.localip) === -1) {
					var box = new Doodle3DAPI(boxData);
					((box) => {
						var request = box.network.alive();
						request.then((data, msg) => {
							this._addBox(box);
						});
						request.catch(() => {
							console.log(`failed to connect with ${box.boxData.wifiboxid}`);
						});

					})(box);
				}
			}
		});
		request.catch(() => {
			console.warn('fail connecting to Doodle3D server');
		});
	}
}
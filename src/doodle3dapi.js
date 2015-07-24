import EventDispatcher from 'casperlamboo/EventDispatcher';
import * as rest from './restapi.js';
import ConfigAPI from './configapi.js';
import InfoAPI from './infoapi.js';
import NetworkAPI from './networkapi.js';
import PrinterAPI from './printerapi.js';
import SketchAPI from './sketchapi.js';
import SystemAPI from './systemapi.js';
import UpdateAPI from './updateapi.js';

export default class extends EventDispatcher {
	constructor (boxData) {
		super();

		this.boxData = boxData;

		this.api = `http://${boxData.localip}/d3dapi/`;

		this.config = new ConfigAPI(this.api);
		this.info = new InfoAPI(this.api);
		this.network = new NetworkAPI(this.api);
		this.printer = new PrinterAPI(this.api);
		this.sketch = new SketchAPI(this.api);
		this.system = new SystemAPI(this.api);
		this.update = new UpdateAPI(this.api);
		
		this.alive = false;
		this.autoUpdate = false;
		
		this.state = {};
	}

	setAutoUpdate (autoUpdate = true, updateInterval = 1000) {
		
		this.updateInterval = updateInterval;

		if (this.autoUpdate === autoUpdate) {
			return;
		}

		this.autoUpdate = autoUpdate;

		if (autoUpdate) {
			this._initLoop();
		}

		return this;
	}

	_initLoop () {

		this.network.alive().then(() => {

			this.alive = true;

			this.dispatchEvent({
				type: 'connect'
			});

			this._updateStateLoop();

		}).catch((error) => {

			if (this.alive) {

				this.alive = false;

				this.dispatchEvent({
					type: 'disconnect'
				});
			}
			
			setTimeout(() => {
				this._initLoop();
			}, this.updateInterval);
		});
	}

	_updateStateLoop () {

		this.info.status().then((state) => {
			this.state = state;

			this.dispatchEvent({
				type: 'update', 
				state
			});

			if (this.autoUpdate) {
				setTimeout(() => {
					this._updateStateLoop();
				}, this.updateInterval);
			}

		}).catch((error) => {
			if (this.autoUpdate) {
				setTimeout(() => {
					this._initLoop();
				}, this.updateInterval);
			}
		});
	}
}
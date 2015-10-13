import EventDispatcher from 'casperlamboo/EventDispatcher';
import * as rest from './restapi.js';
import ConfigAPI from './configapi.js';
import InfoAPI from './infoapi.js';
import NetworkAPI from './networkapi.js';
import PrinterAPI from './printerapi.js';
import SketchAPI from './sketchapi.js';
import SystemAPI from './systemapi.js';
import UpdateAPI from './updateapi.js';
import {sleep} from './utils.js';

export default class extends EventDispatcher {
	constructor (boxData) {
		super();

		this.boxData = boxData;

		this.api = `http://${boxData.localip}/d3dapi/`;
		
		this.alive = false;
		this.autoUpdate = false;
		this.state = {};

		this.maxBatchSize = 10*1024;
		this.maxBufferSize = 1024*1024;
		this.fullBufferTimeout = 10000;

		this.config = new ConfigAPI(this.api);
		this.info = new InfoAPI(this.api);
		this.network = new NetworkAPI(this.api);
		this.printer = new PrinterAPI(this.api);
		this.sketch = new SketchAPI(this.api);
		this.system = new SystemAPI(this.api);
		this.update = new UpdateAPI(this.api);
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

	checkAlive () {
		return new Promise(async (resolve, reject) => {
			let alive;
			try {
				await this.network.alive();
				alive = true;
			}
			catch (error) {
				alive = false;
			}

			if (alive !== this.alive) {
				this.dispatchEvent({
					type: alive ? 'connect' : 'disconnect'
				});
			}

			this.alive = alive;
			resolve(alive);
		});
	}

	sendGCode (gcode) {
		return new Promise(async (resolve, reject) => {
			let printerState = await this.printer.state();
			if (printerState.state !== 'idle') {
				reject(`Cannot print, print state is ${printerState.state}`);
				return;
			}

			let autoUpdateState = this.autoUpdate;
			this.autoUpdate = false;

			if (!gcode.endsWith('\n')) {
				gcode += '\n';
			}

			this._currentBatch = 0;

			let lastIndex = 0;
			let start = true;
			while (lastIndex !== gcode.length) {
				let index = gcode.lastIndexOf('\n', lastIndex + this.maxBatchSize);
				let batch = gcode.substring(lastIndex, index);

				let progress = await this.printer.progress();

				if (progress['buffered_lines'] + batch.length < this.maxBufferSize) {
					try {
						await this._sendBatch(batch, start);

						start = false;
						lastIndex = index + 1; //skip next \n
					}
					catch (error) {
						console.log('error while sending gcode', error);

						await sleep(this.fullBufferTimeout);
					}
				}
				else {
					await sleep(this.fullBufferTimeout);
				}
			}

			this.autoUpdate = autoUpdateState;

			resolve();
		});
	}

	async _update () {
		while (this.autoUpdate) {
			try {
				this.state = await this.info.status();

				this.dispatchEvent({
					type: 'update', 
					state: this.state
				});
			}
			catch (error) {
				await this.checkAlive();
			}

			await sleep(this.updateInterval);
		}
	}

	_sendBatch (gcode, index) {
		return new Promise (async (resolve, reject) => {
			try {
				let first = index === 0;
				let start = first;
				let printRequest = await this.printer.print(gcode, first, start);

				console.log(`batch sent: ${index}`, printRequest);
			}
			catch (error) {
				await sleep(1000);

				await this._sendBatch(gcode, index);
			}

			resolve();
		});
	}
}

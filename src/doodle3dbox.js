import EventDispatcher from 'casperlamboo/EventDispatcher';
import { sleep } from './utils.js';
import ConfigAPI from './api/config.js';
import InfoAPI from './api/info.js';
import NetworkAPI from './api/network.js';
import PrinterAPI from './api/printer.js';
import SketchAPI from './api/sketch.js';
import SystemAPI from './api/system.js';
import UpdateAPI from './api/update.js';

export default class Doodle3DBox extends EventDispatcher {
	constructor (boxData) {
		super();

		this.boxData = boxData;

		this.api = `http://${ boxData.localip }/d3dapi/`;

		this.alive = false;
		this.autoUpdate = false;
		this.state = {};

		this.maxBatchSize = 10 * 1024;
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
		if (this.autoUpdate === autoUpdate) return;

		this.autoUpdate = autoUpdate;
		if (autoUpdate) this._update();

		return this;
	}

	async checkAlive () {
		const alive = await this.network.alive();

		if (alive !== this.alive) {
			const type = alive ? 'connect' : 'disconnect';
			this.dispatchEvent({ type });
		}

		this.alive = alive;
		return alive;
	}

	async sendGCode (gcode) {
		const printerState = await this.printer.state();
		if (printerState.state !== 'idle') {
			throw `Cannot print, print state is ${ printerState.state }`;
		}

		if (!gcode.endsWith('\n')) {
			gcode += '\n';
		}

		let lastIndex = 0;
		let start = true;
		while (lastIndex !== gcode.length) {
			const index = gcode.lastIndexOf('\n', lastIndex + this.maxBatchSize);
			const batch = gcode.substring(lastIndex, index);

			// const progress = await this.printer.progress();

			await this._sendBatch(batch, start);

			start = false;
			lastIndex = index + 1; //skip next \n
		}
	}

	async _update () {
		while (this.autoUpdate) {
			if (this.alive) {
				try {
					this.state = await this.info.status();

					this.dispatchEvent({ type: 'update', state: this.state });
				} catch(error) {
					await this.checkAlive();
				}
			} else {
				await this.checkAlive();
			}

			await sleep(this.updateInterval);
		}
	}

	async _sendBatch (gcode, start) {
		try {
			const response = await this.printer.print(gcode, start, start);
			// maybe do something with failing response

			console.log(`batch sent: ${ index }`, printRequest);
		} catch(error) {
			await sleep(1000);

			await this._sendBatch(gcode, index);
		}
	}
}

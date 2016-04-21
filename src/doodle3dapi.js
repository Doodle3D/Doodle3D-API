import EventDispatcher from 'casperlamboo/EventDispatcher';
import ConfigAPI from './configapi.js';
import InfoAPI from './infoapi.js';
import NetworkAPI from './networkapi.js';
import PrinterAPI from './printerapi.js';
import SketchAPI from './sketchapi.js';
import SystemAPI from './systemapi.js';
import UpdateAPI from './updateapi.js';
import { sleep } from './utils.js';

export default class extends EventDispatcher {
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
			try {
				this.state = await this.info.status();

				this.dispatchEvent({ type: 'update', state: this.state });
			} catch(error) {
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

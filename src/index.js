import * as rest from './restapi.js';
import ConfigAPI from './configapi.js';
import InfoAPI from './infoapi.js';
import NetworkAPI from './networkapi.js';
import PrinterAPI from './printerapi.js';
import SketchAPI from './sketchapi.js';
import SystemAPI from './systemapi.js';
import UpdateAPI from './updateapi.js';

export default class {
	constructor (localIP) {
		this.config = new ConfigAPI(localIP);
		this.info = new InfoAPI(localIP);
		this.network = new NetworkAPI(localIP);
		this.printer = new PrinterAPI(localIP);
		this.sketch = new SketchAPI(localIP);
		this.system = new SystemAPI(localIP);
		this.update = new UpdateAPI(localIP);
		
		this.alive = false;

		this.batchSize = 512;
		this.maxBufferedLines = 4096;
		
		this.state = {};

		this._printBatches = [];
		this._currentBatch = 0;

		this.loaded = false;
	}

	startUpdateLoop () {

		this.network.alive().then(() => {

			this.alive = true;
			if (this.onconnect !== undefined) {
				this.onconnect();
			}

			if (!this.loaded) {
				this.loaded = true;
			}

			this._updateState();

		}).catch(() => {

			if (this.alive) {
				this.alive = false;

				if (this.ondisconnect !== undefined) {
					this.ondisconnect();
				}
			}
			console.warn(error);
			
			setTimeout(() => {
				this.startUpdateLoop();
			}, 1000);

		});

		return this;
	}

	print (gcode) {
		this._currentBatch = 0;

		gcode = gcode.split('\n');

		//split gcode in batches
		while (gcode.length > 0) {
			var gcodeBatch = gcode.splice(0, Math.min(this.batchSize, gcode.length));
			this._printBatches.push(gcodeBatch.join('\n'));
		}

		return this;
	}

	stopPrint (settings) {

		this._printBatches = [];
		this._currentBatch = 0;

		this.printer.stop({
			'gcode': settings.endCode()
		}).then((data) => {

			console.log('Printer stop command sent');
		}).catch((error) => {

			console.warn(error);
		});

		return this;
	}

	_updateLoop () {
		if (this._printBatches.length > 0 && (this.state['buffered_lines'] + this._printBatches[0].length) <= this.maxBufferedLines) {
		//if (this._printBatches.length > 0 ) {
			this._printBatch();
		}
		else {
			setTimeout(() => {
				this._updateState();
			}, 1000);
		}
	}

	_updateState () {
		//que api calls so they don't overload the d3d box

		this.info.status().then((data) => {
			this.state = data;

			if (this.onupdate !== undefined) {
				this.onupdate(data);
			}

			this._updateLoop();
		}).catch((error) => {

			console.warn(error);
			this.startUpdateLoop();
		});
	}

	_printBatch () {
		var gcode = this._printBatches.shift();

		this.printer.print({
			'start': ((this._currentBatch === 0) ? true : false), 
			'first': ((this._currentBatch === 0) ? true : false), 
			'gcode': gcode, 
			'last': ((this._printBatches.length === 0) ? true : false) //only for debug purposes
		}).then((data) => {

			console.log('batch sent: ' + this._currentBatch, data);

			if (this._printBatches.length > 0) {
				this._currentBatch ++;
			}
			else {
				console.log('Finish sending gcode to printer');
			}

			this._updateState();
		}).catch((error) => {
			
			this._printBatches.unshift(gcode);
				
			console.warn(error);
			this.startUpdateLoop();
		});
	}
}
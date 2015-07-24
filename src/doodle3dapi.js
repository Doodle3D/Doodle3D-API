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

		this.maxBatchSize = 10*1024;
		this.maxBufferedLines = 1024*1024;
		
		this.state = {};

		this._printBatches = [];
		this._currentBatch = 0;

		this.loaded = false;
	}

	setAutoUpdate (autoUpdate) {
		this.network.alive().then(() => {

			this.alive = true;

			this.dispatchEvent({
				type: 'connect'
			});

			if (!this.loaded) {
				this.loaded = true;
			}

			this._updateState();

		}).catch((error) => {
			if (this.alive) {
				this.alive = false;

				this.dispatchEvent({
					type: 'disconnect'
				});
			}
			
			setTimeout(() => {
				this.setAutoUpdate();
			}, 1000);

		});

		return this;
	}

	print (gcode) {
		this._currentBatch = 0;

		var lastIndex = 0;
		while (lastIndex !== (gcode.length - 1)) {
			var index = gcode.lastIndexOf('\n', lastIndex + maxBatchSize);
			var batch = gcode.substring(lastIndex, index);
			lastIndex = index;

			this.printBatches.push(batch);
		}

		return this;
	}

	stopPrint (endCode = '') {

		this._printBatches = [];
		this._currentBatch = 0;

		this.printer.stop(endCode).then((data) => {
			
			console.log('Printer stop command sent');
		
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

		this.info.status().then((state) => {

			this.state = state;

			this.dispatchEvent({
				type: 'update', 
				state
			});

			this._updateLoop();
		}).catch((error) => {

			console.warn(error);
			this.setAutoUpdate();
		
		});
	}

	_printBatch () {
		var gcode = this._printBatches.shift();
		var start = (this._currentBatch === 0) ? true : false;
		var first = (this._currentBatch === 0) ? true : false;
		var last = (this._printBatches.length === 0) ? true : false; //only for the node js server

		this.printer.print(gcode, start, first, last).then((data) => {
			console.log('batch sent: ' + this._currentBatch, data);

			if (this._printBatches.length > 0) {
				this._currentBatch ++;
			}
			else {
				console.log('Finish sending gcode to printer');
			}

			this._updateState();
		}).catch((error) => {
			console.warn(error);
			
			this._printBatches.unshift(gcode);
				
			this.setAutoUpdate();
		});
	}
}
import * as rest from './restapi.js';

export default class {
	constructor (api) {
		this.api = api;

		this._printBatches = [];
		this._currentBatch = 0;

		this.maxBatchSize = 10*1024;
		this.maxBufferedLines = 1024*1024;
		this.fullBufferTimeout = 10000;
	}

	temperature () {
		return rest.get(this.api + 'printer/temperature');
	}

	progress () {
		return rest.get(this.api + 'printer/progress');
	}

	state () {
		return rest.get(this.api + 'printer/state');
	}

	listAll () {
		return rest.get(this.api + 'printer/listall');
	}

	heatup () {
		return rest.post(this.api + 'printer/heatup', {});
	}

	sendGCode (gcode) {
		if (!gcode.endsWith('\n')) {
			gcode += '\n';
		}

		this._currentBatch = 0;

		var lastIndex = 0;
		while (lastIndex !== gcode.length) {
			var index = gcode.lastIndexOf('\n', lastIndex + this.maxBatchSize);
			var batch = gcode.substring(lastIndex, index);
			lastIndex = index + 1; //skip next return

			this._printBatches.push(batch);
		}

		this._sendBatch();
	}

	_sendBatch () {
		var gcode = this._printBatches.shift();
		var start = (this._currentBatch === 0) ? true : false;
		var first = (this._currentBatch === 0) ? true : false;
		var last = (this._printBatches.length === 0) ? true : false; //only for the node js server

		var printRequest = this.print(gcode, start, first, last);
		printRequest.then((data) => {

			console.log('batch sent: ' + this._currentBatch, data);

			var progressRequest = this.progress()
			progressRequest.then((progress) => {

				if (this._printBatches.length > 0) {
					if (progress['buffered_lines'] + this.maxBatchSize < this.maxBufferedLines) {
						this._currentBatch ++;
						this._sendBatch();
					}
					else {
						setTimeout(() => {
							this._sendBatch();
						}, this.fullBufferTimeout);
					}

				}
				else {
					console.log('Finish sending gcode to printer');
				}

			});
		});
		printRequest.catch((error) => {
			this._printBatches.unshift(gcode);

			setTimeout(() => {
				this._sendBatch();
			}, 1000);
		});
	}

	print (gcode = '', first = false, start = false, last = false) {
		var data = {gcode, first, start}
		if (last) data.last = last;

		return rest.post(this.api + 'printer/print', data);
	}

	stop (gcode = '') {
		this._currentBatch = 0;
		this._printBatches = [];

		return rest.post(this.api + 'printer/stop', {gcode});
	}
}
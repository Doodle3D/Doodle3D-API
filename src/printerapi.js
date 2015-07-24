import * as rest from './restapi.js';

export default class {
	constructor (api) {
		this.api = api;

		this._printBatches = [];
		this._currentBatch = 0;

		this.maxBatchSize = 10*1024;
		this.maxBufferedLines = 1024*1024; //yet to be implimented
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
		while (lastIndex !== (gcode.length - 1)) {
			var index = gcode.lastIndexOf('\n', lastIndex + this.maxBatchSize);
			var batch = gcode.substring(lastIndex, index);
			lastIndex = index;

			this._printBatches.push(batch);
		}

		this._sendBatch();
	}

	_sendBatch () {
		var gcode = this._printBatches.shift();
		var start = (this._currentBatch === 0) ? true : false;
		var first = (this._currentBatch === 0) ? true : false;
		var last = (this._printBatches.length === 0) ? true : false; //only for the node js server

		this.print(gcode, start, first, last).then((data) => {

			console.log('batch sent: ' + this._currentBatch, data);

			if (this._printBatches.length > 0) {
				this._currentBatch ++;
				_sendBatch();
			}
			else {
				console.log('Finish sending gcode to printer');
			}
		}).catch((error) => {
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
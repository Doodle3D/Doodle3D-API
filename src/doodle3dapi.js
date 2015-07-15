import rest from 'src/restapi';
import ConfigAPI from 'src/configapi';
import InfoAPI from 'src/infoapi';
import NetworkAPI from 'src/networkapi';
import PrinterAPI from 'src/printerapi';
import SketchAPI from 'src/sketchapi';
import SystemAPI from 'src/systemapi';
import UpdateAPI from 'src/updateapi';

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
		var scope = this;

		this.network.alive(function (error, data) {
			if (error) {
				if (scope.alive) {
					scope.alive = false;

					if (scope.ondisconnect !== undefined) {
						scope.ondisconnect();
					}
				}
				console.warn(error);
				
				setTimeout(function () {
					scope.startUpdateLoop();
				}, 1000);

				return;
			}

			scope.alive = true;
			if (scope.onconnect !== undefined) {
				scope.onconnect();
			}

			if (!scope.loaded) {
				scope.loaded = true;
			}

			scope._updateState();
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
		var scope = this;

		this._printBatches = [];
		this._currentBatch = 0;

		this.printer.stop({
			'gcode': settings.endCode()
		}, function (error, data) {
			if (error) {
				console.warn(error);
				scope.startUpdateLoop();

				return;
			}

			console.log('Printer stop command sent');
		});

		return this;
	}

	_updateLoop () {
		var scope = this;

		if (this._printBatches.length > 0 && (this.state['buffered_lines'] + this._printBatches[0].length) <= this.maxBufferedLines) {
		//if (this._printBatches.length > 0 ) {
			this._printBatch();
		}
		else {
			setTimeout(function () {
				scope._updateState();
			}, 1000);
		}
	}

	_updateState () {
		//que api calls so they don't overload the d3d box
		var scope = this;

		this.info.status(function (error, data) {
			if (error) {
				console.warn(error);
				scope.startUpdateLoop();

				return;
			}

			scope.state = data;

			if (scope.onupdate !== undefined) {
				scope.onupdate(data);
			}

			scope._updateLoop();
		});
	}

	_printBatch () {
		var scope = this;

		var gcode = this._printBatches.shift();

		this.printer.print({
			'start': ((this._currentBatch === 0) ? true : false), 
			'first': ((this._currentBatch === 0) ? true : false), 
			'gcode': gcode, 
			'last': ((this._printBatches.length === 0) ? true : false) //only for debug purposes
		}, function (error, data) {
			if (error) {
				scope._printBatches.unshift(gcode);
				
				console.warn(error);
				scope.startUpdateLoop();

				return;
			}

			console.log('batch sent: ' + scope._currentBatch, data);

			if (scope._printBatches.length > 0) {
				scope._currentBatch ++;
			}
			else {
				console.log('Finish sending gcode to printer');
			}

			scope._updateState();
		});
	}
}
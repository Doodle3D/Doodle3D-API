import {Doodle3DManager} from 'src/index.js';

const doodle3DManager = new Doodle3DManager();
const TABLE = document.getElementById('table');

doodle3DManager.addEventListener('boxappeared', ({box}) => {
	let row = document.createElement('tr');
	row.id = box.boxData.wifiboxid;
	row.style.color = 'black';

	let id = document.createElement('td');
	let state = document.createElement('td');
	let localIP = document.createElement('td');
	let bed = document.createElement('td');
	let bedTarget = document.createElement('td');
	let bufferedLines = document.createElement('td');
	let currentLine = document.createElement('td');
	let hasControl = document.createElement('td');
	let hotend = document.createElement('td');
	let hotendTarget = document.createElement('td');
	let totalLines = document.createElement('td');

	row.appendChild(id);
	row.appendChild(localIP);
	row.appendChild(state);
	row.appendChild(currentLine);
	row.appendChild(bufferedLines);
	row.appendChild(totalLines);
	row.appendChild(hotend);
	row.appendChild(hotendTarget);
	row.appendChild(bed);
	row.appendChild(bedTarget);
	row.appendChild(hasControl);

	id.innerHTML = box.boxData.wifiboxid;
	localIP.innerHTML = box.boxData.localip;

	TABLE.appendChild(row);

	function update ({state: data}) {
		state.innerHTML = data.state;

		if (data.state !== 'disconnected' && data.state !== 'connecting' && data.state !== 'unknown') {
			bed.innerHTML = data.bed;
			bedTarget.innerHTML = data.bed_target;
			bufferedLines.innerHTML = data.buffered_lines;
			currentLine.innerHTML = data.current_line;
			hasControl.innerHTML = data.has_control;
			hotend.innerHTML = data.hotend;
			hotendTarget.innerHTML = data.hotend_target;
			state.innerHTML = data.state;
			totalLines.innerHTML = data.total_lines;
		}
		else {
			bed.innerHTML = '';
			bedTarget.innerHTML = '';
			bufferedLines.innerHTML = '';
			currentLine.innerHTML = '';
			hasControl.innerHTML = '';
			hotend.innerHTML = '';
			hotendTarget.innerHTML = '';
			totalLines.innerHTML = '';
		}
	}

	if (box.alive) {
		box.addEventListener('update', update);
	}

	box.addEventListener('connect', (event) => {
		row.style.color = 'black';

		box.addEventListener('update', update);
	});

	box.addEventListener('disconnect', (event) => {
		row.style.color = 'gray';

		box.removeEventListener('update', update);
	});

	box.setAutoUpdate(true, 1000);
});

doodle3DManager.addEventListener('boxdisappeared', ({box}) => {
	let row = document.getElementById(box.boxData.wifiboxid);
	TABLE.removeChild(row);
});

doodle3DManager.setAutoUpdate(true, 1000);

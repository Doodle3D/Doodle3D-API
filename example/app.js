import Doodle3DManager from 'src/doodle3dmanager.js';

var doodle3DManager = new Doodle3DManager();

doodle3DManager.addEventListener('boxappeared', (event) => {
	var box = event.box;

	var row = document.createElement('tr');
	row.style.color = 'gray';

	var id = document.createElement('td');
	var state = document.createElement('td');
	var localIP = document.createElement('td');
	var bed = document.createElement('td');
	var bedTarget = document.createElement('td');
	var bufferedLines = document.createElement('td');
	var currentLine = document.createElement('td');
	var hasControl = document.createElement('td');
	var hotend = document.createElement('td');
	var hotendTarget = document.createElement('td');
	var totalLines = document.createElement('td');

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

	document.getElementById('table').appendChild(row);

	box.addEventListener('connect', (event) => {
		row.style.color = 'black';
	});

	box.addEventListener('disconnect', (event) => {
		row.style.color = 'gray';
	});

	box.addEventListener('update', (event) => {
		var status = event.state;

		state.innerHTML = status.state;
		if (status.state !== 'disconnected' && status.state !== 'connecting' && status.state !== 'unknown') {
			bed.innerHTML = status.bed;
			bedTarget.innerHTML = status.bed_target;
			bufferedLines.innerHTML = status.buffered_lines;
			currentLine.innerHTML = status.current_line;
			hasControl.innerHTML = status.has_control;
			hotend.innerHTML = status.hotend;
			hotendTarget.innerHTML = status.hotend_target;
			state.innerHTML = status.state;
			totalLines.innerHTML = status.total_lines;
		}
		else {
			bed.innerHTML = '';
			bedTarget.innerHTML = '';
			bufferedLines.innerHTML = '';
			currentLine.innerHTML = '';
			hasControl.innerHTML = '';
			hotend.innerHTML = '';
			hotendTarget.innerHTML = '';
			state.innerHTML = '';
			totalLines.innerHTML = '';
		}
	});

	box.setAutoUpdate(true);
});

doodle3DManager.setAutoUpdate(true);

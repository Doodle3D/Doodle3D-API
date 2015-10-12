import Doodle3DManager from 'src/doodle3dmanager.js';

let list = document.getElementById('list');

let doodle3DManager = new Doodle3DManager();

doodle3DManager.addEventListener('boxappeared', async (event) => {
	let box = event.box;

	var row = document.createElement('tr');
	row.style.color = 'black';

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

	function update (event) {
		let data = event.state;
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
	};

	box.setAutoUpdate(true, 1000);

	function update (event) {
		console.log(event);
	}

	box.addEventListener('update', update);

	box.addEventListener('disconnect', (event) => {
		box.removeEventListener('update', update);
	});
});

doodle3DManager.addEventListener('boxdisappeared', (event) => {
	let box = event.box;

	for (let node of list.children) {
		if (node.innerHTML === box.boxData.wifiboxid) {
			list.removeChild(node);
			break;
		}
	}
});

doodle3DManager.setAutoUpdate(true, 1000);

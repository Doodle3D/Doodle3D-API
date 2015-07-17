import Doodle3DAPI from 'doodle3d-API';
import rest from 'rest-API';

var api = 'http://connect.doodle3d.com/api/';
var known = [];

function addBox (boxData) {

	if (known.indexOf(boxData.localip) === -1) {
		known.push(boxData.localip);

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

		id.innerHTML = boxData.wifiboxid;
		localIP.innerHTML = boxData.localip;

		document.getElementById('table').appendChild(row);

		var doodle3DAPI = new Doodle3DAPI(boxData.localip);
		doodle3DAPI.onconnect = function () {
			row.style.color = 'black';
		};
		doodle3DAPI.ondisconnect = function () {
			row.style.color = 'gray';
		};
		doodle3DAPI.onupdate = function (data) {
			console.log(data);
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
			}
		};
		doodle3DAPI.startUpdateLoop();
	}
}

function searchBoxes () {
	rest.get(api + 'list.php', function (error, boxes) {
		if (error) {
			return;
			console.warn(error);
		}

		for (var i = 0; i < boxes.length; i ++) {
			var box = boxes[i];

			addBox(box);
		}
	});
}

setInterval(searchBoxes, 5000);
searchBoxes();

addBox({
	localip: window.location.host + ':3000', 
	wifiboxid: 'Node Server'
});

addBox({
	localip: '192.168.5.1', 
	wifiboxid: 'Wired Printer'
});
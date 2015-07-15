import $ from 'jquery';
import Doodle3DAPI from '../src/doodle3dapi';
import rest from '../src/restapi';

var api = "http://connect.doodle3d.com/api/";

function addBox (boxData) {

	var row = document.createElement('tr');
	row.style.color = "gray";

	var id = document.createElement('td');
	var localIP = document.createElement('td');
	var bed = document.createElement('td');
	var bedTarget = document.createElement('td');
	var bufferedLines = document.createElement('td');
	var currentLine = document.createElement('td');
	var hasControl = document.createElement('td');
	var hotend = document.createElement('td');
	var hotendTarget = document.createElement('td');
	var state = document.createElement('td');
	var totalLines = document.createElement('td');

	row.appendChild(id);
	row.appendChild(localIP);
	row.appendChild(bed);
	row.appendChild(bedTarget);
	row.appendChild(bufferedLines);
	row.appendChild(currentLine);
	row.appendChild(hasControl);
	row.appendChild(hotend);
	row.appendChild(hotendTarget);
	row.appendChild(state);
	row.appendChild(totalLines);

	id.innerHTML = boxData.wifiboxid;
	localIP.innerHTML = boxData.localip;

	document.getElementById("table").appendChild(row);

	var doodle3DAPI = new Doodle3DAPI(boxData.localip);
	doodle3DAPI.onconnect = function () {
		row.style.color = "black";
	};
	doodle3DAPI.ondisconnect = function () {
		row.style.color = "gray";
	};
	doodle3DAPI.onupdate = function (data) {
		state.innerHTML = data.state;
		if (data.state === "idle") {
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

rest.get(api + "list.php", function (error, boxes) {
	if (error) {
		return;
		console.warn(error);
	}

	for (var i = 0; i < boxes.length; i ++) {
		var box = boxes[i];

		addBox(box);
	}
});

addBox({
	localip: "192.168.5.1", 
	wifiboxid: "Wired Printer"
});
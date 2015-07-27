import Doodle3DManager from 'src/doodle3dmanager.js';

var list = document.getElementById('list');

var doodle3DManager = new Doodle3DManager();

doodle3DManager.addEventListener('boxappeared', (event) => {
	var box = event.box;

	var node = document.createElement('li');
	node.innerHTML = box.boxData.wifiboxid;
	list.appendChild(node);
});

doodle3DManager.addEventListener('boxdisappeared', (event) => {
	var box = event.box;

	for (var node of list.children) {
		if (node.innerHTML === box.boxData.wifiboxid) {
			list.removeChild(node);
			break;
		}
	}
});

doodle3DManager.setAutoUpdate(true);

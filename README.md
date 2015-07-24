# Doodle3D-API
Doodle3D API for communication with the Doodle3D WiFi-Box

```javascript
import Doodle3DManager from 'src/doodle3dmanager.js';

var doodle3DManager = new Doodle3DManager();

doodle3DManager.addEventListener('boxappeared', (event) => {
	var box = event.box;

	box.addEventListener('connect', (event) => {
	});

	box.addEventListener('disconnect', (event) => {
	});

	box.addEventListener('update', (event) => {
		var status = event.state;
	});

	box.setAutoUpdate(true);
});

doodle3DManager.setAutoUpdate(true);

```

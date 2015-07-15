# Doodle3D-API
Doodle3D API for communication with the Doodle3D WiFi-Box

```javascript
import Doodle3DAPI from 'doodle3dapi';

var doodle3DAPI = new Doodle3DAPI(boxData.localip);
doodle3DAPI.onconnect = function () {

};
doodle3DAPI.ondisconnect = function () {

};
doodle3DAPI.onupdate = function (data) {

};
doodle3DAPI.startUpdateLoop();
```

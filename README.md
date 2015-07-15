# Doodle3D-API
Doodle3D API for communication with the Doodle3D WiFi-Box

```javascript
import Doodle3DAPI from 'doodle3dapi';

var localIP = "192.168.5.1";
var doodle3DAPI = new Doodle3DAPI(localIP);
doodle3DAPI.onconnect = function () {

};
doodle3DAPI.ondisconnect = function () {

};
doodle3DAPI.onupdate = function (data) {

};
doodle3DAPI.startUpdateLoop();
```

# Doodle3D-API
Doodle3D API for communication with the Doodle3D WiFi-Box

```javascript
import { Doodle3DManager } from 'Doodle3D/Doodle3D-API';

const doodle3DManager = new Doodle3DManager();

doodle3DManager.addEventListener('boxappeared', ({box}) => {
  box.addEventListener('connect', (event) => {
  });

  box.addEventListener('disconnect', (event) => {
  });

  box.addEventListener('update', (event) => {
    const status = event.state;
  });

  box.setAutoUpdate(true, 1000);
});

doodle3DManager.setAutoUpdate(true, 1000);

```

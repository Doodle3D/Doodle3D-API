import * as rest from './rest.js';
import Doodle3DBox from './doodle3dbox.js';
import EventDispatcher from 'casperlamboo/EventDispatcher';
import { sleep } from './utils.js';

export default class Doodle3DManager extends EventDispatcher {
  constructor() {
    super();

    this.api = 'http://connect.doodle3d.com/api/';

    this.boxes = [];

    this.nonServerBoxes = [{
      wifiboxid: 'Wired Printer',
      localip: '192.168.5.1'
    }/*, {
      wifiboxid: 'Node JS Server',
      localip: '127.0.0.1:3000'
    }*/];
    this.checkNonServerBoxes = false;

    this.autoUpdate = false;
  }
  setAutoUpdate(autoUpdate = true, updateInterval = 1000) {
    this.updateInterval = updateInterval;
    if (this.autoUpdate === autoUpdate) return;

    this.autoUpdate = autoUpdate;
    if (autoUpdate) this._update();

    return this;
  }
  async _update() {
    while (this.autoUpdate) {
      await this._checkNew();

      await sleep(this.updateInterval);
    }
  }
  async _checkNew() {
    let boxes;
    try {
      boxes = await rest.get(`${ this.api }list.php`);
    } catch(error) {
      console.warn('fail connecting to Doodle3D server');
      return;
    }

    if (this.checkNonServerBoxes) boxes = boxes.concat(this.nonServerBoxes);

    const knownIPsClient = this.boxes.map(box => box.boxData.localip);
    const knownIPsServer = boxes.map(box => box.localip);

    const newBoxes = boxes.filter(box => knownIPsClient.indexOf(box.localip) === -1);
    const removedBoxes = this.boxes.filter(box => knownIPsServer.indexOf(box.boxData.localip) === -1);

    let changed = false;
    for (const boxData of newBoxes) {
      const box = new Doodle3DBox(boxData);
      this._addBox(box);

      changed = true;
    }

    for (const box of removedBoxes) {
      this._removeBox(box);

      changed = true;
    }

    if (changed) {
      this.dispatchEvent({ type: 'boxeschanged', boxes: this.boxes });
    }
  }
  _addBox(box) {
    this.boxes.push(box);

    this.dispatchEvent({ type: 'boxappeared', box });
  }
  _removeBox(box) {
    const index = this.boxes.indexOf(box);
    if (index !== -1) {
      this.boxes.splice(index, 1);
      this.dispatchEvent({ type: 'boxdisappeared', box });
    }
  }
}

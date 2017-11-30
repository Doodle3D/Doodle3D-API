import React from 'react';
import { render } from 'react-dom';
import { Doodle3DManager } from './src/index.js';

class Mananger extends React.Component {
  state = {
    boxes: []
  };

  componentDidMount() {
    const doodle3DManager = new Doodle3DManager();
    doodle3DManager.checkNonServerBoxes = false;
    doodle3DManager.setAutoUpdate(true, 1000);
    doodle3DManager.addEventListener('boxeschanged', ({ boxes }) => {
      this.setState({ boxes });
    })
  }

  render = () => {
    const { boxes } = this.state;
    return (<ul>
      {boxes.map((box) => <li key={box.boxData.wifiboxid}>{box.boxData.wifiboxid}</li>)}
    </ul>);
  };
}

render(<Mananger />, document.getElementById('app'));

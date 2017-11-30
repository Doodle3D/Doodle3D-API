import React from 'react';
import { render } from 'react-dom';
import { Doodle3DManager } from './src/index.js';

class Box extends React.Component {
  state = {
    status: {}
  };

  componentWillMount() {
    const { box } = this.props;
    box.setAutoUpdate(true, 1000);

    box.addEventListener('update', ({ state }) => {
      this.setState({ status: state });
    });
  }

  componentWillUnMount() {
    const { box } = this.props;
    box.setAutoUpdate(false);
  }

  render() {
    return (
      <div>
        <p><b>name: {this.props.box.boxData.wifiboxid}</b></p>
        <ul>
          {Object.entries(this.state.status).map(([key, value]) => <li key={key}>{key}: {value}</li>)}
        </ul>
      </div>
    );
  };
}

class OverView extends React.Component {
  state = {
    boxes: []
  };

  componentWillMount() {
    const doodle3DManager = new Doodle3DManager();
    doodle3DManager.checkNonServerBoxes = false;
    doodle3DManager.setAutoUpdate(true, 1000);

    doodle3DManager.addEventListener('boxappeared', ({ box }) => {
      this.setState({ boxes: [...this.state.boxes, <Box box={box} />] })
    });

    doodle3DManager.addEventListener('boxdisappeared', ({ box }) => {
      this.setState({ boxes: this.state.boxes.filter(box => box.props.box.boxData.id !== box.boxData.id) })
    });

    this.setState({ doodle3DManager })
  }

  componentWillUnMount() {
    const { doodle3DManager } = this.state;
    if (doodle3DManager) doodle3DManager.setAutoUpdate(false);
  }

  render() {
    const { boxes } = this.state;
    return (
      <div>
        {boxes.map((box, i) => <span key={i}>{box}</span>)}
      </div>
    );
  };
}

render(<OverView />, document.getElementById('app'));

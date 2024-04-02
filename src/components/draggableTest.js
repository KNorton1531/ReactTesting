import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import AmbientSoundController from './ambientSoundController';

class App extends Component {
  constructor(props) {
    super(props);

    const storageKey = `position_${this.props.id}`;
    const savedPosition = JSON.parse(localStorage.getItem(storageKey)) || { x: 0, y: 0 };

    this.state = {
      position: savedPosition,
      bounds: { left: 0, top: 0, right: 0, bottom: 0 },
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.updateBounds(); // Initialize bounds and adjust position if necessary
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.updateBounds();
  };

  updateBounds = () => {
    const pageWrapper = document.querySelector('.pageWrapper');
    if (pageWrapper) {
      const { offsetWidth, offsetHeight } = pageWrapper;
      const newBounds = {
        left: 0,
        top: 0,
        right: offsetWidth - 257, // Assuming the draggable element is 100px wide
        bottom: offsetHeight - 327, // Assuming the draggable element is 100px tall
      };
      this.setState({ bounds: newBounds }, this.adjustPositionWithinBounds);
    }
  };

  adjustPositionWithinBounds = () => {
    const { position, bounds } = this.state;
    const newPosition = { ...position };

    // Adjust the position to ensure the element remains within the new bounds
    if (position.x < bounds.left) newPosition.x = bounds.left;
    if (position.y < bounds.top) newPosition.y = bounds.top;
    if (position.x > bounds.right) newPosition.x = bounds.right;
    if (position.y > bounds.bottom) newPosition.y = bounds.bottom;

    if (newPosition.x !== position.x || newPosition.y !== position.y) {
      this.setState({ position: newPosition });
      const storageKey = `position_${this.props.id}`;
      localStorage.setItem(storageKey, JSON.stringify(newPosition));
    }
  };

  handleStop = (e, data) => {
    const position = { x: data.x, y: data.y };
    this.setState({ position });

    const storageKey = `position_${this.props.id}`;
    localStorage.setItem(storageKey, JSON.stringify(position));
  };

  render() {
    return (
      <Draggable
        position={this.state.position}
        onStop={this.handleStop}
        bounds={this.state.bounds}
        handle={'.draggableHandle'}>
        <div id='first' style={{ borderRadius: '5px', backgroundColor: 'rgb(0 0 0 / 85%)', position: 'absolute', color: 'white', border: '1px solid rgb(175 175 175)'}}>
          <div className="draggableHandle">Ambience mixer - Drag here</div>
          <AmbientSoundController />
        </div>
      </Draggable>
    );
  }
}

export default App;

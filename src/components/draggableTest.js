import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import AmbientSoundController from './ambientSoundController';

class App extends React.Component {
    constructor(props) {
      super(props);
  
      // Prefix the localStorage key with the unique ID to differentiate between instances
      const storageKey = `position_${this.props.id}`;
      const savedPosition = JSON.parse(localStorage.getItem(storageKey)) || { x: 0, y: 0 };

      console.log('Public URL:', process.env.PUBLIC_URL);
  
      this.state = {
        position: savedPosition,
      };
    }
  
    handleStop = (e, data) => {
      const position = { x: data.x, y: data.y };
      this.setState({ position });

      // Again, use the unique ID to save the specific position for this component
      const storageKey = `position_${this.props.id}`;
      localStorage.setItem(storageKey, JSON.stringify(position));
    };
  
    render() {
      return (
        <Draggable
          position={this.state.position} // Changed from defaultPosition to position
          onStop={this.handleStop}
          bounds={'.pageWrapper'}
          grid={[25, 25]}
          >
          <div id='first' style={{ backgroundColor: 'blue', position: 'absolute', color: 'white', padding: '10px', cursor: 'move' }}>
            First Draggable
          <AmbientSoundController />
          </div>
        </Draggable>
      );
    }
  }
  

export default App;

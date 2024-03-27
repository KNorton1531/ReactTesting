import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class App extends React.Component {
    constructor(props) {
      super(props);
  
      // Prefix the localStorage key with the unique ID to differentiate between instances
      const storageKey = `position_${this.props.id}`;
      const savedPosition = JSON.parse(localStorage.getItem(storageKey)) || { x: 0, y: 0 };
  
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
          <div id='second' style={{ width: '100px', height: '100px', backgroundColor: 'blue', position: 'absolute', color: 'white', padding: '10px', cursor: 'move' }}>
            Second Draggable
          </div>
        </Draggable>
      );
    }
  }
  

export default App;

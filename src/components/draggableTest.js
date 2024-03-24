import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';

class App extends React.Component {
  constructor(props) {
    super(props);

    // Retrieve the saved position from local storage, if available
    const savedPosition = JSON.parse(localStorage.getItem('position')) || {x: 0, y: 0};

    this.state = {
      position: savedPosition,
    };
  }

  // This function is called whenever the drag stops
  handleStop = (e, data) => {
    const position = { x: data.x, y: data.y };
    // Update the state with the new position
    this.setState({ position });
    // Save the new position to local storage
    localStorage.setItem('position', JSON.stringify(position));
  };

  render() {
    return (
   
        <Draggable
          defaultPosition={this.state.position}
          onStop={this.handleStop}>
          <div style={{ width: '100px', height: '100px', backgroundColor: 'blue', position: 'absolute', color: 'white', padding: '10px', cursor: 'move' }}>
            Draggable
          </div>
        </Draggable>
        

    );
  }
}

export default App;

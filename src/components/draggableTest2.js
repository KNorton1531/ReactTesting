import React from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import '../css/effects.css';
import ReactRain from 'react-rain-animation';
import 'react-rain-animation/lib/style.css'; // Import the CSS for ReactRain
import Snowfall from 'react-snowfall';

class App extends React.Component {
    constructor(props) {
      super(props);
  
      const storageKey = `position_${this.props.id}`;
      const savedPosition = JSON.parse(localStorage.getItem(storageKey)) || { x: 0, y: 0 };
  
      this.state = {
        position: savedPosition,
        bounds: { left: 0, top: 0, right: 0, bottom: 0 },
        isRaining: false,
        rainIntensity: '', // Possible values: '', 'light', 'normal', 'heavy'
        isSnowing: false,
        snowIntensity: '' // Possible values: '', 'light', 'normal', 'heavy'

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
          right: offsetWidth - 320, // Assuming the draggable element is 100px wide
          bottom: offsetHeight - 303, // Assuming the draggable element is 100px tall
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

    toggleRain = (intensity) => {
      this.setState(prevState => ({
        isRaining: !(prevState.isRaining && prevState.rainIntensity === intensity),
        rainIntensity: prevState.isRaining && prevState.rainIntensity === intensity ? '' : intensity,
        isSnowing: false, // Ensure snow is toggled off when toggling rain
        snowIntensity: ''
      }));
    };

    toggleSnow = (intensity) => {
      this.setState(prevState => ({
        isSnowing: !(prevState.isSnowing && prevState.snowIntensity === intensity),
        snowIntensity: prevState.isSnowing && prevState.snowIntensity === intensity ? '' : intensity,
        isRaining: false, // Ensure rain is toggled off when toggling snow
        rainIntensity: ''
      }));
    };

    renderButton(intensity, label, type = 'rain') {
      const isActive = (type === 'rain' ? this.state.isRaining && this.state.rainIntensity : this.state.isSnowing && this.state.snowIntensity) === intensity;
      const handleClick = type === 'rain' ? () => this.toggleRain(intensity) : () => this.toggleSnow(intensity);
      return (
        <button className={isActive ? 'active' : ''} onClick={handleClick}>
          {label}
        </button>
      );
    }
  
    render() {
      return (
        <div className='effectsLayer'>
          <Draggable
            position={this.state.position}
            onStop={this.handleStop}
            bounds={this.state.bounds}
            handle={'.draggableHandle'}>
            <div id='second' className='effectsWrapper'>
              <div className="draggableHandle">Environment Effects</div>
                <div className='effectCategories'>
                  <h3>Rain</h3>
                  <div className='rainButtons'>
                    {this.renderButton('light', 'Light Rain', 'rain')}
                    {this.renderButton('normal', 'Normal Rain', 'rain')}
                    {this.renderButton('heavy', 'Heavy Rain', 'rain')}
                  </div>

                  <h3>Snow</h3>
                  <div className='rainButtons'>
                    {this.renderButton('light', 'Light Snow', 'snow')}
                    {this.renderButton('normal', 'Normal Snow', 'snow')}
                    {this.renderButton('heavy', 'Heavy Snow', 'snow')}
                  </div>
                </div>
            </div>
          </Draggable>
          {this.state.isRaining && <ReactRain numDrops={this.getRainDrops()} />} 
          {this.state.isSnowing && <Snowfall radius={[0.5, 1]} snowflakeCount={this.getSnowflakes()} />}
        </div>
      );
    }

    getRainDrops() {
      switch (this.state.rainIntensity) {
        case 'light': return 50;
        case 'normal': return 100;
        case 'heavy': return 300;
        default: return 0;
      }
    }

    getSnowflakes() {
      switch (this.state.snowIntensity) {
        case 'light': return 50;
        case 'normal': return 100;
        case 'heavy': return 300;
        default: return 0;
      }
    }
}

export default App;

import React from 'react';
import Draggable from 'react-draggable';
import '../css/effects.css';
import ReactRain from 'react-rain-animation';
import 'react-rain-animation/lib/style.css'; // Import the CSS for ReactRain
import Snowfall from 'react-snowfall';
import { FaRegSnowflake } from "react-icons/fa";
import { IoRainyOutline } from "react-icons/io5";

class App extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isRaining: false,
            rainIntensity: '', // Possible values: '', 'light', 'normal', 'heavy'
            isSnowing: false,
            snowIntensity: '', // Possible values: '', 'light', 'normal', 'heavy'
            isHovered: false // Hover state
        };

        this.hoverTimeout = null;
    }

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

    handleMouseEnter = () => {
        // Set the hover state to true when mouse enters
        clearTimeout(this.hoverTimeout); // Clear previous timeout, if any
        this.setState({ isHovered: true });
    };

    handleMouseLeave = () => {
        // Set the hover state to false after 3 seconds
        this.hoverTimeout = setTimeout(() => {
            this.setState({ isHovered: false });
        }, 1000);
    };
  
    render() {
        const { isHovered } = this.state;
        return (
            <div className="effectsLayer">
                <div id='second' className={`effectsWrapper ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}>
                    <div className='effectCategories'>
                        <div className='rainButtons'>
                            {this.renderButton('heavy', <IoRainyOutline />, 'rain')}
                        </div>

                        <div className='rainButtons'>
                            {this.renderButton('heavy', <FaRegSnowflake />, 'snow')}
                        </div>
                    </div>
                </div>

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

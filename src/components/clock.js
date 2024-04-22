import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import moment from 'moment';
import '../css/clock.css';
import { FiSettings } from 'react-icons/fi'; // Settings icon from react-icons

function Clock({ id }) {
    const [showSettingsIcon, setShowSettingsIcon] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const settingsIconTimeoutRef = useRef();

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        setShowSettingsIcon(true); // Ensure icon stays visible when settings are open
    };

    const handleMouseEnter = () => {
        clearTimeout(settingsIconTimeoutRef.current);
        setShowSettingsIcon(true);
    };

    const handleMouseLeave = () => {
        if (!showSettings) { // Only set the timeout to hide the icon if settings are not open
            settingsIconTimeoutRef.current = setTimeout(() => {
                setShowSettingsIcon(false);
            }, 1000); // Delay of 2 seconds
        }
    };

    const storedBackground = localStorage.getItem('clockBackgroundStyle') || '#000000d9';
    const [backgroundStyle, setBackgroundStyle] = useState(storedBackground);
    const storedTextColor = localStorage.getItem('clocktextColorStyle') || '#fff';
    const [textColor, setTextColor] = useState(storedTextColor);

    const playerWidth = 640; // Set the width of the YouTube player
    const playerHeight = 390; // Set the height of the YouTube player

    const getCenteredPosition = () => {
        const x = (window.innerWidth - playerWidth) / 2;
        const y = (window.innerHeight - playerHeight) / 2;
        return { x, y };
    };

    const storageKey = `position_${id}`;
    const savedPosition = JSON.parse(localStorage.getItem(storageKey));
    const initialPosition = savedPosition || getCenteredPosition();
    const [position, setPosition] = useState(initialPosition);

    const [currentTime, setCurrentTime] = useState(moment());
    useEffect(() => {
      const timer = setInterval(() => setCurrentTime(moment()), 1000);
      return () => clearInterval(timer);
    }, []);

    const handleStop = (e, data) => {
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        localStorage.setItem(storageKey, JSON.stringify(newPosition));
    };

    const changeBackground = (style) => {
        setBackgroundStyle(style);
        localStorage.setItem('clockBackgroundStyle', style); // Store the background style in local storage
    };

    const changeTextColor = (color) => {
        setTextColor(color);
        localStorage.setItem('clocktextColorStyle', color); // Save text color to local storage
    };

    return (
        <Draggable position={position} onStop={handleStop} bounds="parent" handle={'.clockWrapper'}>
            <div className='clockWrapper' id='Clock' style={{ background: backgroundStyle, color: textColor }}
                onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <p>{currentTime.format('h:mm A')}</p>
                {showSettingsIcon && (
                    <FiSettings onClick={toggleSettings} style={{ cursor: 'pointer'}} />
                )}
                
                {showSettings && (
                    <div className='settingsContainer' style={{ top: '40px', left: '-1px', width: '199px', height: '500px', position: 'absolute', zIndex: 100, backgroundColor: '#f0f0f0', border: '1px solid #ccc' }}>
                        <div className="colourOptions">
                                <button style={{backgroundColor: `#000000fa`}} onClick={() => {changeBackground('#000000d9'); changeTextColor('#fff')}}></button>
                                <button style={{backgroundColor: `#f8f9fa`}} onClick={() => {changeBackground('#f8f9faEd'); changeTextColor('#242424')}}></button>
                                <button style={{backgroundColor: `#5B616A`}}  onClick={() => {changeBackground('#5B616AED'); changeTextColor('#fff')}}></button>
                                <button style={{backgroundColor: `#57C2A8`}}  onClick={() => {changeBackground('#57C2A8ed'); changeTextColor('#fff')}}></button>
                                <button style={{backgroundColor: `#ffba49`}}  onClick={() => {changeBackground('#ffba49ed'); changeTextColor('#fff')}}></button>
                                <button style={{backgroundColor: `#00B3D7`}}  onClick={() => {changeBackground('#00B3D7ed'); changeTextColor('#fff')}}></button>
                                <button style={{backgroundColor: `#a06cd5`}}  onClick={() => {changeBackground('#a06cd5ed'); changeTextColor('#fff')}}></button>
                                <button style={{backgroundColor: `#ba1b1d`}}  onClick={() => {changeBackground('#ba1b1ded'); changeTextColor('#fff')}}></button>
                            </div>
                    </div>
                )}
            </div>
        </Draggable>
    );
}

export default Clock;

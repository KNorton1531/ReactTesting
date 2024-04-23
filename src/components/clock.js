import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import moment from 'moment';
import '../css/clock.css';
import { FiSettings } from 'react-icons/fi'; // Settings icon from react-icons
import { IoCloseOutline } from "react-icons/io5";
import { useDrawer } from './DrawerContext';
import GeoCodeFromLocation from './geocode';

function Clock({ id }) {
    const fontSizes = {
        1: '1rem',    // Small
        2: '2rem',    // Medium
        3: '3rem',    // Large
        4: '4rem'     // Massive
    };

    const [showSettingsIcon, setShowSettingsIcon] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const settingsIconTimeoutRef = useRef();

    const [fontSize, setFontSize] = useState(localStorage.getItem('clockFontSize') || '24px');
    const [backgroundStyle, setBackgroundStyle] = useState(localStorage.getItem('clockBackgroundStyle') || '#000000d9');
    const [textColor, setTextColor] = useState(localStorage.getItem('clocktextColorStyle') || '#fff');

    const { openDrawer } = useDrawer();

    const handleOpenSettings = () => {
        const settingsContent =  <GeoCodeFromLocation></GeoCodeFromLocation>;
        openDrawer(settingsContent);
    };

    useEffect(() => {
      const timer = setInterval(() => setCurrentTime(moment()), 1000);
      return () => clearInterval(timer);
    }, []);

    const toggleSettings = () => {
        setShowSettings(!showSettings);
        setShowSettingsIcon(true);
    };

    const handleMouseEnter = () => {
        clearTimeout(settingsIconTimeoutRef.current);
        setShowSettingsIcon(true);
    };

    const handleMouseLeave = () => {
        if (!showSettings) {
            settingsIconTimeoutRef.current = setTimeout(() => setShowSettingsIcon(false), 500);
        }
    };

    const changeFontSize = (fontSize) => {
        setFontSize(fontSize);
        localStorage.setItem('clockFontSize', fontSize);
    };

    const changeBackground = (style) => {
        setBackgroundStyle(style);
        localStorage.setItem('clockBackgroundStyle', style);
    };

    const changeTextColor = (color) => {
        setTextColor(color);
        localStorage.setItem('clocktextColorStyle', color);
    };

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

    return (
        <>
        <Draggable position={position} onStop={handleStop} bounds="parent" handle={'.clockWrapper'} cancel={'.fontOptions'}>
            <div className='clockWrapper' id='Clock' style={{ background: backgroundStyle, color: textColor }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <p style={{ fontSize: fontSize}}>{currentTime.format('h:mm A')}</p>
                {showSettingsIcon && (
                    <div className='settingsHoverContainer'>
                        <FiSettings onClick={toggleSettings} style={{ cursor: 'pointer', color: '#fff'}} />
                    </div>
                )}
            </div>
        </Draggable>

            {showSettings && (
                <div className='settingsContainer'>
                    <div className='exampleClockContainer' style={{ background: backgroundStyle, color: textColor,}}>
                        <p>{currentTime.format('h:mm A')}</p>
                    </div>
                    <IoCloseOutline className='clockCloseSettings' onClick={toggleSettings} style={{ cursor: 'pointer', color: '#fff'}} />
                        <div className="colourOptions">
                            <button className='noBackgroundCircle' onClick={() => {changeBackground('#00000000'); changeTextColor('#fff')}}></button>
                            <button style={{backgroundColor: `#000000fa`}} onClick={() => {changeBackground('#000000d9'); changeTextColor('#fff')}}></button>
                            <button style={{backgroundColor: `#f8f9fa`}} onClick={() => {changeBackground('#f8f9faEd'); changeTextColor('#242424')}}></button>
                            <button style={{backgroundColor: `#5B616A`}}  onClick={() => {changeBackground('#5B616AED'); changeTextColor('#fff')}}></button>
                            <button style={{backgroundColor: `#57C2A8`}}  onClick={() => {changeBackground('#57C2A8ed'); changeTextColor('#fff')}}></button>
                            <button style={{backgroundColor: `#ffba49`}}  onClick={() => {changeBackground('#ffba49ed'); changeTextColor('#fff')}}></button>
                            <button style={{backgroundColor: `#00B3D7`}}  onClick={() => {changeBackground('#00B3D7ed'); changeTextColor('#fff')}}></button>
                            <button style={{backgroundColor: `#a06cd5`}}  onClick={() => {changeBackground('#a06cd5ed'); changeTextColor('#fff')}}></button>
                            <button style={{backgroundColor: `#ba1b1d`}}  onClick={() => {changeBackground('#ba1b1ded'); changeTextColor('#fff')}}></button>
                        </div>

                        <div className="fontOptions">

                            <button onClick={() => {changeFontSize('2rem')}}>Small</button>
                            <button onClick={() => {changeFontSize('4rem')}}>Medium</button>
                            <button onClick={() => {changeFontSize('5rem')}}>Big</button>
                            <button onClick={() => {changeFontSize('7rem')}}>Massive</button>
                        </div>
                </div>
            )}
            </>
    );
}

export default Clock;

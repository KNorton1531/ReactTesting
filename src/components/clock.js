import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import moment from 'moment';
import '../css/clock.css';
import { FiSettings } from 'react-icons/fi'; // Settings icon from react-icons
import { IoCloseOutline } from "react-icons/io5";
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
    const [textShadow, setTextShadow] = useState(localStorage.getItem('clocktextShadowStyle') || '2px 2px #000000');
    const [borderRadius, setBorderRadius] = useState(localStorage.getItem('clockBorderRadius') || '0px');
    const settingsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (settingsRef.current && !settingsRef.current.contains(event.target)) {
                setShowSettings(false);
            }
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleSettingsClick = (event) => {
        event.stopPropagation();
        toggleSettings();
    };


    useEffect(() => {
      const timer = setInterval(() => setCurrentTime(moment()), 1000);
      return () => clearInterval(timer);
    }, []);

    const toggleSettings = () => {
        setShowSettings(prev => !prev);
    };

    const handleMouseEnter = () => {
        clearTimeout(settingsIconTimeoutRef.current);
        setShowSettingsIcon(true);
    };

    const handleMouseLeave = () => {
            settingsIconTimeoutRef.current = setTimeout(() => setShowSettingsIcon(false), 500);
    };

    const changeFontSize = (fontSize) => {
        setFontSize(fontSize);
        localStorage.setItem('clockFontSize', fontSize);
    };

    const changeFontShadow = (textShadow) => {
        setTextShadow(textShadow);
        localStorage.setItem('clockFontShadow', textShadow);
    };

    const changeBackground = (style) => {
        setBackgroundStyle(style);
        localStorage.setItem('clockBackgroundStyle', style);
    };

    const changeBorderRadius = (borderRadius) => {
        setBorderRadius(borderRadius);
        localStorage.setItem('clockBorderRadius', borderRadius);
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
            <div className='clockWrapper' id='Clock' style={{ background: backgroundStyle, color: textColor, textShadow: textShadow, borderRadius: borderRadius, }}

                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <p style={{ fontSize: fontSize}}>{currentTime.format('h:mm A')}</p>
                {showSettingsIcon && (
                    <div className='settingsHoverContainer'>
                        <FiSettings onClick={handleSettingsClick} /> {/* Settings Icon */}
                    </div>
                )}
            </div>
        </Draggable>

        
                <div className={`settingsContainer ${showSettings ? 'visible' : ''}`} ref={settingsRef}>
                    <div className='exampleClockContainer' style={{ background: backgroundStyle, color: textColor,}}>
                        <p>{currentTime.format('h:mm A')}</p>
                    </div>
                    <IoCloseOutline className='clockCloseSettings' onClick={toggleSettings} style={{ cursor: 'pointer', color: '#fff'}} />
                    <h3>Background Colour</h3>
                        <div className="colourOptions">
                            <button className='noBackgroundCircle' onClick={() => {changeBackground('#00000000')}}></button>
                            <button style={{backgroundColor: `#000000fa`}} onClick={() => {changeBackground('#000000d9')}}></button>
                            <button style={{backgroundColor: `#000000fa`}} onClick={() => {changeBackground('#0000008c')}}></button>
                            <button style={{backgroundColor: `#f8f9fa`}} onClick={() => {changeBackground('#f8f9faEd')}}></button>
                            <button style={{backgroundColor: `#cdcdcd8c`}}  onClick={() => {changeBackground('#cdcdcd8c')}}></button>
                            <button style={{backgroundColor: `#57C2A8`}}  onClick={() => {changeBackground('#57C2A8ed')}}></button>
                            <button style={{backgroundColor: `#ffba49`}}  onClick={() => {changeBackground('#ffba49ed')}}></button>
                            <button style={{backgroundColor: `#00B3D7`}}  onClick={() => {changeBackground('#00B3D7ed')}}></button>
                            <button style={{backgroundColor: `#a06cd5`}}  onClick={() => {changeBackground('#a06cd5ed')}}></button>
                        </div>

                    <h3>Text Colour</h3>
                        <div className="colourOptions">
                            <button style={{backgroundColor: `#000`}}  onClick={() => {changeTextColor('#000')}}></button>
                            <button style={{backgroundColor: `#fff`}}  onClick={() => {changeTextColor('#fff')}}></button>
                            <button style={{backgroundColor: `#313131`}}  onClick={() => {changeTextColor('#313131')}}></button>
                            <button style={{backgroundColor: `#5A5A5A`}}  onClick={() => {changeTextColor('#5A5A5A')}}></button>
                            <button style={{backgroundColor: `#ba1b1d`}}  onClick={() => {changeTextColor('#ba1b1d')}}></button>
                        </div>

                    <h3>Font Size</h3>
                        <div className="fontOptions">
                            <button onClick={() => {changeFontSize('2rem')}}>Small</button>
                            <button onClick={() => {changeFontSize('4rem')}}>Medium</button>
                            <button onClick={() => {changeFontSize('5rem')}}>Big</button>
                            <button onClick={() => {changeFontSize('7rem')}}>Massive</button>
                        </div>

                        <h3>Text Shadow</h3>
                        <div className="fontOptions">
                            <button onClick={() => {changeFontShadow('3px 3px #000000')}}>Text Shadow</button>
                            <button onClick={() => {changeFontShadow('none')}}>Text Shadow Off</button>
                        </div>

                        <h3>Border</h3>
                        <div className="fontOptions">
                            <button style={{borderRadius: `0px`}} onClick={() => {changeBorderRadius('0px')}}>Square</button>
                            <button style={{borderRadius: `10px`}} onClick={() => {changeBorderRadius('10px')}}>Soft edge</button>
                            <button style={{borderRadius: `25px`}} onClick={() => {changeBorderRadius('25px')}}>Round edge</button>
                        </div>

                </div>
           
            </>
    );
}

export default Clock;

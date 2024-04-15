import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import '../css/weather.css'

function WeatherApp({ id }) {

    const playerWidth = 640; // Set the width of the YouTube player
    const playerHeight = 390; // Set the height of the YouTube player

    // Function to calculate the centered position
    const getCenteredPosition = () => {
        const x = (window.innerWidth - playerWidth) / 2;
        const y = (window.innerHeight - playerHeight) / 2;
        return { x, y };
    };

    const storageKey = `position_${id}`;
    const savedPosition = JSON.parse(localStorage.getItem(storageKey));
    const initialPosition = savedPosition || getCenteredPosition();

    const [videoId, setVideoId] = useState('HBPtQVzRZUY');
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100); // Default volume set to 100%
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const playerRef = useRef(null);
    const [position, setPosition] = useState(initialPosition);
    const visibilityKey = `visibility_${id}`;

    useEffect(() => {
        // Update to use initialPosition if not defined in local storage to handle resize before any drag
        const savedVisibility = JSON.parse(localStorage.getItem(visibilityKey)) !== null ? JSON.parse(localStorage.getItem(visibilityKey)) : true;
        setIsVisible(savedVisibility);
    }, [visibilityKey]);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            // Assuming the parent is the window; adjust as needed for a different parent
            const parentWidth = window.innerWidth;
            const parentHeight = window.innerHeight;
            const newPosition = { ...position };

            // Adjust position if out of bounds. Adjust these based on the draggable component's size
            if (newPosition.x < 0) newPosition.x = 0;
            if (newPosition.y < 0) newPosition.y = 0;
            if (newPosition.x > parentWidth - 310) newPosition.x = parentWidth - 310; // Assuming width of the YouTube player
            if (newPosition.y > parentHeight - 257) newPosition.y = parentHeight - 257; // Assuming height of the YouTube player

            if (newPosition.x !== position.x || newPosition.y !== position.y) {
                setPosition(newPosition);
                localStorage.setItem(storageKey, JSON.stringify(newPosition));
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [position, storageKey]);

    const handleStop = (e, data) => {
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        localStorage.setItem(storageKey, JSON.stringify(newPosition));
    };

    const playerStyle = isVisible ? {} : { display: 'none' };

    return (
        <Draggable position={position} onStop={handleStop} bounds="parent" handle={'.weatherHandle'}>
            <div className='weatherWrapper' id='WeatherApp'>
            <div class="weatherHandle">
                Handle
            </div>
            </div>
        </Draggable>
    );
}

export default WeatherApp;

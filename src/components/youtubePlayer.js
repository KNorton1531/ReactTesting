import React, { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import '../css/youtubePlayer.css';
import Draggable from 'react-draggable';
import { MdOutlineToggleOn, MdOutlineToggleOff } from "react-icons/md";
import { CiPlay1, CiPause1 } from "react-icons/ci";

function DraggableYouTubePlayer({ id }) {

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

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        setVolume(event.target.getVolume());
    };

    const opts: YouTubeProps['opts'] = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 0,
            controls: 0,
        },
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        localStorage.setItem(visibilityKey, JSON.stringify(!isVisible)); // Save visibility preference
    };

    const togglePlayPause = () => {
        if (playerRef.current && !isButtonDisabled) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleChange = (event) => {
        const newVideoId = event.target.value;
        setVideoId(newVideoId);
        setIsPlaying(false);
        if (playerRef.current) {
            playerRef.current.stopVideo();
            setIsButtonDisabled(true);
            setTimeout(() => setIsButtonDisabled(false), 2000); // Delay before re-enabling the button
        }
    };

    const adjustVolume = (event) => {
        const newVolume = parseInt(event.target.value, 10);
        setVolume(newVolume);
        if (playerRef.current) {
            playerRef.current.setVolume(newVolume);
        }
    };

    const handleStop = (e, data) => {
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        localStorage.setItem(storageKey, JSON.stringify(newPosition));
    };

    const playerStyle = isVisible ? {} : { display: 'none' };

    return (
        <Draggable position={position} onStop={handleStop} bounds="parent" handle={'.youtubeHandle'}>
            <div className='youtubeWrapper' id='youtubePlayer'>
            <div class="youtubeHandle">
                <select onChange={handleChange} value={videoId} disabled={isButtonDisabled}>
                    <option value="HBPtQVzRZUY">Chill Radio</option>
                    <option value="jfKfPfyJRdk">Lofi Girl</option>
                    <option value="erUTqlcsDJI">LO:FI</option>
                    <option value="Hmdx9EIQCjk">Chillhop Rainy Night</option>
                    <option value="K5hDjd1M">Video Game Lofi</option>
                    <option value="5yx6BWlEVcY">Chillhop Jazzy</option>
                    <option value="35kwlY_RR08">Coffee Shop Jazz</option>
                    {/* Additional options */}
                </select>
                <button onClick={toggleVisibility}>
                    {isVisible ? <MdOutlineToggleOff size={30} /> : <MdOutlineToggleOn size={30} />}
                </button>
            </div>
                <div style={playerStyle}>
                    <YouTube className='youtubePlayer' videoId={videoId} opts={opts} onReady={onPlayerReady} />
                </div>
                <div className='youtubeControls'>
                    <button className='ytPlayPause' onClick={togglePlayPause} disabled={isButtonDisabled}>{isPlaying ? <CiPause1 /> : <CiPlay1 />}</button>
                    <input type="range" min="0" max="100" value={volume} onChange={adjustVolume} className="volumeSlider" />
                    <div id="sound-bars" className={isPlaying ? '' : 'paused'}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </Draggable>
    );
}

export default DraggableYouTubePlayer;

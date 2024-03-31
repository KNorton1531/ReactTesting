import React, { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import '../css/youtubePlayer.css';
import Draggable from 'react-draggable';
import { MdOutlineToggleOn, MdOutlineToggleOff  } from "react-icons/md";
import { CiPlay1, CiPause1  } from "react-icons/ci";


function DraggableYouTubePlayer({ id }) {
    const [videoId, setVideoId] = useState('HBPtQVzRZUY');
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100); // Default volume set to 100%
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isVisible, setIsVisible] = useState(true); // State for player visibility
    const playerRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const storageKey = `position_${id}`;
    const visibilityKey = `visibility_${id}`; // Key for visibility state

    useEffect(() => {
        const savedPosition = JSON.parse(localStorage.getItem(storageKey)) || { x: 0, y: 0 };
        const savedVisibility = JSON.parse(localStorage.getItem(visibilityKey)) !== null ? JSON.parse(localStorage.getItem(visibilityKey)) : true;
        setPosition(savedPosition);
        setIsVisible(savedVisibility); // Retrieve visibility from local storage
    }, [storageKey, visibilityKey]);

    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        const currentVolume = playerRef.current.getVolume();
        setVolume(currentVolume);
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
                    <option value="jfKfPfyJRdk">Live Stream 2</option>
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

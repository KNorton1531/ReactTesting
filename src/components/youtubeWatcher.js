import React, { useState, useRef, useEffect } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';
import '../css/youtubePlayer.css';
import Draggable from 'react-draggable';
import { FaSearch } from "react-icons/fa";
import { FaArrowsAltV, FaExpandArrowsAlt } from "react-icons/fa";


function DraggableYouTubeWatcher({ id }) {

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

    const [videoId, setVideoId] = useState('');
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(100); // Default volume set to 100%
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const playerRef = useRef(null);
    const [position, setPosition] = useState(initialPosition);
    const visibilityKey = `visibility_${id}`;
    const [inputValue, setInputValue] = useState('');
    const [isValidLink, setIsValidLink] = useState(false);

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
            controls: 1,
        },
    };

    const extractVideoID = (url) => {
        // Regular expression to find the video ID in a YouTube URL
        const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
    
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleInputChange = (event) => {
        const url = event.target.value;
        setInputValue(url);
        setIsValidLink(extractVideoID(url) !== null);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const videoUrl = inputValue;
        const newVideoId = extractVideoID(videoUrl);
    
        if (newVideoId) {
            setVideoId(newVideoId);
            if (playerRef.current) {
                playerRef.current.loadVideoById(newVideoId+'&hd=1');
            }
        }
        setInputValue('');
    };

    const handleStop = (e, data) => {
        const newPosition = { x: data.x, y: data.y };
        setPosition(newPosition);
        localStorage.setItem(storageKey, JSON.stringify(newPosition));
    };

    const playerStyle = isVisible ? {} : { display: 'none' };

    return (
        <Draggable position={position} onStop={handleStop} bounds="parent" handle={'.youtubeHandle'}>
            <div className='youtubeWrapper' id='youtubeWatcher'>
            <div class="youtubeHandle">Youtube Player<div className='draggableIcon'><FaExpandArrowsAlt /></div></div>
                <div className='youtubeWatcherWrapper'>
                    <YouTube className='youtubePlayer' videoId={videoId} opts={opts} onReady={onPlayerReady} />
                    <div className='inputYTLinks'>
                    <form autocomplete="off" onSubmit={handleSubmit} className='inputYTLinks'>
                        <input auto placeholder='Enter Youtube Links' type='text' name='videoLink' value={inputValue} onChange={handleInputChange} />
                        <button type="submit" disabled={!isValidLink || isButtonDisabled}>
                            <FaSearch />
                        </button>
                        {!isValidLink && inputValue && <div className="error">Please enter a valid YouTube link.</div>}
                    </form>

                    </div>
                </div>
                <div className="drag-indicator">
                    <FaArrowsAltV />
                </div>
            </div>
        </Draggable>
    );
}

export default DraggableYouTubeWatcher;

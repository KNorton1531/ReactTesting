import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import '../css/ambientPlayer.css';

function AmbientSoundPlayer({ soundFile, icon }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio(soundFile));

  // Set up the audio element to loop
  useEffect(() => {
    const audio = audioRef.current;
    audio.loop = true; // This enables the looping
    audio.volume = volume; // Initialize volume

    // Clean up on component unmount
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset audio position to the start
    };
  }, [volume]); // Executes this effect when component mounts and when volume changes

  const togglePlayPause = () => {
    const audio = audioRef.current;
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  return (
    <div className="ambient-player">
      <div className="icon">{icon}</div>
      <button onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
}

export default AmbientSoundPlayer;

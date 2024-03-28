import React, { useState, useRef } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import '../css/ambientPlayer.css';

function AmbientSoundPlayer({ soundFile, icon }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(new Audio(soundFile));


  const togglePlayPause = () => {
    const audio = audioRef.current;
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audio.volume = volume;
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

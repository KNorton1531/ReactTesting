import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import '../css/ambientPlayer.css';

function AmbientSoundPlayer({ soundFile, icon }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Desired volume level
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(soundFile);
    const audio = audioRef.current;
    audio.loop = true;
    
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [soundFile]);

  useEffect(() => {
    // Directly adjusting volume; fade effects are handled separately
    audioRef.current.volume = volume;
  }, [volume]);

  const fadeAudio = (targetVolume, callback) => {
    const audio = audioRef.current;
    const fadeAmount = 0.2; // Adjust this to make the fade smoother or faster
    const fadeStep = targetVolume > audio.volume ? fadeAmount : -fadeAmount;
    const fadeInterval = 200; // Milliseconds per step

    const fade = setInterval(() => {
      if ((fadeStep < 0 && audio.volume + fadeStep <= targetVolume) || (fadeStep > 0 && audio.volume + fadeStep >= targetVolume)) {
        clearInterval(fade);
        audio.volume = targetVolume; // Ensure target volume is reached
        if (callback) callback();
      } else {
        audio.volume += fadeStep;
      }
    }, fadeInterval);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Fade in
      audioRef.current.volume = 0; // Start from silence
      audioRef.current.play();
      fadeAudio(volume); // Fade to desired volume
    } else {
      // Fade out and then pause
      fadeAudio(0, () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // Optionally reset the audio
        audioRef.current.volume = volume; // Reset volume for next play
      });
    }
  };

  const handleVolumeChange = (e) => {
    setVolume(e.target.value);
  };

  return (
    <div className="ambient-player" 
      style={{  opacity: isPlaying ? 1 : 0.5,
                userSelect: isPlaying ? 'auto' : 'none'
            }}>
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

import React from 'react';
import AmbientSoundPlayer from './AmbientSoundPlayer'; // Adjust the path as needed
import { FaCloudRain, FaPooStorm, FaWind } from 'react-icons/fa'; // Example icons

// Define your sounds array
const sounds = [
  { id: 'rain', soundFile: '/path/to/rain.wav', icon: <FaCloudRain />, title: "Rain" },
  { id: 'thunder', soundFile: '/path/to/thunder.wav', icon: <FaPooStorm />, title: "Thunder" },
  { id: 'wind', soundFile: '/path/to/wind.wav', icon: <FaWind />, title: "Wind" },
  // Add more sounds as needed
];

function AmbientSoundController() {
    return (
      <div>
        {sounds.map((sound) => (
          <AmbientSoundPlayer
            key={sound.id}
            soundFile={sound.soundFile}
            icon={sound.icon}
            title={sound.title} // You might not use title in AmbientSoundPlayer yet, but it's here if you need it
          />
        ))}
      </div>
    );
  }
  
export default AmbientSoundController;

import React from 'react';
import AmbientSoundPlayer from './ambientSounds'; // Adjust the path as needed
import { FaCloudRain, FaPooStorm, FaWind } from 'react-icons/fa'; // Example icons

// Define your sounds array
const sounds = [
  { id: 'rain', soundFile: '/ReactTesting/sounds/rain.wav', icon: <FaCloudRain />, title: "Rain" },
  { id: 'thunder', soundFile: '/ReactTesting/sounds/thunder.wav', icon: <FaPooStorm />, title: "Thunder" },
  { id: 'wind', soundFile: '/ReactTesting/sounds/wind.wav', icon: <FaWind />, title: "Wind" },
];

function AmbientSoundController() {
    return (
      <div className='controllerWrapper'>
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

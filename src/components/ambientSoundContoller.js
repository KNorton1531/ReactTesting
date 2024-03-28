import React from 'react';
import AmbientSoundPlayer from './AmbientSoundPlayer';

function AmbientSoundController() {
    const sounds = [
      { id: 'rain', soundFile: '/ReactTesting/sounds/rain.wav', icon: <FaCloudRain />, title: "Rain" },
      { id: 'thunder', soundFile: '/ReactTesting/sounds/thunder.wav', icon: <FaPooStorm />, title: "Thunder" },
      { id: 'wind', soundFile: '/ReactTesting/sounds/wind.wav', icon: <FaWind />, title: "Wind" },
    ];
  
    return (
      <div className='soundControllerWrapper'>
        {sounds.map((sound) => (
          <AmbientSoundPlayer
            key={sound.id}
            soundFile={sound.soundFile}
            icon={sound.icon}
            title={sound.title}
          />
        ))}
      </div>
    );
  }
  
export default AmbientSoundController;

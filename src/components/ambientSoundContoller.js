import React from 'react';
import AmbientSoundPlayer from './AmbientSoundPlayer';

function AmbientSoundController() {

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

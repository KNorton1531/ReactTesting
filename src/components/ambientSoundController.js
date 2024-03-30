import React from 'react';
import AmbientSoundPlayer from './ambientSounds'; // Adjust the path as needed
import { FaCloudRain, FaPooStorm, FaWind } from 'react-icons/fa'; // Example icons
import { PiCampfire } from "react-icons/pi";
import { IoBugOutline } from "react-icons/io5";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { LuBird } from "react-icons/lu";

// Define your sounds array
const sounds = [
  { id: 'rain', soundFile: '/ReactTesting/sounds/rain.mp3', icon: <FaPooStorm />, title: "rain" },
  { id: 'campfire', soundFile: '/ReactTesting/sounds/campfire.mp3', icon: <PiCampfire />, title: "campfire" },
  { id: 'crickets', soundFile: '/ReactTesting/sounds/crickets.mp3', icon: <IoBugOutline />, title: "crickets" },
  { id: 'ocean', soundFile: '/ReactTesting/sounds/ocean.mp3', icon: <FaUmbrellaBeach  />, title: "ocean" },
  { id: 'birds', soundFile: '/ReactTesting/sounds/birds.mp3', icon: <LuBird  />, title: "birds" },
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

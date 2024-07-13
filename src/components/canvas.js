import React, { useState, useEffect } from 'react';
import BottomMenu from './BottomMenu';
import DraggableTest2 from './draggableTest2';
import DraggableYouTubePlayer from './youtubePlayer';
import DraggableYouTubeWatcher from './youtubeWatcher';
import Clock from './clock';
import Settings from './settings';
import WelcomeBanner from './welcomeBanner';
import WeatherApp from './WeatherApp';
import { BiMusic } from "react-icons/bi";
import { FiYoutube } from "react-icons/fi";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { IoCloudyNightOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";
import { MdOutlineWavingHand } from "react-icons/md";
import '../css/Canvas.css';

const Canvas = () => {
  const toggleComponents = [
    { 
      id: 'welcomeContainer', 
      label: 'Effects',
      icon: <MdOutlineWavingHand />,
      canCloseOutside: false,
    },
    { 
      id: 'youtubePlayer', 
      label: 'Effects',
      icon: <BiMusic />,
      canCloseOutside: false,
    },
    { 
      id: 'youtubeWatcher', 
      label: 'Effects',
      icon: <FiYoutube />,
      canCloseOutside: false,
    },
    { 
      id: 'WeatherApp', 
      label: 'WeatherApp',
      icon: <IoCloudyNightOutline />,
      canCloseOutside: false,
    },
    { 
      id: 'Settings', 
      label: 'Settings',
      icon: <HiOutlinePaintBrush />,
      canCloseOutside: true,
    },
    { 
      id: 'Clock', 
      label: 'Clock',
      icon: <FaRegClock />,
      canCloseOutside: false,
    },
  ];

  const defaultBackground = {
    url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/cottage/cottage-exterior-final.mp4',
    type: 'video',
  };

  const [background, setBackground] = useState(() => {
    const savedBackground = JSON.parse(localStorage.getItem('savedBackground'));
    return savedBackground || defaultBackground;
  });

  useEffect(() => {
    localStorage.setItem('savedBackground', JSON.stringify(background));
  }, [background]);

  const handleBackgroundChange = (media) => {
    setBackground(media);
  };


  return (
    <div className='canvasWrapper'>
      {background.type === 'video' ? (
        <video key={background.url} autoPlay loop muted playsInline style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, objectFit: 'cover', zIndex: -1 }}>
          <source src={background.url} type="video/mp4" />
        </video>
      ) : (
        <div style={{ backgroundImage: `url(${background.url})`, backgroundSize: 'cover', width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}></div>
      )}
      <WelcomeBanner />
      <DraggableTest2 id="second" />
      <DraggableYouTubePlayer id="youtubePlayer"/>
      <DraggableYouTubeWatcher id="youtubeWatcher"/>
      <WeatherApp />
      <Clock id="Clock" />
      <Settings id="Settings" onBackgroundChange={handleBackgroundChange} />
      <BottomMenu toggles={toggleComponents} />
    </div>
  );
};

export default Canvas;

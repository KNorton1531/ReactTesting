import React, { useState, useEffect } from 'react';
import BottomMenu from './BottomMenu'; // Make sure this path is correct
import DraggableTest from './draggableTest';
import DraggableTest2 from './draggableTest2';
import SignOut from './SignOut';
import '../css/Canvas.css';
import { BiMusic } from "react-icons/bi";
import { RiSoundModuleFill } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";
import { BsSnow } from "react-icons/bs";
import BackgroundSelector from './BackgroundImageSelector'; // Adjust path as necessary
import WelcomeBanner from './welcomeBanner'; // Adjust path as necessary
import DraggableYouTubePlayer from './youtubePlayer'; // Adjust path as necessary


const Canvas = () => {
  // Define the toggle elements array
  const toggleComponents = [
    { 
        id: 'first', 
        label: 'Ambience',
        icon: <RiSoundModuleFill /> // FontAwesome beer icon
    },
    { 
        id: 'third', 
        label: 'Effects',
        icon: <AiOutlinePicture />, // Material Icons accessibility icon
        canCloseOutside: true,
    },
    { 
      id: 'youtubePlayer', 
      label: 'Effects',
      icon: <BiMusic   />, // Material Icons accessibility icon
      canCloseOutside: false,
  },
  { 
    id: 'second', 
    label: 'Effects',
    icon: <BsSnow />, // Material Icons accessibility icon
    canCloseOutside: false,
},
];

    const defaultBackground = {
        url: 'https://lofico.nyc3.cdn.digitaloceanspaces.com/scenes/cottage/cottage-exterior-final.mp4', // Default background image URL
        type: 'video', // Default background type
    };

    // Initialize background state with the default background
    const [background, setBackground] = useState(() => {
        // Attempt to load saved background from local storage
        const savedBackground = JSON.parse(localStorage.getItem('savedBackground'));
        return savedBackground || defaultBackground;
    });

    useEffect(() => {
      localStorage.setItem('savedBackground', JSON.stringify(background));
    }, [background]); // Make sure background is in the dependency array
    
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
          <DraggableTest id="first" />
          <DraggableTest2 id="second" />
          <DraggableYouTubePlayer id="youtubePlayer"/>
          <BottomMenu toggles={toggleComponents} />
          <BackgroundSelector onBackgroundChange={handleBackgroundChange} />
        </div>
      );
    };


export default Canvas;
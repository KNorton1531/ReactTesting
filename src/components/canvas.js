import React, { useState, useEffect } from 'react';
import BottomMenu from './BottomMenu'; // Make sure this path is correct
import DraggableTest from './draggableTest';
import DraggableTest2 from './draggableTest2';
import DraggableTest3 from './BackgroundImageSelector';
import SignOut from './SignOut';
import '../css/Canvas.css';
import { FaBeer, FaAddressCard } from 'react-icons/fa';
import { RiSoundModuleFill } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";
import BackgroundSelector from './BackgroundImageSelector'; // Adjust path as necessary
import WelcomeBanner from './welcomeBanner'; // Adjust path as necessary


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
];

    const defaultBackground = {
        url: 'https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?size=626&ext=jpg&ga=GA1.1.1887574231.1711756800&semt=sph', // Default background image URL
        type: 'image', // Default background type
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
          <BottomMenu toggles={toggleComponents} />
          <BackgroundSelector onBackgroundChange={handleBackgroundChange} />
        </div>
      );
    };


export default Canvas;
import React from 'react';
import BottomMenu from './BottomMenu'; // Make sure this path is correct
import DraggableTest from './draggableTest';
import DraggableTest2 from './draggableTest2';
import SignOut from './SignOut';
import '../css/Canvas.css';
import { FaBeer, FaAddressCard } from 'react-icons/fa';
import { RiSoundModuleFill } from "react-icons/ri";
import { AiOutlinePicture } from "react-icons/ai";


const Canvas = () => {
  // Define the toggle elements array
  const toggleComponents = [
    { 
        id: 'first', 
        label: 'Ambience',
        icon: <RiSoundModuleFill /> // FontAwesome beer icon
    },
    { 
        id: 'second', 
        label: 'Second Component',
        icon: <AiOutlinePicture /> // Material Icons accessibility icon
    },
    { 
        id: 'third', 
        label: 'Effects',
        icon: <AiOutlinePicture /> // Material Icons accessibility icon
    },
];


  return (
      <div className='canvasWrapper'>
          {/* Other content of your canvas */}
          <DraggableTest id="first" />
          <DraggableTest2 id="second" />
          {/* Pass the toggleComponents array to BottomMenu */}
          <BottomMenu toggles={toggleComponents} />
      </div>
  );
};


export default Canvas;

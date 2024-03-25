import React from 'react';
import firebase from 'firebase/app';
import logo from '../assets/googleIcon.jpg'; // Importing logo from local file
import '../css/Canvas.css';
import DraggableTest from './draggableTest';
import DraggableTest2 from './draggableTest2';
import SignOut from './SignOut';

const Canvas = () => {

  return (
    <div className='canvasWrapper'>

        <DraggableTest id="first" />
        <DraggableTest2 id="second" />
        <SignOut />
    </div>
  );
};

export default Canvas;

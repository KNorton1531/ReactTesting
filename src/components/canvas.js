import React from 'react';
import BottomMenu from './BottomMenu'; // Make sure this path is correct
import DraggableTest from './draggableTest';
import DraggableTest2 from './draggableTest2';
import SignOut from './SignOut';
import '../css/Canvas.css';

const Canvas = () => {
  // Define the toggle elements array
  const toggleComponents = [
      { id: 'first', label: 'First Component' },
      { id: 'second', label: 'Second Component' },
  ];

  return (
      <div className='canvasWrapper'>
          {/* Other content of your canvas */}
          <DraggableTest id="first" />
          <DraggableTest2 id="second" />
          <SignOut id="signOut" />
          {/* Pass the toggleComponents array to BottomMenu */}
          <BottomMenu toggles={toggleComponents} />
      </div>
  );
};


export default Canvas;

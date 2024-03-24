// DraggableWrapper.js
import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';

const DraggableWrapper = ({ children, id }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const savedPosition = JSON.parse(localStorage.getItem(id)) || { x: 0, y: 0 };
    setPosition(savedPosition);
  }, [id]);

  const handleStop = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem(id, JSON.stringify(newPosition));
  };

  return (
    <Draggable position={position} onStop={handleStop}>
      {children}
    </Draggable>
  );
};

export default DraggableWrapper;

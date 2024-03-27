import React, { useState, useEffect } from 'react';

//When creating an element to drag and add to this menu, make sure to include the ID onto the element within the file, not on the component. 

const BottomMenu = ({ toggles }) => {
    const [visibility, setVisibility] = useState({});

    useEffect(() => {
        const initialVisibility = {};
        toggles.forEach(({ id }) => {
            const storedVisibility = localStorage.getItem(`visibility-${id}`);
            // Set to false if there's no stored visibility, meaning elements will be hidden by default
            initialVisibility[id] = storedVisibility !== null ? storedVisibility === 'true' : false;
            updateElementVisibility(id, initialVisibility[id]);
        });
        
        setVisibility(initialVisibility);
    }, [toggles]); // Dependencies ensure this runs when toggles change

    const toggleVisibility = (id) => {
        const newVisibility = !visibility[id];
        console.log(`Toggling visibility for ${id}: ${newVisibility}`);
        setVisibility({ ...visibility, [id]: newVisibility });
        localStorage.setItem(`visibility-${id}`, newVisibility.toString());
        updateElementVisibility(id, newVisibility);
    };

    const updateElementVisibility = (id, isVisible) => {
        const element = document.getElementById(id);
        if (element) {
            console.log(`Updating element visibility for ${id}, setting display to: ${isVisible ? '' : 'none'}`);
            element.style.display = isVisible ? '' : 'none';
        } else {
            console.log(`Element with ID ${id} not found.`);
        }
    };

    return (
        <div className="bottomMenu">
            {toggles.map(({ id, label }) => (
                <button key={id} onClick={() => toggleVisibility(id)}>
                    {visibility[id] ? `Toggle ${label}` : `Toggle ${label}`}
                </button>
            ))}
        </div>
    );
};

export default BottomMenu;

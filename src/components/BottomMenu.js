import React, { useState, useEffect } from 'react';
import '../css/bottomMenu.css';
import SignOut from './SignOut';

const BottomMenu = ({ toggles }) => {
    const [visibility, setVisibility] = useState({});
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const initialVisibility = {};
        toggles.forEach(({ id }) => {
            const storedVisibility = localStorage.getItem(`visibility-${id}`);
            initialVisibility[id] = storedVisibility !== null ? storedVisibility === 'true' : false;
            updateElementVisibility(id, initialVisibility[id]);
        });
        setVisibility(initialVisibility);
    }, [toggles]);

    useEffect(() => {
        if (!hovered) {
            const timer = setTimeout(() => {
                document.querySelector('.toggleWrapper').classList.remove('hovered');
            }, 3000); // 3 seconds delay
            return () => clearTimeout(timer);
        }
    }, [hovered]);

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
            element.style.display = isVisible ? '' : 'none';
        }
    };

    return (
        <div className='toggleWrapper'>
            <div 
                className="bottomMenu" 
                onMouseEnter={() => { 
                    setHovered(true); 
                    document.querySelector('.toggleWrapper').classList.add('hovered');
                }} 
                onMouseLeave={() => setHovered(false)}
            >
                {toggles.map(({ id, icon }) => (
                    <button 
                        key={id} 
                        onClick={() => toggleVisibility(id)}
                        className={visibility[id] ? 'buttonVisible' : 'buttonHidden'} // Apply class based on visibility
                    >
                        {icon}
                    </button>
                ))}
            </div>
            <SignOut id="signOut" />
        </div>
    );
    
    
};

export default BottomMenu;

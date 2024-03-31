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

    useEffect(() => {
        const handleClickOutside = (event) => {
            const toggleWrapper = document.querySelector('.toggleWrapper');
            const isDialogClick = event.target.closest('.confirmationDialog'); // Add the appropriate selector for your dialog
        
            if (toggleWrapper && toggleWrapper.contains(event.target) || isDialogClick) {
                return;
            }
    
            toggles.forEach(({ id, canCloseOutside }) => {
                if (canCloseOutside) {
                    const element = document.getElementById(id);
                    // Check if the clicked area is not our element and if it's not inside toggleWrapper
                    if (element && !element.contains(event.target)) {
                        updateElementVisibility(id, false);
                        setVisibility(prev => ({ ...prev, [id]: false }));
                        localStorage.setItem(`visibility-${id}`, 'false');
                    }
                }
            });
        };
    
        // Attach event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Clean up event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggles, visibility]); // Make sure to include all dependencies used in the effect

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
                {toggles.map(({ id, icon, label, canCloseOutside }) => (
                    <button 
                        key={id} 
                        onClick={() => toggleVisibility(id)}
                        className={visibility[id] ? 'buttonVisible' : 'buttonHidden'}
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

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();

    const handleNavClick = (path) => {
        console.log('Navbar clicked, navigating to:', path);
        navigate(path);
    };

    return (
        <nav className="navbar">
            <span 
                className="navbar-link" 
                onClick={() => handleNavClick('/')}
                style={{ cursor: 'pointer', padding: '5px' }}
            >
                Главная
            </span>
            <span 
                className="navbar-link" 
                onClick={() => handleNavClick('/tariffs')}
                style={{ cursor: 'pointer', padding: '5px' }}
            >
                Тарифы
            </span>
            <span 
                className="navbar-link" 
                onClick={() => handleNavClick('/faq')}
                style={{ cursor: 'pointer', padding: '5px' }}
            >
                FAQ
            </span>
        </nav>
    );
};

export default Navbar;
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onNavigate }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePath, setActivePath] = useState('/');

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    const handleNavClick = (path) => {
        console.log('Navbar clicked, navigating to:', path);
        navigate(path);
        if (typeof onNavigate === 'function') {
            onNavigate();
        }
    };

    const isActive = (path) => {
        return activePath === path;
    };

    return (
        <nav className="navbar">
            <span 
                className={`navbar-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => handleNavClick('/')}
            >
                Главная
            </span>
            <span 
                className={`navbar-link ${isActive('/tariffs') ? 'active' : ''}`}
                onClick={() => handleNavClick('/tariffs')}
            >
                Тарифы
            </span>
            <span 
                className={`navbar-link ${isActive('/faq') ? 'active' : ''}`}
                onClick={() => handleNavClick('/faq')}
            >
                FAQ
            </span>
        </nav>
    );
};

export default Navbar;
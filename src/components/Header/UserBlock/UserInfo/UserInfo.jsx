import React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import './UserInfo.css';
import loading_icon from '../../../../assets/loading_icon.svg';

const UserInfo = ({ userName, userPicture, isLoading }) => {
    const { logout } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
    };

    return (
        <div className="user-info">
            <div className="user-details">
                <div className="user-name">{userName}</div>
                
                <button type="button" className="logout-link" onClick={handleLogout}>Выйти</button>
            </div>
            {isLoading ? (
                <img src={loading_icon} alt="Loading" className="loading-icon" />
            ) : (
                <img src={userPicture} alt="User" className="user-picture" />
            )}
        </div>
    );
};

export default UserInfo;
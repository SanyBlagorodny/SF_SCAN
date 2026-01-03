import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserActions from './UserActions/UserActions';
import UserInfo from './UserInfo/UserInfo';
import './UserBlock.css';
import user_pic_example from '../../../assets/user_pic_example.png';


const UserBlock = ({ isLoggedIn, userName, userPicture, setUserName, setUserPicture, isMobile, isMenuVisible }) => {
    const [isLoadingActions, setIsLoadingActions] = useState(true);
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/auth');
    };

    useEffect(() => {
        setIsLoadingActions(true);
        setTimeout(() => {
            const userData = {
                name: 'Александр Селиверстов',
                picture: user_pic_example
            };
            setUserName(formatName(userData.name));
            setUserPicture(userData.picture);
            setIsLoadingActions(false);
        }, 2000);
    }, []);

    function formatName(fullName) {
        const parts = fullName.split(' ');
        if (parts.length > 1) {
            return `${parts[0]} ${parts[1].charAt(0)}.`;
        }
        return fullName; 
    }


    return (
        <div className="user-blocks">

            {isMobile && isLoggedIn && !isMenuVisible && (
                <UserActions isLoading={isLoadingActions} />
            )}

            {isMobile && isLoggedIn && isMenuVisible && (
                <UserInfo 
                    userName={userName} 
                    userPicture={userPicture} 
                    isLoading={isLoadingActions} 
                />
            )}

            {!isMobile && isLoggedIn && (
                <>
                    <UserActions isLoading={isLoadingActions} />
                    <UserInfo userName={userName} userPicture={userPicture} isLoading={isLoadingActions} />
                </>
            )}
        
        </div>
        

    );
};

export default UserBlock;
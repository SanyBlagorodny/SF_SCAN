import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import './App.css';

import './fonts/ferry.otf';
import './fonts/InterRegular.ttf';
import './fonts/InterMedium.ttf';
import './fonts/InterBold.ttf';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import Authorization from './components/Authorization/Authorization';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import user_pic_example from './assets/user_pic_example.png';

function App() {
  const { isLoggedIn, checkAuthStatus } = useAuth();
  const [userTariff] = useState('beginner');
  const [userName, setUserName] = useState('');
  const [userPicture, setUserPicture] = useState(user_pic_example);

  useEffect(() => {
    if (!isLoggedIn) {
      console.log("Пользователь не залогинен, обновите UI");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <Router>
      <div className="app-container">
        <Header 
          isLoggedIn={isLoggedIn} 
          userName={userName} 
          setUserName={setUserName} 
          userPicture={userPicture} 
          setUserPicture={setUserPicture} 
        />
        <main>
          <Routes>
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} userTariff={userTariff} />} /> 
            <Route path="/tariffs" element={<Main isLoggedIn={isLoggedIn} userTariff={userTariff} scrollTo="tariffs" />} />
            <Route path="/faq" element={<Main isLoggedIn={isLoggedIn} userTariff={userTariff} scrollTo="faq" />} />
            <Route path="/auth" element={<Authorization />} />
            <Route 
              path="/search" 
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/results" 
              element={
                <ProtectedRoute>
                  <SearchResults />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;


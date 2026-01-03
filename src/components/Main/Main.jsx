import React, { useEffect } from 'react';
import './Main.css';
import About from "./About/About";
import WhyUs from "./WhyUs/WhyUs";
import Tariffs from "./Tariffs/Tariffs";

const Main = ({ isLoggedIn, userTariff, scrollTo }) => {
  const [hasScrolled, setHasScrolled] = React.useState(false);
  
  useEffect(() => {
    console.log('Main component mounted with scrollTo:', scrollTo, 'hasScrolled:', hasScrolled);
    
    // При первой загрузке всегда наверх
    if (!hasScrolled) {
      console.log('First load - scrolling to top...');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setHasScrolled(true);
      return;
    }
    
    // При кликах на навигацию
    if (scrollTo) {
      console.log('Navigation click - scrolling to:', scrollTo);
      const element = document.getElementById(scrollTo);
      console.log('Element found:', element);
      if (element) {
        console.log('Scrolling to element...');
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.log('Element not found, waiting for render...');
        setTimeout(() => {
          const delayedElement = document.getElementById(scrollTo);
          if (delayedElement) {
            delayedElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      // Если scrollTo undefined (кнопка "Главная")
      console.log('Home button clicked - scrolling to top...');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollTo, hasScrolled]);

  return (
    <div className="main-content">
        <About isLoggedIn={isLoggedIn} />
        <WhyUs />
        <Tariffs isLoggedIn={isLoggedIn} userTariff={userTariff} />
    </div>
  )
}

export default Main
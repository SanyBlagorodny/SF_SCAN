import React from 'react';
import './WhyUs.css';
import why_us_large_picture from "../../../assets/why_us_large_picture.svg";
import why_us_icon_magnifier from "../../../assets/why_us_icon_magnifier.svg";
import why_us_icon_shield from "../../../assets/why_us_icon_shield.svg";
import why_us_icon_watch from "../../../assets/why_us_icon_watch.svg";
import arrow_right_icon_why_us_carousel from "../../../assets/arrow_right_icon_why_us_carousel.svg";


const WhyUs = () => {

  const carouselRef = React.useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.querySelector('.carousel-item')?.offsetWidth || 300;
      carouselRef.current.scrollLeft -= itemWidth + 20; // ширина элемента + gap
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.querySelector('.carousel-item')?.offsetWidth || 300;
      carouselRef.current.scrollLeft += itemWidth + 20; // ширина элемента + gap
    }
  };


  return (
    <div className="whyUs-block">
      <h2>Почему именно мы</h2>

      <div className="carousel">
          <div className="carousel-arrow left-arrow" onClick={scrollLeft}>
            <img src={arrow_right_icon_why_us_carousel} alt="arrow" role="button" />
          </div>

          <div className="carousel-content" ref={carouselRef}>
              <div className="carousel-item">
                  <img className="why_us_icon" src={why_us_icon_shield} alt="shield icon" />
                  <p>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
              </div>
              <div className="carousel-item">
                  <img className="why_us_icon" src={why_us_icon_watch} alt="watch icon" />
                  <p>Высокая и оперативная скорость обработки заявки</p>
              </div>
              <div className="carousel-item">
                  <img className="why_us_icon" src={why_us_icon_magnifier} alt="magnifier icon" />
                  <p>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
              </div>
              <div className="carousel-item">
                  <img className="why_us_icon" src={why_us_icon_shield} alt="shield icon" />
                  <p>Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству</p>
              </div>
              <div className="carousel-item">
                  <img className="why_us_icon" src={why_us_icon_watch} alt="watch icon" />
                  <p>Высокая и оперативная скорость обработки заявки</p>
              </div>
              <div className="carousel-item">
                  <img className="why_us_icon" src={why_us_icon_magnifier} alt="magnifier icon" />
                  <p>Огромная комплексная база данных, обеспечивающая объективный ответ на запрос</p>
              </div>
          </div>

          <div className="carousel-arrow right-arrow" onClick={scrollRight}>
            <img src={arrow_right_icon_why_us_carousel} alt="arrow" role="button"/>
          </div>
      </div>

      <div className="why-us-image-container">
        <img className="why-us-large-image" src={why_us_large_picture} alt="Why us Scan" />
      </div>
      
    </div>
  )
}

export default WhyUs


import React, { useEffect, useState } from 'react';
import './styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Carousel } from 'react-responsive-carousel';
import mCarousel_1 from '../../../asset/mCarousel_1.png';
import mCarousel_2 from '../../../asset/mCarousel_2.png';
import mCarousel_3 from '../../../asset/mCarousel_3.png';

export default function CustomCarousel() {
  const [wWidth, setWWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (wWidth > 768) {
      AOS.init();
    }
  }, [wWidth]);
  return (
    <div
      data-aos-duration={wWidth > 768 ? '1500' : null}
      data-aos={wWidth > 768 ? 'zoom-in' : null}
      className="parentContainer"
    >
      <div className="carouselContainer">
        <Carousel
          showStatus={false}
          infiniteLoop
          showThumbs={false}
          emulateTouch
          autoPlay
        >
          {[mCarousel_1, mCarousel_2, mCarousel_3].map((e, i) => {
            return (
              <div key={`${e}_${i}`}>
                <img alt="cImg" src={e} className="tradeCarouselImg" />
              </div>
            );
          })}
        </Carousel>
      </div>
    </div>
  );
}

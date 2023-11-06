import React, { useEffect } from 'react';
import './styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Carousel } from 'react-responsive-carousel';
import mCarousel_1 from '../../../asset/mCarousel_1.png';
import mCarousel_2 from '../../../asset/mCarousel_2.png';
import mCarousel_3 from '../../../asset/mCarousel_3.png';

export default function CustomCarousel() {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      className="parentContainer"
      data-aos="zoom-in"
      data-aos-duration="1500"
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

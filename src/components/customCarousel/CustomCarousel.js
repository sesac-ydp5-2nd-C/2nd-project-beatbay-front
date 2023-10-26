import React, { useEffect } from 'react';
import './styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
      <div className="carouselContainer"></div>
    </div>
  );
}

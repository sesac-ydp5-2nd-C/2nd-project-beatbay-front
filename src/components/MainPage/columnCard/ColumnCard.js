import React, { useEffect } from 'react';
import './styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ColumnCard({ mid, src, title, content, url }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div
      data-aos-duration="1500"
      data-aos="zoom-out"
      className={`flip-container ${mid && 'mH'}`}
    >
      <div className="flipper">
        <div className="front" style={{ backgroundImage: `url(${src})` }}>
          <p className="ccTitle">{title}</p>
          <img className="columnArrow" alt="arrow" src={'columnArrow.svg'} />
        </div>
        <div className="back" style={{ backgroundImage: `url(${src})` }}>
          <p className="ccContent">{content}</p>
          <a href={url}>
            <div className="backLetter">
              자세히 보기
              <img className="rArrow" alt="rArrow" src={'rArrow.svg'} />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

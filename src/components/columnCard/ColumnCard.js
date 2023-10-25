import React from 'react';
import './styles.scss';

export default function ColumnCard({ mid, src, title, content }) {
  return (
    <div class={`flip-container ${mid && 'mH'}`}>
      <div class="flipper">
        <div class="front" style={{ backgroundImage: `url(${src})` }}>
          <p className="ccTitle">{title}</p>
          <img className="columnArrow" alt="arrow" src={'columnArrow.svg'} />
        </div>
        <div class="back" style={{ backgroundImage: `url(${src})` }}>
          <p className="ccContent">{content}</p>
          <div className="backLetter">
            <img className="rArrow" alt="rArrow" src={'rArrow.svg'} />
          </div>
        </div>
      </div>
    </div>
  );
}

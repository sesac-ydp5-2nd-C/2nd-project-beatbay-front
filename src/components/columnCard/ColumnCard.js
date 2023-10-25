import React from 'react';
import './styles.scss';

export default function ColumnCard({ mid, src }) {
  return (
    <div class={`flip-container ${mid && 'mH'}`}>
      <div class="flipper">
        <div class="front" style={{ backgroundImage: `url(${src})` }}>
          <p>Front View</p>
        </div>
        <div class="back" style={{ backgroundImage: `url(${src})` }}>
          <p>Back View</p>
        </div>
      </div>
    </div>
  );
}

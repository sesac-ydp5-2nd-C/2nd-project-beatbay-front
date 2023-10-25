import React from 'react';
import './styles.scss';

export default function ColumnCard() {
  return (
    <div class="flip-container">
      <div class="flipper">
        <div class="front">
          <p>Front View</p>
        </div>
        <div class="back">
          <p>Back View</p>
        </div>
      </div>
    </div>
  );
}

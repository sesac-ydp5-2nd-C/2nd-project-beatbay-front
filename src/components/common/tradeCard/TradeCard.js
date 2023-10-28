import React from 'react';
import './styles.scss';
import tradeLike from '../../../asset/tradeLike.svg';

export default function TradeCard({ data }) {
  return (
    <div className="TCContainer">
      <img alt="prdImg" src={data.img} className="prdImg" />
      <p className="TCTitle">{data.title}</p>
      <p className="TCDate">{data.date}</p>
      <div className="TCPContainer">
        <div className="TCPrice">
          {data.price}
          <p className="TCWon">원</p>
        </div>
        <img alt="TCLike" src={tradeLike} className="TCLike" />
      </div>
    </div>
  );
}

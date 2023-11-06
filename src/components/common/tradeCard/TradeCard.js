import React from 'react';
import './styles.scss';
import tradeLike from '../../../asset/tradeLike.svg';
import { Link } from 'react-router-dom';
import tradeSample from '../../../asset/tradeSample.png';

export default function TradeCard({ data, type }) {
  const id = data[`${type}_id`];
  return (
    <Link to={`/trade/${type}/detail/${id}`}>
      <div className="TCContainer">
        <img
          alt="prdImg"
          src={`http://localhost:8000/uploads/${data[`${type}_file_path`]}`}
          onError={(e) => (e.target.src = tradeSample)}
          className="prdImg"
        />
        <p className="TCTitle">{data[`${type}_title`]}</p>
        <p className="TCDate">{data.updatedAt}</p>
        <div className="TCPContainer">
          <div className="TCPrice">
            {data[`${type}_price`]}
            <p className="TCWon">원</p>
          </div>
          <img alt="TCLike" src={tradeLike} className="TCLike" />
        </div>
      </div>
    </Link>
  );
}

import React from 'react';
import './styles.scss';
import tradeLike from '../../../asset/tradeLike.svg';
import moment from 'moment';
import { Link } from 'react-router-dom';
import tradeSample from '../../../asset/tradeSample.png';
import { calculateTime } from '../../../function/calculate';

export default function TradeCard({ data, type }) {
  const id = data[`${type}_id`];
  const tImg = JSON.parse(data[`${type}_file_path`])[0];
  return (
    <Link to={`/trade/${type}/detail/${id}`}>
      <div className="TCContainer">
        <img
          alt="prdImg"
          src={`${process.env.REACT_APP_BACK_IP}/uploads/${tImg}`}
          onError={(e) => (e.target.src = tradeSample)}
          className="prdImg"
        />
        <p className="TCTitle">{data[`${type}_title`]}</p>
        <p className="TCDate">{calculateTime(data.createdAt)}</p>
        <div className="TCPContainer">
          <div className="TCPrice">
            {data[`${type}_price`]
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
            <p className="TCWon">원</p>
          </div>
          {/* <img alt="TCLike" src={tradeLike} className="TCLike" /> */}
        </div>
      </div>
    </Link>
  );
}

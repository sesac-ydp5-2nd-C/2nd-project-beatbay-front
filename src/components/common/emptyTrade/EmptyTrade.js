import React from 'react';
import emptyLogo from '../../../asset/emptyLogo.svg';
import './styles.scss';

export default function EmptyTrade({ where }) {
  return (
    <div className="emptyContainer" key={0}>
      {where} 비어있어요!
      <img className="emptyLogo" alt="empty" src={emptyLogo} />
    </div>
  );
}

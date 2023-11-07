import React from 'react';
import RollingSpinner from '../../../asset/loading.png';
import './style.scss';

export default function LoadingSpinner() {
  return (
    <div>
      <img src={RollingSpinner} alt="spinner" className="loadingSpinner" />
    </div>
  );
}

import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../Screen';

function ProductTradeScreen() {
  const authInfo = useSelector((state) => state.user.authInfo);

  useEffect(() => {}, []);

  return (
    <Screen>
      <div className="pTContainer"></div>
    </Screen>
  );
}

export default ProductTradeScreen;

import React from 'react';
import './formStatusStyle.scss';

export default function SellFormStatus() {
  return (
    <div>
      <label className="sellRadio">
        <input type="radio" name="statusRadio" value="0" />
        <span>최상</span>
      </label>
      <label className="sellRadio">
        <input type="radio" name="statusRadio" value="1" />
        <span>상</span>
      </label>
      <label className="sellRadio">
        <input type="radio" name="statusRadio" value="2" />
        <span>중상</span>
      </label>
      <label className="sellRadio">
        <input type="radio" name="statusRadio" value="3" />
        <span>중</span>
      </label>
      <label className="sellRadio">
        <input type="radio" name="statusRadio" value="4" />
        <span>중하</span>
      </label>
      <label className="sellRadio">
        <input type="radio" name="statusRadio" value="5" />
        <span>하</span>
      </label>
      <label className="sellRadio">
        <input type="radio" name="statusRadio" value="6" />
        <span>최하</span>
      </label>
    </div>
  );
}

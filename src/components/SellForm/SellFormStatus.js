import React from 'react';
import './formStatusStyle.scss';

export default function SellFormStatus({ status, setStatus }) {
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <label className="sellRadio">
        <input
          type="radio"
          name="statusRadio"
          value="0"
          checked={status === '0'}
          onChange={handleStatusChange}
        />
        <span>최상</span>
      </label>
      <label className="sellRadio">
        <input
          type="radio"
          name="statusRadio"
          value="1"
          checked={status === '1'}
          onChange={handleStatusChange}
        />
        <span>상</span>
      </label>
      <label className="sellRadio">
        <input
          type="radio"
          name="statusRadio"
          value="2"
          checked={status === '2'}
          onChange={handleStatusChange}
        />
        <span>중상</span>
      </label>
      <label className="sellRadio">
        <input
          type="radio"
          name="statusRadio"
          value="3"
          checked={status === '3'}
          onChange={handleStatusChange}
        />
        <span>중</span>
      </label>
      <label className="sellRadio">
        <input
          type="radio"
          name="statusRadio"
          value="4"
          checked={status === '4'}
          onChange={handleStatusChange}
        />
        <span>중하</span>
      </label>
      <label className="sellRadio">
        <input
          type="radio"
          name="statusRadio"
          value="5"
          checked={status === '5'}
          onChange={handleStatusChange}
        />
        <span>하</span>
      </label>
      <label className="sellRadio">
        <input
          type="radio"
          name="statusRadio"
          value="6"
          checked={status === '6'}
          onChange={handleStatusChange}
        />
        <span>최하</span>
      </label>
    </div>
  );
}

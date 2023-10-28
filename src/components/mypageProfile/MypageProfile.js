import React, { useState } from 'react';
import Interest from './Interests';
import './style.scss';

export default function MypageProfile() {
  const [username, setUsername] = useState('영걸');
  const [introduce, setIntroduce] = useState(
    'Music Is My Life~~~~~!!~~! dndndndndndnndddddddddddddddddddddddddd',
  );
  const interests = ['밴드', '베이스', '레슨'];

  return (
    <div className="profileContainer">
      <div>
        <h1>HELLO, {username}</h1>
        <p>"{introduce}"</p>
      </div>

      <div className="interestBox">
        {interests.map((interest, index) => (
          <Interest key={index} kind={interest} />
        ))}
      </div>
    </div>
  );
}

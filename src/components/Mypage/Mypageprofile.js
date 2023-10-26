import React, { useState } from 'react';
import Interest from './Interests';
import './profilestyle.scss';

export default function Mypageprofile() {
  const [username, setUsername] = useState('영걸');
  const [introduce, setIntroduce] = useState('Music Is My Life~~~~~!!~~!');
  const interests = ['밴드', '베이스', '레슨'];

  return (
    <div className="profileContainer">
      <div className="profileImg">
        <img src="profile_default.png" alt="profileImage" />
      </div>
      <div className="profileContent">
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
    </div>
  );
}

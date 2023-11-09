import React, { useEffect } from 'react';
import './styles.scss';
import profileSample from '../../../asset/profile_default.png';

const ChatListCard = ({ data, onClick }) => {
  const whichUser = (
    data.user_1.id == localStorage.getItem('login_id') ? 'user_2' : ' user_1'
  ).trim();
  return (
    <div className="chatCard" onClick={onClick}>
      <img
        alt="profile"
        src={`${process.env.REACT_APP_BACK_IP}/uploads/${data[whichUser]?.user_profile_img}`}
        onError={(e) => (e.target.src = profileSample)}
        className="cpImage"
      />
      <div className="cpInfo">
        <p>{data[whichUser]?.user_nickname}</p>
        <p className="cpLc">{data[whichUser]?.last_chat}</p>
      </div>
      {/* {data.unread > 0 && <div className="unreadCircle">{data.unread}</div>} */}
    </div>
  );
};

export default ChatListCard;

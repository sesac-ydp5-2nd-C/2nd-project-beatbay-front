import React, { useEffect } from 'react';
import './styles.scss';

const ChatListCard = ({ data }) => {
  return (
    <div className="chatCard">
      <img alt="profile" src={data.user_img} className="cpImage" />
      <div className="cpInfo">
        <p>{data.user_name}</p>
        <p className="cpLc">{data.last_chat}</p>
      </div>
      {data.unread > 0 && <div className="unreadCircle">{data.unread}</div>}
    </div>
  );
};

export default ChatListCard;

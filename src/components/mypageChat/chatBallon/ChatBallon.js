import React, { useEffect } from 'react';
import './styles.scss';
import moment from 'moment';

const ChatBallon = ({ data }) => {
  const my_id = localStorage.getItem('login_id');
  if (data.sender_id ? data.sender_id : data.user_id == my_id) {
    return (
      <div className="bContainer mbContainer">
        <div className="bTime mbTime">{moment(data.sent_at).format('LT')}</div>
        <div className="myBallon">{data.content}</div>
      </div>
    );
  } else {
    return (
      <div className="bContainer">
        <div className="senderBallon">{data.content}</div>
        <div className="bTime">{moment(data.sent_at).format('LT')}</div>
      </div>
    );
  }
};

export default ChatBallon;

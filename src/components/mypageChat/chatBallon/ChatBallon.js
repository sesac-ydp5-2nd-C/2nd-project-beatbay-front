import React, { useEffect } from 'react';
import './styles.scss';
import moment from 'moment';

const ChatBallon = ({ data }) => {
  if (data.sender_id === data.my_id) {
    return (
      <div className="bContainer">
        <div className="senderBallon">{data.content}</div>
        <div className="bTime">{moment(data.sent_at).format('mm:ss')}</div>
      </div>
    );
  } else {
    return (
      <div className="bContainer mbContainer">
        <div className="bTime mbTime">
          {moment(data.sent_at).format('mm:ss')}
        </div>
        <div className="myBallon">{data.content}</div>
      </div>
    );
  }
};

export default ChatBallon;

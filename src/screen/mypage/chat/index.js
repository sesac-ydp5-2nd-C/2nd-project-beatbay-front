import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './styles.scss';
import send from '../../../asset/send.svg';
import fileSend from '../../../asset/fileSend.svg';
import Screen from '../../Screen';
import ChatListCard from '../../../components/mypageChat/chatListCard/ChatListCard';
import profile_default from '../../../asset/profile_default.png';
import ChatBallon from '../../../components/mypageChat/chatBallon/ChatBallon';

const name = `test 유저${parseInt(Math.random() * 100)}`;
let socket;
function MypageChatScreen() {
  const ENDPOINT = 'http://localhost:5001';
  //   const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [chatList, setChatList] = useState([
    {
      user_img: profile_default,
      user_name: 'Back Ho',
      last_chat: '좋았싸',
      unread: 1,
    },
    {
      user_img: profile_default,
      user_name: 'Back Ho',
      last_chat: '좋았싸',
      unread: 1,
    },
  ]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 1, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 2, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 2, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 1, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 1, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 2, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 2, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 1, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 1, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 2, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 2, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 1, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 1, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 2, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 2, my_id: 1 },
    { content: '어쩌구 저쩌구', sent_at: new Date(), sender_id: 1, my_id: 1 },
  ]);
  const [connect, setConnect] = useState(false);

  // 화면 렌더링시 소켓 처음 접속
  useEffect(() => {
    console.log(messages);
    socket = io(ENDPOINT);
    socket.emit('newUser', name);
  }, []);

  // 서버에서 emit하는 정보들 실시간으로 받아옴
  useEffect(() => {
    socket.on('message', (message) => {
      console.log(message);
      // setMessages((messages) => [...messages, message]);
    });

    socket.on('update', (data) => {
      console.log(data.message);
      alert(data.message);
    });

    return () => {
      // User leaves room
      socket.disconnect();
    };
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('message', { message: message, name: name }, () =>
        setMessage(''),
      );
    }
  };

  return (
    <Screen>
      <div className="chatTotalContainer">
        <div className="chatListContainer">
          {chatList.map((e, i) => {
            return <ChatListCard key={`${e}_${i}`} data={e} />;
          })}
        </div>

        <div className="chatConatainer">
          <div className="chatmessagesList">
            {messages.map((e, i) => {
              return <ChatBallon key={`${e}_${i}`} data={e} />;
            })}
          </div>
          <div style={{ position: 'relative' }}>
            <input
              placeholder="TEXT MESSAGE..."
              type="text"
              className="chatInput"
            />
            <img alt="send" src={send} className="sendIcon" />
            <img alt="filesend" src={fileSend} className="sendIcon fSend" />
          </div>
        </div>

        <div className="sellerContainer"></div>
      </div>
      {/* <h1>화면 렌더링시 자동 접속, update시 ALERT</h1> */}
      {/* <button
        onClick={() => {
          socket.emit('disconnect');
          socket.off();
        }}
      >
        연결 해제하기
      </button> */}
      {/* <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>메시지 보내기</button> */}
      {/* <ChatCard /> */}
    </Screen>
  );
}

export default MypageChatScreen;

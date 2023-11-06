import React, { useEffect, useRef, useState } from 'react';
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
  const user_id = localStorage.getItem('login_id');
  const ENDPOINT = 'http://localhost:5001';
  //   const [name, setName] = useState('');
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
  const [roomData, setRoomData] = useState();
  const msgRef = useRef();

  // 화면 렌더링시 소켓 처음 접속
  useEffect(() => {
    socket = io(ENDPOINT);
    // 처음 접속시 newUser emit
    socket.emit('newUser', { user_id });
    if (msgRef.current) {
      msgRef.current.scrollTop = msgRef.current.scrollHeight;
    }
  }, []);

  // 서버에서 emit하는 정보들 실시간으로 받아옴
  useEffect(() => {
    // 서버에서 새로 업데이트 되는 메세지를 받아옴
    socket.on('message', (data) => {
      // 현재 접속하고있는 방이면 메세지 업데이트
      if (data.room_id === roomData.room_id) {
        setMessages((messages) => [...messages, message]);
      } else {
        // 접속 안하고 있는 방이면 unread값만 업데이트...
      }
      if (msgRef.current) {
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
      }
    });

    // 차음 접속시 룸 리스트들을 받아옴
    socket.on('room_list', (data) => {
      console.log(data);
      setChatList(data.room_list);
    });

    // 룸 선택시 룸에 대한 데이터들을 받아옴
    socket.on('roomData', (data) => {
      console.log(data);
      setRoomData(data);
      setMessages(data.message_list);
    });

    // socket.on('update', (data) => {
    //   console.log(data.message);
    //   alert(data.message);
    // });

    return () => {
      // User leaves room
      socket.disconnect();
    };
  }, []);

  const enterRoom = (room_id) => {
    socket.emit('enter', { room_id, user_id }, () => {});
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit(
        'sendMessage',
        { content: message, receiver_id: roomData.sender_id },
        () => setMessage(''),
      );
    }
  };

  return (
    <Screen>
      <div className="chatTotalContainer">
        <div className="chatListContainer">
          {chatList.map((e, i) => {
            return (
              <ChatListCard key={`${e}_${i}`} data={e} onClick={enterRoom} />
            );
          })}
        </div>

        <div className="chatConatainer">
          {messages ? (
            <>
              <div className="chatmessagesList" ref={msgRef}>
                {messages.map((e, i) => {
                  return <ChatBallon key={`${e}_${i}`} data={e} />;
                })}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  placeholder="TEXT MESSAGE..."
                  type="text"
                  className="chatInput"
                  value={message}
                  onChange={(e) => setMessage(e.target.target)}
                />
                <img
                  alt="send"
                  src={send}
                  className="sendIcon"
                  onClick={sendMessage}
                />
                <img alt="filesend" src={fileSend} className="sendIcon fSend" />
              </div>
            </>
          ) : (
            <div className="beforeRoom">채팅방을 선택해주세요</div>
          )}
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

import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './styles.scss';

import Screen from '../../Screen';

const name = `test 유저${parseInt(Math.random() * 100)}`;
let socket;
function MypageChatScreen() {
  const ENDPOINT = 'http://localhost:5001';
  //   const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [connect, setConnect] = useState(false);

  // 화면 렌더링시 소켓 처음 접속
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('newUser', name);
  }, [connect]);

  // 서버에서 emit하는 정보들 실시간으로 받아옴
  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
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
      <h1>화면 렌더링시 자동 접속, update시 ALERT</h1>
      {/* <button
        onClick={() => {
          socket.emit('disconnect');
          socket.off();
        }}
      >
        연결 해제하기
      </button> */}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>메시지 보내기</button>
    </Screen>
  );
}

export default MypageChatScreen;

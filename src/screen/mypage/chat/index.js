import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import MypageVinyl from '../../../components/mypageVinyl/MypageVinyl';
import './styles.scss';
import send from '../../../asset/send.svg';
import fileSend from '../../../asset/fileSend.svg';
import Screen from '../../Screen';
import Modal from 'react-modal';
import userImg from '../../../asset/profile_default.png';
import ChatListCard from '../../../components/mypageChat/chatListCard/ChatListCard';
import profile_default from '../../../asset/profile_default.png';
import ChatBallon from '../../../components/mypageChat/chatBallon/ChatBallon';
import tradeSample from '../../../asset/tradeSample.png';

const name = `test 유저${parseInt(Math.random() * 100)}`;
let socket;
const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    width: '33vw',
    height: '27vw',
    borderRadius: '1vw',
    padding: 0,
    overflow: 'hidden',
  },
};
function MypageChatScreen() {
  const [userData, setUserData] = useState({
    user_nickname: '대만',
    comment: '“그래, 난 정대만. 포기를 모르는 남자지….”',
    user_interests: ['밴드', '일렉기타'],
    imgSrc: userImg,
    user_grade: 5,
    user_review: 32,
    user_following: 28,
    user_follower: 18,
    itemCount: 20,
  });

  const user_id = localStorage.getItem('login_id');
  const email = localStorage.getItem('email');
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const msgRef = useRef();

  // 화면 렌더링시 소켓 처음 접속
  useEffect(() => {
    socket = io(ENDPOINT);
    // 처음 접속시 newUser emit
    socket.emit('newUser', { user_id, email });
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
    socket.emit('enter', { room_id, user_id, email }, () => {});
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit(
        'sendMessage',
        { content: message, receiver_id: roomData.sender_id, email, user_id },
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
              <div className="objectInfoContainer">
                <img alt="Sample" src={tradeSample} className="objectImg" />
                <div>
                  <p className="obTitle">텔레케스터 민트 팝니당</p>
                  <p className="obTitle won">1,300,000 원</p>
                </div>
                <div onClick={() => setIsModalOpen(true)} className="finishBtn">
                  거래 완료
                </div>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={() => setIsModalOpen(false)}
                  style={modalStyles}
                  contentLabel="review Modal"
                >
                  <div className="modalContainer">
                    <p>솔직 담백한 리뷰를 남겨주세요!</p>
                    <textarea className="modalContent" />
                    <div className="modalBtnContainer">
                      <div
                        className="modalBtn mr"
                        onClick={() => setIsModalOpen(false)}
                      >
                        취소
                      </div>
                      <div className="modalBtn">완료</div>
                    </div>
                  </div>
                </Modal>
              </div>
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

        <div className="sellerContainer">
          <MypageVinyl userData={userData} />
          <p className="sellerName">정대만</p>
          <p className="sellerIntro">
            “그래, 난 정대만. 포기를 모르는 남자지…”
          </p>
          <div className="tagContainer">
            {['밴드', '일렉기타'].map((e, i) => {
              return <p className="sellerTag">{`# ${e}`}</p>;
            })}
          </div>

          <div className="sellerInfoBox mb22">
            REVIEW
            <p className="countSize">22</p>
          </div>
          <div className="sellerInfoBox">
            FOLLOWER
            <p className="countSize">22</p>
          </div>
        </div>
      </div>
    </Screen>
  );
}

export default MypageChatScreen;

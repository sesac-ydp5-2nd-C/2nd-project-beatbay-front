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
import { useDispatch, useSelector } from 'react-redux';
import { setChatRoomInfo } from '../../../store/feature/userSlice';
import MypageMenus from '../../../components/mypageMenu/MypageMenus';
import { patchMypageReview, postMypageReview } from '../../../api/mypage';
import { getSellerFollowers, getSellerReviews } from '../../../api/seller';

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
  const dispatch = useDispatch();
  const newRoomInfo = useSelector((state) => state.user.chatRoomInfo);

  const ref = useRef();
  const user_id = localStorage.getItem('login_id');
  const email = localStorage.getItem('email');
  const ENDPOINT = process.env.REACT_APP_SOCKET_IP;
  // const ENDPOINT = 'http://localhost:5001';
  //   const [name, setName] = useState('');
  const [chatList, setChatList] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState();
  const [sellerData, setSellerData] = useState();
  const [newRoomData, setNewRoomData] = useState();
  const [sellProductData, setSellProductData] = useState();
  const [isNewRoom, setIsNewRoom] = useState(false);
  const [roomData, setRoomData] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState();
  const [reviewCount, setReviewCount] = useState(0);
  const [followCount, setFollowCount] = useState(0);
  const msgRef = useRef();

  const setProductData = (d) => {
    if (d.productInfo.product_count) {
      setSellProductData({
        type: 'product',
        object_img: JSON.parse(d.productInfo.product_file_path)[0],
        object_title: d.productInfo.product_title,
        object_price: d.productInfo.product_price,
        object_id: d.productInfo.product_id,
      });
    } else {
      setSellProductData({
        type: 'ability',
        object_img: JSON.parse(d.productInfo.ability_file_path)[0],
        object_title: d.productInfo.ability_title,
        object_price: d.productInfo.ability_price,
        object_id: d.productInfo.ability_id,
      });
    }
  };

  // 화면 렌더링시 소켓 처음 접속
  useEffect(() => {
    console.log(newRoomInfo);
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
      // if (data.room_id === roomData.room_id) {
      //   setMessages((messages) => [...messages, message]);
      // } else {
      //   // 접속 안하고 있는 방이면 unread값만 업데이트...
      // }
      console.log(data);
      setMessages((messages) => [...messages, data]);
      if (msgRef.current) {
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
      }
    });

    // 차음 접속시 룸 리스트들을 받아옴
    socket.on('room_List', (data) => {
      console.log(data);
      setChatList(data);
      // 방을 처음 만드는 상태일떄 action
      if (newRoomInfo) {
        if (!checkExistingRoom(data)) {
          // 새로운 방 생성
          setIsNewRoom(true);
          setMessages([]);
          setNewRoomData(newRoomInfo);
          setSellProductData(newRoomInfo);
          setSellerData(newRoomInfo.opponent_data);
          dispatch(setChatRoomInfo(null));
        } else {
          // 이미 방이 있음
          console.log(' 이미 방이 있음');
          dispatch(setChatRoomInfo(null));
          // enterRoom(e.id);
        }
      }
    });

    socket.on('update', (data) => {
      console.log(data);
    });

    // 룸 선택시 룸에 대한 데이터들을 받아옴
    socket.on('roomData', (data) => {
      console.log(data[0]);
      setRoomData(data[0]);
      setProductData(data[0]);
      setMessages(data[0].messageList);
      if (msgRef.current) {
        msgRef.current.scrollTop = msgRef.current.scrollHeight;
      }
    });

    // socket.on('update', (data) => {
    //   console.log(data.message);
    //   alert(data.message);
    // });

    // return () => {
    //   // User leaves room
    //   socket.disconnect();
    // };
  }, []);

  const enterRoom = (data) => {
    const my_id = localStorage.getItem('login_id');
    setSellerData(my_id == data.user_1.id ? data.user_2 : data.user_1);
    console.log(my_id == data.user_1.id ? data.user_2 : data.user_1);
    socket.emit('enter', { room_id: data.room_id, user_id, email }, () => {});
  };

  const checkExistingRoom = (data) => {
    let state = false;
    const type = newRoomInfo.type;
    data.forEach((e, i) => {
      if (
        !e[`${type === 'product' ? 'ability' : 'product'}_info`] &&
        e[`${type}_info`][`${type}_id`] === newRoomInfo.object_id
      ) {
        state = true;
        enterRoom(e);
      }
    });
    return state;
  };

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      if (isNewRoom) {
        console.log({
          user_id,
          email,
          content: message,
          receiver_id: newRoomData.opponent_id,
          type: newRoomData.type,
          object_id: newRoomData.object_id,
        });
        socket.emit(
          'join',
          {
            user_id,
            email,
            content: message,
            receiver_id: newRoomData.opponent_id,
            type: newRoomData.type,
            object_id: newRoomData.object_id,
          },
          (id) => {
            setMessage('');
            setNewRoomData();
            setIsNewRoom(false);
            setRoomData({ room_id: id });
          },
        );
      } else {
        socket.emit(
          'sendMessage',
          {
            receiver_id: sellerData.id,
            room_id: roomData.room_id,
            content: message,
            email,
            user_id,
          },
          () => {
            setMessage('');
            if (msgRef.current) {
              msgRef.current.scrollTop = msgRef.current.scrollHeight;
            }
          },
        );
      }
    } else {
      alert('메세지 내용을 입력해 주세요');
    }
  };

  const handleReview = () => {
    console.log(sellProductData);
    const apiData = {
      id: sellProductData.object_id,
      review_content: review,
      seller_id: sellerData.id,
      type: sellProductData.type === 'product' ? 0 : 1,
    };
    postMypageReview(apiData).then((res) => {
      if (res.data.addId) {
        console.log('success');
        setIsModalOpen(false);
        setReview();
      }
    });
  };

  useEffect(() => {
    if (sellerData) {
      const apiData = { seller_id: sellerData.id };
      getSellerReviews(apiData).then((res) => {
        console.log(res.data);
        if (res.data) {
          setReviewCount(res.data.review.length);
        }
      });
      getSellerFollowers(apiData).then((res) => {
        console.log(res.data);
        if (res.data) {
          setFollowCount(res.data.follower.length);
        }
      });
    }
  }, [sellerData]);

  return (
    <Screen>
      <div className="chatTotalContainer">
        <div className="chatListContainer">
          {chatList.map((e, i) => {
            return (
              <ChatListCard
                key={`${e}_${i}`}
                data={e}
                onClick={() => enterRoom(e)}
              />
            );
          })}
        </div>

        <div className="chatConatainer">
          {messages ? (
            <>
              {sellProductData && (
                <div className="objectInfoContainer">
                  <img
                    alt="Sample"
                    src={`${process.env.REACT_APP_BACK_IP}/uploads/${sellProductData.object_img}`}
                    onError={(e) => (e.target.src = tradeSample)}
                    className="objectImg"
                  />
                  <div>
                    <p className="obTitle">{sellProductData.object_title}</p>
                    <p className="obTitle won">
                      {sellProductData.object_price
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                      {' 원'}
                    </p>
                  </div>
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className="finishBtn"
                  >
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
                      <textarea
                        className="modalContent"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                      />
                      <div className="modalBtnContainer">
                        <div
                          className="modalBtn mr"
                          onClick={() => setIsModalOpen(false)}
                        >
                          취소
                        </div>
                        <div className="modalBtn" onClick={handleReview}>
                          완료
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              )}
              <div className="chatmessagesList" ref={msgRef}>
                {messages.map((e, i) => {
                  return <ChatBallon key={`${e}_${i}`} data={e} />;
                })}
              </div>
              <div style={{ position: 'relative' }}>
                <input
                  ref={ref}
                  placeholder="TEXT MESSAGE..."
                  type="text"
                  className="chatInput"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <img
                  style={{ cursor: 'pointer' }}
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
          {sellerData ? (
            <>
              <MypageVinyl userData={sellerData} />
              <p className="sellerName">{sellerData.user_nickname}</p>
              <p className="sellerIntro">{sellerData.user_comment}</p>
              <div className="tagContainer">
                {sellerData.user_interest &&
                  sellerData.user_interest.map((e, i) => {
                    return <p className="sellerTag">{`# ${e}`}</p>;
                  })}
              </div>

              <div className="sellerInfoBox mb22">
                REVIEW
                <p className="countSize">{reviewCount}</p>
              </div>
              <div className="sellerInfoBox">
                FOLLOWER
                <p className="countSize">{followCount}</p>
              </div>
            </>
          ) : (
            <div className="beforeRoom">채팅방을 선택해주세요</div>
          )}
        </div>
      </div>
      <MypageMenus />
    </Screen>
  );
}

export default MypageChatScreen;

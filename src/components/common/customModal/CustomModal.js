import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import profileImg from '../../../asset/profile_default.png';
import './styles.scss';
import EmptyTrade from '../emptyTrade/EmptyTrade';
import { Link } from 'react-router-dom';

function CustomModal({ isOpen, onRequestClose, modalData, modalTitle }) {
  const [selectedItem, setSelectedItem] = useState(null);
  useEffect(() => {
    console.log(modalData);
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={{
        base: 'modal-enter-animation',
        afterOpen: 'modal-entered',
        beforeClose: '',
      }}
    >
      <section className="modalSection">
        <header>
          <h1>{modalTitle}</h1>
        </header>
        <main className="modalList">
          {modalData.length > 0 ? (
            modalData.map((item, i) => {
              const userFromModal =
                item.Follower || item.Buyer || item.Following;
              console.log(item);
              console.log(userFromModal);

              return (
                <Link
                  to={
                    !item.review_content &&
                    `/seller/${
                      modalTitle === '팔로잉'
                        ? item.Following.id
                        : item.Follower.id
                    }`
                  }
                  key={`${item.id}_${i}`}
                  onClick={() => {
                    setSelectedItem(item);
                  }}
                  className="modalItem"
                >
                  <div className="UPImgBorder">
                    {userFromModal && (
                      <img
                        alt="profileImg"
                        src={
                          // 수정예정
                          userFromModal.user_profile_img
                            ? `${process.env.REACT_APP_BACK_IP}/uploads/${userFromModal.user_profile_img}`
                            : profileImg
                        }
                        className="UPImg"
                      />
                    )}
                  </div>
                  <div className="modalContent">
                    <p>{userFromModal.user_nickname}</p>
                    <p className="modalComment">
                      {item.review_content || item.comment}
                    </p>
                  </div>
                </Link>
              );
            })
          ) : (
            <EmptyTrade where={`${modalTitle} 목록이`} />
          )}
        </main>
        <footer>
          <button className="close" onClick={onRequestClose}>
            close
          </button>
        </footer>
      </section>
    </Modal>
  );
}

export default CustomModal;

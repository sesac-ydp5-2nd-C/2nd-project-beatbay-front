import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import profileImg from '../../../asset/profile_default.png';
import './styles.scss';

function CustomModal({ isOpen, onRequestClose, modalData, modalTitle }) {
  const [selectedItem, setSelectedItem] = useState(null);

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
          {modalData.map((item, i) => (
            <div
              key={`${item.user_nickname}_${i}`}
              onClick={() => {
                setSelectedItem(item);
              }}
              className="modalItem"
            >
              <div className="UPImgBorder">
                <img alt="profileImg" src={item.imgSrc} className="UPImg" />
              </div>
              <div className="modalContent">
                <p>{item.user_nickname}</p>
                <p className="modalComment">{item.comment}</p>
              </div>
            </div>
          ))}
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

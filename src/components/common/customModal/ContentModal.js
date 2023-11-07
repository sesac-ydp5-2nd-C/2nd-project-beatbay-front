import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './contentModalStyle.scss';

const ContentModal = ({ isOpen, closeModal, selectedData }) => {
  const [modalData, setModalData] = useState({
    title: '',
    content: '',
    url: '',
  });

  useEffect(() => {
    if (selectedData) {
      setModalData({
        title: selectedData.title || '',
        content: selectedData.content || '',
        url: selectedData.url || '',
      });
    }
  }, [selectedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!isOpen || !selectedData) {
    return null;
  }

  const { title, content, url } = modalData;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={{
        base: 'modal-enter-animation',
        afterOpen: 'modal-entered',
        beforeClose: '',
      }}
    >
      <section className="modalSection">
        <div className="modalContent">
          <input name="title" value={title} onChange={handleInputChange} />
          <textarea
            name="content"
            value={content}
            onChange={handleInputChange}
          />
          <input name="url" value={url} onChange={handleInputChange} />
        </div>

        <footer>
          <button className="enter">등록</button>
          <button className="close" onClick={closeModal}>
            취소
          </button>
        </footer>
      </section>
    </Modal>
  );
};

export default ContentModal;

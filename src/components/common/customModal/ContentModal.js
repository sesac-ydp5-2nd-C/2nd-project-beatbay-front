import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './contentModalStyle.scss';
import { patchNotice, postNotice } from '../../../api/adminpage';

const ContentModal = ({
  isOpen,
  closeModal,
  selectedData,
  modalData,
  setModalData,
  dataType,
}) => {
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

  const handlePost = async () => {
    // 공지 등록
    if (dataType === 'notice' && selectedData.id == null) {
      console.log('공지 등록!');
      const apiData = {
        notice_title: title,
        notice_content: content,
      };

      postNotice(apiData).then((res) => {
        closeModal();
      });
    } else if (dataType === 'notice' && selectedData.id !== null) {
      console.log('공지 수정!');
      const apiData = {
        notice_id: selectedData.id,
        notice_title: title,
        notice_content: content,
      };

      patchNotice(apiData).then((res) => {
        closeModal();
      });
    }
    // 칼럼 등록
    if (dataType === 'column' && selectedData.id == null) {
      console.log('칼럼 등록!');
    } else if (dataType === 'column' && selectedData.id !== null) {
      console.log('칼럼 수정!');
    }
  };

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
          {dataType === 'column' && (
            <input name="url" value={url} onChange={handleInputChange} />
          )}
        </div>

        <footer>
          <button className="enter" onClick={handlePost}>
            등록
          </button>
          <button className="close" onClick={closeModal}>
            취소
          </button>
        </footer>
      </section>
    </Modal>
  );
};

export default ContentModal;

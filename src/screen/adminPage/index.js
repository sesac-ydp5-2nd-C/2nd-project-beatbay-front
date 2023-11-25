import React, { useEffect, useState } from 'react';
import './style.scss';
import Screen from '../Screen';
import AdminTable from '../../components/AdminTable/AdminTable';
import ContentModal from '../../components/common/customModal/ContentModal';
import {
  deleteAdminAbility,
  deleteAdminProduct,
  deleteAdminUser,
  getAdminData,
  patchAdminGrade,
} from '../../api/adminpage';
import LoadingSpinner from '../../components/common/loadingSpinner';
import { getNotice } from '../../api/inform';

export default function AdminScreen() {
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    content: '',
    url: '',
  });
  const [adminData, setAdminData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [dataType, setDataType] = useState('');

  const handleContentModal = (item) => {
    setSelectedData(item);
    setIsModalOpen(true);
    setDataType(item.type);
    console.log(item);
  };

  const handleDelete = async (e) => {
    if (e.id) {
      console.log(e.id);
      await deleteAdminUser({ user_id: e.id }).then(() => {
        console.log(e, '삭제');
      });
    } else if (e.product_id) {
      console.log(e.product_id);
      await deleteAdminProduct({ product_id: e.product_id }).then(() => {
        console.log(e, '삭제');
      });
    } else if (e.ability_id) {
      console.log(e.ability_id);
      await deleteAdminAbility({ ability_id: e.ability_id }).then(() => {
        console.log(e, '삭제');
      });
    } else {
      console.error('deleteError', e);
    }

    await getAdminPage();
  };

  const handleGradeChange = async (id, grade) => {
    console.log(id, grade);
    setSelectedGrade(selectedGrade);
    await patchAdminGrade({ user_id: id, user_grade: grade }).then(() => {
      console.log('ㅠㅠ', id, grade);
    });
    await getAdminPage();
  };

  const closeModal = () => {
    setSelectedData(null);
    setIsModalOpen(false);
  };

  const getAdminPage = async () => {
    await getAdminData().then((res) => {
      if (res.data) {
        setAdminData(res.data);
        setIsLoading(false);
        console.log(res.data);
      } else {
        console.error('error');
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    getAdminPage();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Screen>
      <div className="adminContainer">
        <h1>관리자 </h1>
        {adminData && (
          <section className="ADUserSection">
            <div className="userControl">
              <div className="ADControlTitle">
                <h2>회원관리</h2>
                <p>전체 회원 수: {adminData.userCount}</p>
              </div>
              <div className="ADtable">
                <AdminTable
                  data={adminData.users}
                  dataType="user"
                  handleDelete={(item) => handleDelete(item)}
                  handleGradeChange={handleGradeChange}
                  selectedGrade={selectedGrade}
                  setSelectedGrade={setSelectedGrade}
                />
              </div>
            </div>
          </section>
        )}

        {adminData && (
          <section className="ADNoticeSection">
            <div className="columnControl">
              <div className="ADControlTitle">
                <h2>칼럼 관리</h2>
                <button
                  className="columnPost"
                  onClick={() => handleContentModal({ type: 'column' })}
                >
                  등록
                </button>
              </div>
              <div className="ADtable">
                <AdminTable
                  data={adminData.columns}
                  dataType="column"
                  handleEdit={(item) => handleContentModal(item)}
                  handleDelete={(item) => handleDelete(item)}
                />
              </div>
            </div>
            <div className="noticeControl">
              <div className="ADControlTitle">
                <h2>공지 관리</h2>
                <button
                  className="noticePost"
                  onClick={() => handleContentModal({ type: 'notice' })}
                >
                  등록
                </button>
              </div>
              <div className="ADtable">
                <AdminTable
                  data={adminData.notices}
                  dataType="notice"
                  handleEdit={handleContentModal}
                  handleDelete={(item) => handleDelete(item)}
                />
              </div>
            </div>
          </section>
        )}

        {adminData && (
          <section className="ADTradeSection">
            <div className="productControl">
              <div className="ADControlTitle">
                <h2>물품 관리</h2>
                <p>물품 등록 수: {adminData.productCount}</p>
              </div>
              <div className="ADtable">
                <AdminTable
                  data={adminData.products}
                  dataType="product"
                  handleDelete={(item) => handleDelete(item)}
                />
              </div>
            </div>
            <div className="abilityControl">
              <div className="ADControlTitle">
                <h2>재능 관리</h2>
                <p>재능 등록 수: {adminData.abilityCount}</p>
              </div>
              <div className="ADtable">
                <AdminTable
                  data={adminData.abilities}
                  dataType="ability"
                  handleDelete={(item) => handleDelete(item)}
                />
              </div>
            </div>
          </section>
        )}
      </div>
      {isModalOpen && (
        <ContentModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          selectedData={selectedData}
          modalData={modalData}
          setModalData={setModalData}
          dataType={dataType}
        />
      )}
    </Screen>
  );
}

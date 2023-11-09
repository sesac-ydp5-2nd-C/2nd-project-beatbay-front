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
} from '../../api/adminpage';
import LoadingSpinner from '../../components/common/loadingSpinner';

export default function AdminScreen() {
  const adminParticle = {
    column: [
      {
        id: 1,
        type: '칼럼',
        title: '음악가들의 별칭, 제대로 붙인 걸까?',
        content:
          '학교 음악시간에 음악의 대가들에 대해 배울 때, 그 이름 앞에 수식어처럼 붙는 별칭도 알아두어야 했다. ‘음악의 아버지 바흐’, ‘교향곡의 아버지 하이든’, ‘음악의 신동 모차르트’, ‘악성 베토벤’, ‘가곡의 왕 슈베르트’, ‘피아노의 시인 쇼팽’, ‘왈츠의 왕 요한 슈트라우스’, ‘가극(오페라)의 제왕 베르디’. 과연 이 별칭들은 제대로 잘 갖다 붙인 것일까? 지금부터 확인해보자.',
        url: 'https://www.thecolumnist.kr/news/articleView.html?idxno=967',
      },
      {
        id: 2,
        type: '칼럼',
        title: '음악이 없는 나라? 여왕을 배웅한 음악',
        content:
          '‘Das Land ohne Musik 음악이 없는 나라’. ‘음악이 없는 나라’라고? 그런 나라가 있을 리도 없겠지만, 대체 다른 나라에 대해 이런 표현을 한 사람은 얼마나 오만에 쩐 사람일까?',
        url: 'https://www.thecolumnist.kr/news/articleView.html?idxno=1374',
      },
      {
        id: 3,
        type: '칼럼',
        title: '느리고 점진적인: 록의 죽음에 대해',
        content:
          '‘록은 쇠퇴했다’. ‘Rock Will Never Die’가 록 음악의 팬들에게 오랜 시간 동안 통용되었던 격언이라는 것을 생각해 보면, 록이 더 이상 주류의, 혹은 인기 있는 음악이 아니라는 건 모든 사람이 인정할 수밖에 없는 사실로 보인다.',
        url: 'https://heterophony.kr/death-of-rock/',
      },
      {
        id: 4,
        type: '칼럼',
        title: '대중음악의 힘',
        content:
          '대중음악은 우리 삶의 반영이자 감정을 나타내는 예술로, 밥 딜런과 같은 아티스트들은 음악을 통해 사회적 메시지와 감동을 전달해왔습니다.',
        url: 'https://www.daejonilbo.com/news/articleView.html?idxno=2078719',
      },
    ],
    notice: [
      {
        id: 1,
        type: '공지',
        title: 'WELCOME TO BEATBAY!',
        content:
          '비트베이는 악기 중고거래는 물론, 음악과 관련된 모든 재능을 거래할 수 있는 음악 거래의 새로운 중심지 입니다. 믿음직스러운 비트베이에서 여러분들의 음악을 펼쳐주세요!',
      },
      {
        id: 2,
        type: '공지',
        title: 'ver 1.0.6 업데이트',
        content:
          'ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!ver 1.0.6 업데이트가 완료되었습니다 !!',
      },
    ],
  };

  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    title: '',
    content: '',
    url: '',
  });
  const [adminData, setAdminData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (item) => {
    setSelectedData(item);
    setIsModalOpen(true);
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
                <button className="columnPost" onClick={handleEdit}>
                  등록
                </button>
              </div>
              <div className="ADtable">
                <AdminTable
                  data={adminParticle.column}
                  dataType="column"
                  handleEdit={(item) => handleEdit(item)}
                  handleDelete={(item) => handleDelete(item)}
                />
              </div>
            </div>
            <div className="noticeControl">
              <div className="ADControlTitle">
                <h2>공지 관리</h2>
                <button className="noticePost" onClick={handleEdit}>
                  등록
                </button>
              </div>
              <div className="ADtable">
                <AdminTable
                  data={adminParticle.notice}
                  dataType="notice"
                  handleEdit={handleEdit}
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
        />
      )}
    </Screen>
  );
}

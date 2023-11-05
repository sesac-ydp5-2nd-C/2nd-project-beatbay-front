import React from 'react';
import './styles.scss';
import notion from '../../../asset/notion.svg';
import logo from '../../../asset/footer_logo.svg';
import github from '../../../asset/github.svg';

export default function CustomFooter() {
  return (
    <footer className="footerContainer">
      <div className="footers">
        <div className="footerBBInfo">
          <img alt="logo" src={logo} className="footerLogo" />
          <p>
            이 프로젝트의 목적은 개인적인 학습과 기술 데모를 위한 것이며,
            상업적인 용도로 사용하지 않습니다.
          </p>
          <img alt="notionIcon" src={notion} className="notionIcon" />
          <img alt="githubIcon" src={github} className="githubIcon" />
        </div>
        <div className="footerTeamInfo">
          <div className="teamBack">
            <p>백엔드</p>
            <div className="personInfo">
              <div className="teamPerson">
                <p>이재민</p>
                <p>김정윤</p>
              </div>
              <div className="personGithub">
                <p>@flashrifle</p>
                <p>@pipi-shortstocking</p>
              </div>
            </div>
          </div>
          <div className="teamBack">
            <p>프론트엔드</p>
            <div className="personInfo">
              <div className="teamPerson">
                <p>김상우</p>
                <p>이재욱</p>
                <p>전수현</p>
              </div>
              <div className="personGithub">
                <p>@Sangwoo97</p>
                <p>@22-JWL</p>
                <p>@jjsh03</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

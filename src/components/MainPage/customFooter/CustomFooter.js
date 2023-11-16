import React from 'react';
import './styles.scss';
import notion from '../../../asset/notion.svg';
import logo from '../../../asset/footer_logo.svg';
import github from '../../../asset/github.svg';
import { Link } from 'react-router-dom';

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
          <p>| 프로젝트기간 | 2023. 10. 23 ~ 11. 10</p>
          <Link to="https://sage-h.notion.site/MAIN-HOME-5d2de6edd8874230bffc78374d1020a5?pvs=4">
            <img alt="notionIcon" src={notion} className="notionIcon" />
          </Link>
          <Link to="https://github.com/sesac-ydp5-2nd-C">
            <img alt="githubIcon" src={github} className="githubIcon" />
          </Link>
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
                <Link to={'https://github.com/flashrifle'}>
                  <p>@flashrifle</p>
                </Link>
                <Link to={'https://github.com/pipi-shortstocking'}>
                  <p>@pipi-shortstocking</p>
                </Link>
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
                <Link to={'https://github.com/Sangwoo97'}>
                  <p>@Sangwoo97</p>
                </Link>
                <Link to={'https://github.com/22-JWL'}>
                  <p>@22-JWL</p>
                </Link>
                <Link to={'https://github.com/jjsh03'}>
                  <p>@jjsh03</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

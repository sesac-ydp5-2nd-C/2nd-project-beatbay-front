import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import objectImg from '../../../asset/object_img.png';
import { useNavigate } from 'react-router-dom';

export default function IntroVideo({ src, reverse }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [wWidth, setWWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const togglePlayPause = () => {
    if (wWidth <= 768) {
      navigate('/trade/product');
    } else {
      const video = videoRef.current;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleResize = () => {
    setWWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (wWidth > 768) {
      AOS.init();
    }
  }, [wWidth]);

  return (
    <div
      data-aos-duration={wWidth > 768 ? '2000' : null}
      data-aos={wWidth > 768 ? (reverse ? 'fade-right' : 'fade-left') : null}
      className="video-player-container"
    >
      {reverse && (
        <div className="controller rev">
          <p className="introLetter">ANY MUSICAL TALENT</p>
          <p className="introLetter mbL">YOU CAN DO</p>
          <div className="controlBar">
            <img
              // onClick={togglePlayPause}
              className="cIcon mr"
              alt="back"
              src="backward.svg"
            />
            <img
              onClick={togglePlayPause}
              className="cIcon"
              alt="play"
              src={`${isPlaying ? 'pause.svg' : 'play.svg'}`}
            />
            <img
              // onClick={togglePlayPause}
              className="cIcon mlPr"
              alt="front"
              src="forward.svg"
            />
            <a href="/trade/talent" className="goTrade">
              재능 거래 하러 가기
            </a>
          </div>
        </div>
      )}
      {wWidth > 768 ? (
        <video
          ref={videoRef}
          className="video-player"
          src={src}
          preload="auto"
          loop
        />
      ) : (
        <img
          alt="mobile"
          className="mobileImg"
          src={reverse ? objectImg : objectImg}
        />
      )}
      {!reverse && (
        <div className="controller">
          <p className="introLetter">ALL THE ITEMS</p>
          <p className="introLetter mbL">YOU NEED FOR MUSIC</p>
          <div className="controlBar">
            <img
              // onClick={togglePlayPause}
              className="cIcon mr"
              alt="back"
              src="backward.svg"
            />
            <img
              onClick={togglePlayPause}
              className="cIcon"
              alt="play"
              src={`${isPlaying ? 'pause.svg' : 'play.svg'}`}
            />
            <img
              // onClick={togglePlayPause}
              className="cIcon mlPr"
              alt="front"
              src="forward.svg"
            />
            <a href="/trade/product" className="goTrade">
              물품 거래 하러 가기
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

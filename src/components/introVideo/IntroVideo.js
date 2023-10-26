import React, { useEffect, useRef, useState } from 'react';
import './styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function IntroVideo({ src, reverse }) {
  const videoRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div
      data-aos-duration="2000"
      data-aos={reverse ? 'fade-right' : 'fade-left'}
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
            <p className="goTrade">재능 거래 하러 가기</p>
          </div>
        </div>
      )}
      <video
        ref={videoRef}
        className="video-player"
        src={src}
        preload="auto"
        loop
      />
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
            <p className="goTrade">물품 거래 하러 가기</p>
          </div>
        </div>
      )}
    </div>
  );
}

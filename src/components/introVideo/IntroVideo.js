import React, { useRef, useState } from 'react';
import './styles.scss';

export default function IntroVideo({ src }) {
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

  return (
    <div className="video-player-container">
      <video
        ref={videoRef}
        className="video-player"
        src={src}
        preload="auto"
        loop
      />
      <div className="controller">
        <p className="introLetter">ALL THE ITEMS</p>
        <p className="introLetter mbL">YOU NEED FOR MUSIC</p>
        <div className="controlBar">
          <img
            onClick={togglePlayPause}
            className="cIcon"
            alt="play"
            src={`${isPlaying ? 'pause' : 'play.svg'}`}
          />
        </div>
      </div>
    </div>
  );
}

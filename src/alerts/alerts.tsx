import React, { useState, useEffect } from 'react';
import '@lottiefiles/lottie-player';
import './alerts.css';
import angryAnimation from './angry.json';
import restingAnimation from './resting.json';
import happyAnimation from './happy.json';
import excitedAnimation from './excited.json';



const animations = {
  angry: angryAnimation,
  resting: restingAnimation,
  happy: happyAnimation,
  excited: excitedAnimation,
};

const Popup: React.FC = () => {
  const [buttonText, setButtonText] = useState('Start Timer');
  const [timer, setTimer] = useState(10);
  const [isPaused, setIsPaused] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState(animations.happy);

  const handleClick = () => {
    if (isPaused) {
      setButtonText('Timer is running');
      setIsPaused(false);
      if (timer > 5) {
        setCurrentAnimation(animations.happy);
      } else {
        setCurrentAnimation(animations.resting);
      }
    } else {
      setButtonText('Timer paused');
      setIsPaused(true);
      setCurrentAnimation(animations.resting);
    }
  };

  const handleReset = () => {
    setTimer(10);
    setButtonText('Start Timer');
    setIsPaused(false);
    setCurrentAnimation(animations.excited);
  };

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (timer > 0 && buttonText === 'Timer is running') {
      countdownInterval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
        if (timer <= 5) {
          setCurrentAnimation(animations.resting);
        }
      }, 1000);
    } else if (timer === 0) {
      setButtonText('Timer complete!');
      setCurrentAnimation(animations.angry);
      // Add your logic when the timer reaches 0
    }

    return () => {
      clearInterval(countdownInterval);
    }
  }, [timer, buttonText]);

  return (
    <div>
      {/* Use lottie-player with the specified attributes */}
      <lottie-player
        autoplay
        controls
        loop
        mode="normal"
        src={currentAnimation}
        style={{ width: '320px' }}
      ></lottie-player>

      <button onClick={handleClick}>{buttonText}</button>
      <button onClick={handleReset}>Reset Timer</button>
      <p>Time remaining: {timer} seconds</p>
    </div>
  );
};

export default Popup;
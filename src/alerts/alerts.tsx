import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './alerts.css'

const test = <img src="icon.png" style={{ maxWidth: '60px' }}/>

const test2 = <p>Hello World</p>;

const root = document.createElement('div');
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(test);

const Popup: React.FC = () => {
    const [buttonText, setButtonText] = useState('Start Timer');
    const [timer, setTimer] = useState(10);
  
    const handleClick = () => {
      // Reset the timer to 10 seconds
      setTimer(10);
      // Start the countdown
      setButtonText('Timer is running');
    };
  
    useEffect(() => {
      let countdownInterval: NodeJS.Timeout;
  
      if (timer > 0 && buttonText === 'Timer is running') {
        countdownInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
      } else if (timer === 0) {
        setButtonText('Timer complete!');
        // Add your logic when the timer reaches 0
      }
  
      return () => {
        clearInterval(countdownInterval);
      };
    }, [timer, buttonText]);
  
    return (
      <div>
        <button onClick={handleClick}>{buttonText}</button>
        <p>Time remaining: {timer} seconds</p>
      </div>
    );
  };
  
  // Render the React component in the popup.html
  rootElement.render(<Popup />, document.getElementById('root'));
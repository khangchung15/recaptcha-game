import React, { useState, useEffect } from 'react';

const FakeRecaptchaPopup = ({ onVerify }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              onVerify();
            }, 0);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isLoading, onVerify]);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#2d2d2d',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
      zIndex: 1000,
      width: '300px',
      fontFamily: 'Arial, sans-serif',
      border: '1px solid #444'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          marginRight: '10px'
        }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#4a9eff"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#4a9eff"/>
          </svg>
        </div>
        <span style={{ fontSize: '14px', color: '#fff' }}>reCAPTCHA</span>
      </div>
      
      <div style={{
        border: '1px solid #444',
        borderRadius: '4px',
        padding: '15px',
        marginBottom: '15px',
        backgroundColor: '#333'
      }}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="checkbox"
            id="recaptcha-checkbox"
            style={{ 
              marginRight: '10px',
              accentColor: '#4a9eff'
            }}
            checked={isLoading}
            onChange={handleClick}
          />
          <label htmlFor="recaptcha-checkbox" style={{ fontSize: '14px', color: '#fff' }}>
            I'm not a robot
          </label>
        </div>
        
        {isLoading && (
          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#444',
            borderRadius: '2px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              backgroundColor: '#4a9eff',
              transition: 'width 0.05s linear'
            }} />
          </div>
        )}
      </div>
      
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#888'
      }}>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </div>
  );
};

export default FakeRecaptchaPopup; 
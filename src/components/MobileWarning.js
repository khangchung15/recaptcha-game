import React from 'react';
import '../styles/mobile-warning.css';

const MobileWarning = () => {
  return (
    <div className="mobile-warning">
      <div className="mobile-warning-content">
        <h1>Desktop Only</h1>
        <p>Please visit this website on a desktop device for the best experience.</p>
        <p>This game is designed for larger screens and requires precise interactions.</p>
      </div>
    </div>
  );
};

export default MobileWarning; 
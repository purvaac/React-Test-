import React, { useState, useEffect } from 'react';
import './style.css'; 

const FixedSlider = ({ value, onChange }) => {
  const [animate, setAnimate] = useState(false);
  const [sliderValue, setSliderValue] = useState(null);

  useEffect(() => {
    if (value !== null && value !== sliderValue) {
      setAnimate(true);
      setSliderValue(value);

      // Reset animation after 1 second 
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
  }, [value]);

  const handleSliderChange = (newValue) => {
    if (newValue !== sliderValue) {
      setSliderValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className="fixed-slider">
      <input
        type="range"
        min="0"
        max="100"
        step="25"
        value={sliderValue !== null ? sliderValue : 0}
        onChange={(e) => handleSliderChange(parseInt(e.target.value, 10))}
        className={`slider custom-slider ${animate ? 'green' : ''}`}
        style={{ backgroundSize: `${sliderValue !== null ? sliderValue : 0}% 100%`, boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)' }}
      />
      <div className="slider-marks">
        <div className={`mark ${sliderValue >= 0 ? 'active' : ''}`} data-label="Strongly <br />Disagree"></div>
        <div className={`mark ${sliderValue >= 25 ? 'active' : ''}`} data-label="Disagree"></div>
        <div className={`mark ${sliderValue >= 50 ? 'active' : ''}`} data-label="Neutral"></div>
        <div className={`mark ${sliderValue >= 75 ? 'active' : ''}`} data-label="Agree"></div>
        <div className={`mark ${sliderValue >= 100 ? 'active' : ''}`} data-label="Strongly Agree"></div>
      </div>
      <div className="slider-labels">
        <p className={`label ${sliderValue === 0 ? 'active' : ''}`} style={{ left: '0%' }}>Strongly Disagree</p>
        <p className={`label ${sliderValue === 25 ? 'active' : ''}`} style={{ left: '25%' }}>Disagree</p>
        <p className={`label ${sliderValue === 50 ? 'active' : ''}`} style={{ left: '50%' }}>Neutral</p>
        <p className={`label ${sliderValue === 75 ? 'active' : ''}`} style={{ left: '75%' }}>Agree</p>
        <p className={`label ${sliderValue === 100 ? 'active' : ''}`} style={{ left: '100%' }}>Strongly Agree</p>
      </div>
    </div>
  );
};

export default FixedSlider;

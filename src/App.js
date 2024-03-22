import React, { useState } from 'react';
import './App.css';
import DateTimePicker from './components/DateTimePicker';

function App() {
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const handleCountdownUpdate = (newCountdown) => {
    setCountdown(newCountdown);
  };

  const renderCountdownOrMessage = () => {
    if (countdown.days > 100) {
      return <div className="countdownMessage">Selected time is more than 100 days</div>;
    } else {
      return (
        <div className="countdownTimer">
          <div>{countdown.days} <br/>days</div>
          <div>{countdown.hours} <br/>hours</div>
          <div>{countdown.minutes} <br/>minutes</div>
          <div>{countdown.seconds} <br/>seconds</div>
        </div>
      );
    }
  };

  return (
    <div className="App">
      <h1>
        <span style={{ color: 'white' }}>Countdown </span>
        <span style={{ color: 'purple' }}>Timer</span>
      </h1>
      <div className="dateTimePickerContainer">
        <DateTimePicker onCountdownUpdate={handleCountdownUpdate} />
      </div>
      {renderCountdownOrMessage()}
    </div>
  );
}

export default App;

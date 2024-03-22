import React, { useState, useEffect } from 'react';
import './DateTimePicker.css';

const DateTimePicker = ({ onCountdownUpdate }) => {
  const [dateTime, setDateTime] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    let intervalId;

    if (timerStarted && dateTime) {
      const targetTime = new Date(dateTime).getTime();
      intervalId = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeLeft = targetTime - currentTime;

        if (timeLeft <= 0) {
          clearInterval(intervalId);
          setTimerStarted(false);
        } else {
          const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
          const seconds = Math.floor((timeLeft / 1000) % 60);
          onCountdownUpdate({ days, hours, minutes, seconds });
        }
      }, 1000);
    }

    setIntervalId(intervalId);

    return () => clearInterval(intervalId);
  }, [dateTime, timerStarted, onCountdownUpdate]);

  const handleChange = (e) => {
    setDateTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toggleTimer();
  };

  const toggleTimer = () => {
    if (timerStarted) {
      clearInterval(intervalId);
      setTimerStarted(false);
      setDateTime('');
    } else {
      setTimerStarted(true);
    }
  };

  const handleStopTimer = () => {
    clearInterval(intervalId);
    setTimerStarted(false);
    setDateTime('');
    // Reset countdown values to zero
    onCountdownUpdate({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  };

  return (
    <div className="dateTimePickerContainer">
      <form className="dateTimePicker" onSubmit={handleSubmit}>
        <div className="dateTimeInput">
          <label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={handleChange}
              min={new Date().toISOString().slice(0, 16)}
            />
          </label>
        </div>
        <div className="dateTimeButton">
          {timerStarted ? (
            <button type="button" onClick={handleStopTimer}>Stop Timer</button>
          ) : (
            <button type="button" onClick={toggleTimer}>Start Timer</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DateTimePicker;

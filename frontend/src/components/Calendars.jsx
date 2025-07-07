import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/calendars.css";

function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  const ampm = hours >= 12 ? "P.M." : "A.M.";

  hours = hours % 12;
  if (hours === 0) hours = 12;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  if (hours < 10) hours = "0" + hours;
  return `${hours}:${minutes}:${seconds} ${ampm}`;
}

function Calendars({ onDateSelect, diaryDates }) {
  const [value, setValue] = useState(new Date());
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const tileClassName = ({ date, view }) => {
    if (view !== "month") return null;

    const localDate = date.toLocaleDateString("en-CA"); 
    return diaryDates.includes(localDate) ? "highlight" : null;
  };

  return (
    <div className="calendar-container">
      <div className="time-display">🕒 {formatTime(time)}</div>

      <Calendar
        onChange={(date) => {
          setValue(date);
          onDateSelect(date);
        }}
        value={value}
        tileClassName={tileClassName}
        className="calendars"
        maxDate={new Date()}
      />
    </div>
  );
}

export default Calendars;

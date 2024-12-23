import React, { useState, useRef, useEffect } from "react";
import { Clock } from "react-bootstrap-icons";
import css from './Time.module.css';

export default function Time({ name, value, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedTime, setSelectedTime] = useState(value);
  const dropdownRef = useRef(null);

  const timeOptions = [];
  for (let hour = 9; hour < 19; hour++) {
    timeOptions.push(`${hour.toString().padStart(2, "0")}:00`);
    timeOptions.push(`${hour.toString().padStart(2, "0")}:30`);
  }

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setShowDropdown(false);
    onChange({ target: { name, value: time } });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div ref={dropdownRef}>
        <button className={css.inputTime} onClick={() => setShowDropdown(!showDropdown)}>
          {selectedTime || (
            <div className={css.list}>
              {" 00:00"}
              <Clock className={css.clockIcon} size={16} />
            </div>
          )}
        </button>
        {showDropdown && (
          <div>
            <p className={css.text}>Meeting time</p>
            <div className={css.dropdownList}>
              {timeOptions.map((time, index) => (
                <p
                  key={index}
                  className={time === selectedTime ? css.selectedTime : css.unselectedTime}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

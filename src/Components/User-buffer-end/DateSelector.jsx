import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const DateSelector = ({ setFinalDate }) => {
  const currentYear = new Date().getFullYear();
  const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const currentDay = new Date().getDate().toString().padStart(2, "0");

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedDay, setSelectedDay] = useState(currentDay);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const date = `${selectedDay}-${selectedMonth}-${selectedYear}`;
    setFormattedDate(date);
    setFinalDate(date);
    console.log(date);
  }, [selectedDay, selectedMonth, selectedYear]);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value.padStart(2, "0"));
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value.padStart(2, "0"));
  };

  const renderMonthOptions = () => {
    return Array.from({ length: 12 }, (_, index) => (
      <option key={index + 1} value={(index + 1).toString().padStart(2, "0")}>
        {(index + 1).toString().padStart(2, "0")}
      </option>
    ));
  };

  const renderYearOptions = () => {
    return Array.from({ length: 11 }, (_, index) => {
      const year = currentYear - 5 + index;
      return (
        <option key={year} value={year}>
          {year}
        </option>
      );
    });
  };

  const renderDayOptions = () => {
    // Days depend on the month and year, considering leap years
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, index) => (
      <option key={index + 1} value={(index + 1).toString().padStart(2, "0")}>
        {(index + 1).toString().padStart(2, "0")}
      </option>
    ));
  };

  return (
    <div className="ms-32" style={{ display: "flex", alignItems: "center" }}>
      <Form.Group controlId="daySelect">
        <Form.Label className="text-white">اختر اليوم</Form.Label>
        <Form.Control
          as="select"
          value={selectedDay}
          onChange={handleDayChange}
          style={{
            width: "8rem",
            backgroundColor: "black",
            color: "white",
            marginLeft: "1rem",
          }}
        >
          {renderDayOptions()}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="monthSelect" style={{ marginLeft: "1rem" }}>
        <Form.Label className="text-white">اختر الشهر</Form.Label>
        <Form.Control
          as="select"
          value={selectedMonth}
          onChange={handleMonthChange}
          style={{
            width: "8rem",
            backgroundColor: "black",
            color: "white",
            marginLeft: "1rem",
          }}
        >
          {renderMonthOptions()}
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="yearSelect" style={{ marginLeft: "1rem" }}>
        <Form.Label className="text-white">اختر السنة</Form.Label>
        <Form.Control
          as="select"
          value={selectedYear}
          onChange={handleYearChange}
          style={{
            width: "8rem",
            backgroundColor: "black",
            color: "white",
            marginLeft: "1rem",
            borderRadius: "10px",
          }}
        >
          {renderYearOptions()}
        </Form.Control>
      </Form.Group>

      {/* <div style={{ marginLeft: "1rem", color: "white" }}>
        Selected Date: {formattedDate}
      </div> */}
    </div>
  );
};

export default DateSelector;

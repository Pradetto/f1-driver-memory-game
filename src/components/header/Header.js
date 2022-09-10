import React, { useState, Fragment, useRef } from "react";
// CSS
import classes from "./Header.module.css";
// Components
import Title from "./Title";

const Header = (props) => {
  const [error, setError] = useState(false);
  const driverYear = useRef("");

  const driverYearHandler = (e) => {
    e.preventDefault();
    const year = driverYear.current.value;
    if (validYear(year)) {
      props.yearHandler(year);
      props.reset();
    } else {
      setError(true);
    }
  };

  const validYear = (year) => {
    const currentYear = new Date().getFullYear();
    if (year.length === 4 && +year > 1949 && +year <= currentYear) {
      setError(false);
      return true;
    } else {
      return false;
    }
  };

  return (
    <header className={classes.header}>
      <Title />
      <form onSubmit={driverYearHandler}>
        {/* <label htmlFor="year">Enter Year:</label> */}
        <div>
          <input
            type="text"
            id="year"
            ref={driverYear}
            placeholder="Enter Year: 1950-Today"
          />
          <button>Get Drivers</button>
          {error && <span className={classes.error}>Error</span>}
        </div>
      </form>
    </header>
  );
};

export default Header;

import React, { useState, Fragment, useRef } from "react";
// CSS
import classes from "./Header.module.css";
// Components
import Title from "./Title";

const Header = (props) => {
  const driverYear = useRef("");

  const driverYearHandler = (e) => {
    e.preventDefault();
    const year = driverYear.current.value;
    props.yearHandler(year);
    props.reset();
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
          <button onClick={props.getDrivers}>Get Drivers</button>
        </div>
      </form>
    </header>
  );
};

export default Header;

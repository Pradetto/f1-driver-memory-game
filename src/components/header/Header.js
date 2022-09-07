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
  };

  return (
    <header className={classes.header}>
      <Title />
      <form onSubmit={driverYearHandler}>
        {/* <label htmlFor="year">Enter Year:</label> */}
        <input
          type="text"
          id="year"
          ref={driverYear}
          placeholder="Enter Year:"
        />
        <button onClick={props.getDrivers}>Get Drivers</button>
      </form>
    </header>
  );
};

export default Header;

import React, { Fragment } from "react";

//css
import classes from "./Title.module.css";

const Title = (props) => {
  return (
    <div className={classes.title}>
      <h1 className={classes["title-name"]}>F1 Driver Memory Game</h1>
      <p className={classes.rules}>
        Rules: Submit a year from 1950 to this year. Click on the driver images
        and do not click the driver again. Good luck!
      </p>
    </div>
  );
};

export default Title;

import React, { Fragment } from "react";

//css
import classes from "./Title.module.css";

const Title = (props) => {
  return (
    <div className={classes.title}>
      <h1 className={classes["title-name"]}>F1 Driver Memory Game</h1>
      <p className={classes.rules}>
        Rules: Click on the image of the driver and do not repeat clicking on
        the driver.
      </p>
    </div>
  );
};

export default Title;

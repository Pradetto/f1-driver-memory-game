import React, { Fragment } from "react";
// css
import classes from "./Card.module.css";

const Card = (props) => {
  const scoreHandler = () => {
    props.scoreHandler(props.fullName);
  };
  return (
    <div
      className={classes["card-container"]}
      key={props.id}
      id={props.id}
      onClick={scoreHandler}
    >
      <div className={classes.top}>
        <img src={props.image} alt="Sorry this driver didn't have a picture" />
      </div>
      <div className={classes.bottom}>{props.fullName}</div>
    </div>
  );
};

export default Card;

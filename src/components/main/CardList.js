import React from "react";
import Card from "./Card";

import classes from "./CardList.module.css";

const CardList = (props) => {
  const scoreHandler = (name) => {
    props.scoreHandler(name);
  };
  return (
    <main className={classes.background}>
      <div className={classes.score}>Score: 25 | High Score: 25</div>
      <div className={classes["main-container"]}>
        {props.drivers.map((driver) => {
          return (
            <Card
              key={driver.id}
              id={driver.id}
              fullName={driver.firstName + " " + driver.lastName}
              image={driver.image}
              scoreHandler={scoreHandler}
            />
          );
        })}
      </div>
    </main>
  );
};

export default CardList;

import React from "react";
import Card from "./Card";

import classes from "./CardList.module.css";

const CardList = (props) => {
  const scoreHandler = () => {};
  return (
    <main className={classes.background}>
      <div className={classes.score}>Score: 25 | High Score: 25</div>
      <div className={classes["main-container"]}>
        {props.drivers.map((driver) => {
          return (
            <Card
              key={driver.id}
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

// <ul>
//   {props.drivers.map((driver) => (
//     <li key={driver.id} className={classes["drivers-list"]}>
//       {driver.image ? (
//         <img src={driver.image} />
//       ) : (
//         <img src="https://www.thesun.co.uk/wp-content/uploads/2019/06/the_stig_form_bbcjpg-JS4290682.jpg" />
//       )}
//       {driver.firstName + " " + driver.lastName}
//     </li>
//   ))}
// </ul>;

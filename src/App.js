import { Fragment, useState, useEffect } from "react";

// Components
import Header from "./components/header/Header";
import CardList from "./components/main/CardList";
import Modal from "./components/UI/Modal";

// CSS
import classes from "./App.module.css";

function App() {
  const [modalShown, setModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [yearState, setYearState] = useState("2022");
  const [seenDrivers, setSeenDrivers] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [newYear, setNewYear] = useState("");
  const [error, setError] = useState(false);

  // ********** GAME FUNCTIONALITY START ************
  const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setDrivers(a);
  };

  const scoreBoardHandler = (name) => {
    console.log(name);
    if (seenDrivers.includes(name)) {
      gameOver();
    } else {
      //adding driver
      setSeenDrivers((prev) => {
        return [...prev, name];
      });
      //shuffling and will rerender mixed drivers
      shuffle(drivers);
      setScore((prev) => ++prev);
    }
    return;
  };

  const gameOver = () => {
    console.log("you lost :)");
    if (score > highScore) {
      setHighScore(score);
    }
    showGameOverScreen();
  };

  // const clearBoardHandler = () => {
  //   setSeenDrivers([]);
  // };

  // *********** GAME FUNCTIONALITY END ***********

  // ******* VALID YEAR? *********
  const yearHandler = (year) => {
    setYearState(year);
  };

  const gameOverYear = (e) => {
    setNewYear(e.target.value);
    console.log(newYear);
  };

  const validYear = () => {
    const currentYear = new Date().getFullYear();
    if (newYear.length === 4 && +newYear > 1949 && +newYear <= currentYear) {
      console.log("Valid Year");
      yearHandler(newYear);
      setError(false);
      return true;
    } else {
      console.log("Invalid Year");
      return false;
    }
  };
  // ******* Valid Year End ******

  // ******** Modal Start **********
  const showGameOverScreen = () => {
    setModal(true);
  };

  const hideGameOverScreen = () => {
    setModal(false);
    setSeenDrivers([]);
    setScore(0);
  };
  // ******** Modal End *********

  // ********** API CALL START *************
  useEffect(() => {
    // gameover()
    const getDrivers = async () => {
      const url = "https://ergast.com/api/f1/" + yearState + "/drivers.json";
      const response = await fetch(url);
      const data = await response.json();

      let driverInfo = [];
      data.MRData.DriverTable.Drivers.map((driver) => {
        driverInfo.push({
          id: driver.code,
          firstName: driver.givenName,
          lastName: driver.familyName,
          wikipedia: driver.url,
          image: null,
        });
      });
      getDriversImgs(driverInfo).then((data) => setDrivers(data));
    };

    const getDriversImgs = async (driverInfo) => {
      const responses = await Promise.all(
        driverInfo.map((driver) => {
          let wikiPageName = driver.wikipedia.split("/").slice(-1).toString();
          let wiki_url =
            "https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=" +
            wikiPageName +
            "&prop=pageimages&format=json&pithumbsize=500";
          return fetch(wiki_url);
        })
      );
      const urls = await Promise.all(responses.map((r) => r.json())).then(
        (json) => retrievingImgUrl(json)
      );
      return driverInfo.map((item, idx) => {
        return { ...item, image: urls[idx] };
      });
    };

    const retrievingImgUrl = async (data) => {
      const strippingData = data.map((d) => {
        return d.query.pages;
      });
      const urls = strippingData.map((d) => {
        const k = Object.keys(d)[0];
        try {
          return d[k].thumbnail.source;
        } catch {
          return null;
        }
      });
      return urls;
    };
    getDrivers();
  }, [yearState]);

  // ******** API CALL END *****************
  return (
    <Fragment>
      <Header yearHandler={yearHandler} reset={hideGameOverScreen} />
      <CardList
        drivers={drivers}
        scoreHandler={scoreBoardHandler}
        highScore={highScore}
        score={score}
      />
      {modalShown && (
        <Modal onClose={hideGameOverScreen}>
          You lost G sorry. You got this many right! {seenDrivers.length}
          <div>
            <input type="text" id="newYear" onChange={gameOverYear} />
            <button
              type="submit"
              onClick={() =>
                validYear() ? hideGameOverScreen() : setError(true)
              }
            >
              New Year?
            </button>
            {error && (
              <p style={{ color: "red", fontWeight: "bold" }}>
                Error: Please enter a valid year from 1950 - Current Year
              </p>
            )}
          </div>
        </Modal>
      )}
    </Fragment>
  );
}

export default App;

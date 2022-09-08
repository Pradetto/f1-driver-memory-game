import { Fragment, useState, useEffect } from "react";

// Components
import Header from "./components/header/Header";
import CardList from "./components/main/CardList";
import Modal from "./components/UI/Modal";

// CSS
import classes from "./App.module.css";

function App() {
  // const [modalShown, setModal] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [yearState, setYearState] = useState("2022");
  const [seenDrivers, setSeenDrivers] = useState([]);
  const [score, setScore] = useState([]);

  // function shuffle(a) {
  //   for (let i = a.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [a[i], a[j]] = [a[j], a[i]];
  //   }
  //   setDrivers(a);
  // }

  const scoreBoardHandler = (name) => {
    if (seenDrivers.includes(name)) {
      // return gameOver();
    } else {
    }
    console.log(name);
  };

  const yearHandler = (year) => {
    setYearState(year);
  };

  useEffect(() => {
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

  // const showYearHandler = () => {
  //   setModal(false);
  // };
  return (
    <Fragment>
      <Header yearHandler={yearHandler} />
      <CardList drivers={drivers} scoreHandler={scoreBoardHandler} />
    </Fragment>
  );
}

export default App;

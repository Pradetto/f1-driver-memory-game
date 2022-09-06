import { Fragment, useState } from "react";

// Components
import Header from "./components/header/Header";
import CardList from "./components/main/CardList";
import Modal from "./components/UI/Modal";

// CSS
import classes from "./App.module.css";

function App() {
  const [modalShown, setModal] = useState(true);
  const [drivers, setDrivers] = useState([]);
  const [seenDrivers, setSeenDrivers] = useState([]);
  const [score, setScore] = useState([]);

  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setDrivers(a);
  }

  const scoreBoard = (id) => {
    if (seenDrivers.includes(id)) {
      // return gameOver();
    } else {
    }
  };

  const getDrivers = async (year) => {
    const response = await fetch(
      "https://ergast.com/api/f1/" + year + "/drivers.json"
    );
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
    setDrivers(driverInfo);
    getDriversImgs();
  };

  async function getDriversImgs() {
    console.log(drivers);
    const responses = await Promise.all(
      drivers.map((driver) => {
        let wikiPageName = driver.wikipedia.split("/").slice(-1).toString();
        let wiki_url =
          "https://en.wikipedia.org/w/api.php?origin=*&action=query&titles=" +
          wikiPageName +
          "&prop=pageimages&format=json&pithumbsize=500";
        return fetch(wiki_url);
      })
    );
    await Promise.all(responses.map((r) => r.json())).then((json) =>
      retrievingImgUrl(json)
    );
  }

  const retrievingImgUrl = async (data) => {
    console.log(data);
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

    setDrivers((prev) => {
      return prev.map((item, idx) => {
        return { ...item, image: urls[idx] };
      });
    });
  };

  const showYearHandler = () => {
    setModal(false);
  };
  return (
    <Fragment>
      <Header getDrivers={getDrivers} />
      <CardList drivers={drivers} />
    </Fragment>
  );
}

export default App;

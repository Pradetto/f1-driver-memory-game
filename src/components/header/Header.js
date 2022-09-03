import React, { useState, Fragment, useRef } from "react";

const Header = (props) => {
  const driverYear = useRef();
  const [drivers, setDrivers] = useState([]);
  //   const [rawWikiData, setRawWikiData] = useState([]);
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
    // console.log(strippingData);
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
    console.log("you made it here");
  };

  const driverYearHandler = (e) => {
    e.preventDefault();
    const year = driverYear.current.value;
    getDrivers(year);
  };
  return (
    <header>
      <form onSubmit={driverYearHandler}>
        <label htmlFor="year">Enter Year:</label>
        <input type="text" id="year" ref={driverYear} />
        <button onClick={props.getDrivers}>Get Drivers</button>
      </form>
      <ul style={{ marginTop: "1rem" }}>
        {drivers.map((driver) => (
          <li
            key={driver.id}
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "10rem",
              maxHeight: "20rem",
              border: "5px solid black",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            {driver.image ? <img src={driver.image} /> : " nothing found"}
            {driver.firstName + " " + driver.lastName}
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;

import React, { useState, Fragment, useRef } from "react";

const Header = () => {
  const driverYear = useRef();
  const [drivers, setDrivers] = useState([]);
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

  const getDriversImgs = () => {
    drivers.map(async (driver) => {
      let wikiPageName = driver.wikipedia.split("/").slice(-1);
      let wiki_url =
        "https://en.wikipedia.org/w/api.php?action=query&titles=" +
        wikiPageName +
        "&prop=pageimages&format=json&pithumbsize=500";
      const response = await fetch(wiki_url);
      const imgUrl = await response.json();
      console.log(imgUrl);
    });
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
        <button>Get Drivers</button>
      </form>
      <ul>
        {drivers.map((driver) => (
          <li key={driver.id}>{driver.firstName + " " + driver.lastName}</li>
        ))}
      </ul>
    </header>
  );
};

export default Header;

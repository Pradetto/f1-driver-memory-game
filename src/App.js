import { Fragment, useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import Modal from "./components/UI/Modal";

function App() {
  const [modalShown, setModal] = useState(true);
  const showYearHandler = () => {
    setModal(false);
  };
  return (
    <Fragment>
      <Modal onClose={showYearHandler} />
      <Header getDrivers={showYearHandler} />
    </Fragment>
  );
}

export default App;

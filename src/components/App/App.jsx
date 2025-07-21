import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { APIkey, coordinates } from "../../utils/constants";
import Footer from "../Footer/Footer";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddBtn = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__wrapper">
        {!weatherData && <p className="loading">Loading...</p>}
        {weatherData && (
          <Header handleAddBtn={handleAddBtn} weatherData={weatherData} />
        )}
        {weatherData && (
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        )}
      </div>
      <ModalWithForm
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      />
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        closeActiveModal={closeActiveModal}
      />
      <Footer/>
    </div>
  );
}

export default App;

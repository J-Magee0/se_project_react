import { useState, useEffect } from "react";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { APIkey, coordinates } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";


import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatueUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";

import { defaultClothingItems } from "../../utils/constants";
import { getItems, addItem, deleteCard } from "../../utils/Api.js";

import Profile from "../Profile/Profile";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";

// Main App component

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: true,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTempertureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleToggleSwitchChange = () => {
    setCurrentTempertureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

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

  const handleAddItemModalSubmit = ({ name, imageUrl, weatherType }) => {
    addItem({ name, imageUrl, weather: weatherType })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteBtn = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-garment");
  };

  const handleDelete = (cardToDelete) => {
    if (!cardToDelete || !cardToDelete.id) {
      console.error("No valid card selected for deletion");
      return;
    }
    deleteCard(cardToDelete.id)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item.id !== cardToDelete.id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__wrapper">
          <Header handleAddBtn={handleAddBtn} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleDeleteBtn={handleDeleteBtn}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  handleAddBtn={handleAddBtn}
                  handleDeleteBtn={handleDeleteBtn}
                />
              }
            />
          </Routes>
        </div>
        <AddItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          isOpen={activeModal === "add-garment"}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          closeActiveModal={closeActiveModal}
          handleDeleteBtn={handleDeleteBtn}
        />
        <DeleteConfirmModal
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          card={selectedCard}
          isOpen={activeModal === "delete-garment"}
          handleDelete={handleDelete}
        />
        <Footer />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

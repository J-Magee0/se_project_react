import { useState, useEffect } from "react";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
import { APIkey, coordinates } from "../../utils/constants";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import { defaultClothingItems } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteCard,
  addCardLike,
  removeCardLike,
  updateUser,
} from "../../utils/Api.js";
import { signup, signin, checkToken } from "../../utils/auth.js";

import Profile from "../Profile/Profile";
import DeleteConfirmModal from "../DeleteConfirmModal/DeleteConfirmModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Message from "../Message/Message";

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
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [uiMessage, setUiMessage] = useState(null);

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

  const handleRegisterModalSubmit = ({ email, password, name, avatarUrl }) => {
    signup({ email, password, name, avatar: avatarUrl })
      .then(() => {
        // signup succeeded, now sign in to get token
        return signin({ email, password });
      })
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          // fetch full user data with _id
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        // If server responded with 409 (Conflict), offer to login instead
        if (error && error.status === 409) {
          // optionally show server message
          const msg =
            error.body?.message || "User already exists. Please log in.";
          // open login modal
          setActiveModal("login");
          // show a short UI message
          setUiMessage({ text: msg, type: "info" });
          return;
        }
        // other errors: show message if available
        const otherMsg =
          error?.body?.message || error?.message || "Registration failed";
        setUiMessage({ text: otherMsg, type: "error" });
      });
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    signin({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          // fetch full user data with _id
          return checkToken(res.token);
        }
      })
      .then((userData) => {
        setIsLoggedIn(true);
        setCurrentUser(userData);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Login failed:", error);
        const msg = error?.body?.message || error?.message || "Login failed";
        setUiMessage({ text: msg, type: "error" });
      });
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    addItem({ name, imageUrl, weather })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Add item failed:", error);
        const msg =
          error?.body?.message || error?.message || "Failed to add item";
        setUiMessage({ text: msg, type: "error" });
      });
  };

  const handleDeleteBtn = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-garment");
  };

  const handleDelete = (cardToDelete) => {
    if (!cardToDelete || !cardToDelete._id) {
      console.error("No valid card selected for deletion");
      return;
    }
    deleteCard(cardToDelete._id)
      .then(() => {
        setClothingItems((cards) =>
          cards.filter((item) => item._id !== cardToDelete._id)
        );
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Failed to delete item:", error);
        const msg =
          error?.body?.message || error?.message || "Failed to delete item";
        setUiMessage({ text: msg, type: "error" });
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    !isLiked
      ? addCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => {
            console.error("Like failed:", err);
            const msg =
              err?.body?.message || err?.message || "Failed to like item";
            setUiMessage({ text: msg, type: "error" });
          })
      : removeCardLike(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => {
            console.error("Remove like failed:", err);
            const msg =
              err?.body?.message || err?.message || "Failed to remove like";
            setUiMessage({ text: msg, type: "error" });
          });
  };

  const handleEditProfile = ({ name, avatar }) => {
    updateUser({ name, avatar })
      .then((res) => {
        setCurrentUser(res.data || res);
        closeActiveModal();
      })
      .catch((error) => {
        console.error("Profile update failed:", error);
        const msg =
          error?.body?.message || error?.message || "Failed to update profile";
        setUiMessage({ text: msg, type: "error" });
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.location.reload();
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
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res.data || { email: res.email });
        })
        .catch((error) => {
          console.error("Token validation failed:", error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
          const msg =
            error?.body?.message || error?.message || "Session expired";
          setUiMessage({ text: msg, type: "info" });
        });
    }
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  // Effect for closing modals on "Escape" key press
  useEffect(() => {
    if (!activeModal) return; // stop the effect not to add the listener if there is no active modal

    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__wrapper">
            <Message
              message={uiMessage?.text}
              type={uiMessage?.type || "info"}
              onClose={() => setUiMessage(null)}
            />
            <Header
              handleAddBtn={handleAddBtn}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              setActiveModal={setActiveModal}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleDeleteBtn={handleDeleteBtn}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      handleAddBtn={handleAddBtn}
                      handleDeleteBtn={handleDeleteBtn}
                      clothingItems={clothingItems}
                      onEditProfile={() => setActiveModal("edit-profile")}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
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
          <RegisterModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "register"}
            onRegisterModalSubmit={handleRegisterModalSubmit}
            setActiveModal={setActiveModal}
          />
          <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "login"}
            onLoginModalSubmit={handleLoginModalSubmit}
            setActiveModal={setActiveModal}
          />
          <EditProfileModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            isOpen={activeModal === "edit-profile"}
            onEditProfileSubmit={handleEditProfile}
          />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/wtwr_logo.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddBtn, weatherData, isLoggedIn, setActiveModal }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    // Reset user state as needed
    window.location.reload();
  };

  // Create placeholder avatar with first letter of name
  const getPlaceholderAvatar = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const userInitial = currentUser?.name
    ? getPlaceholderAvatar(currentUser.name)
    : "?";
  const userName = currentUser?.name || currentUser?.email || "User";

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav--active" : ""
        }`}
      />
      <ToggleSwitch />
      {isLoggedIn ? (
        <>
          <button
            onClick={() => {
              handleAddBtn(), toggleMobileMenu();
            }}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{userName}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={userName}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar header__avatar_placeholder">
                  {userInitial}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setActiveModal("register");
              toggleMobileMenu();
            }}
            type="button"
            className="header__signup-btn"
          >
            Sign Up
          </button>
          <button
            onClick={() => {
              setActiveModal("login");
              toggleMobileMenu();
            }}
            type="button"
            className="header__login-btn"
          >
            Log In
          </button>
        </>
      )}

      {!isMobileMenuOpened && (
        <button
          className="header__mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        ></button>
      )}
    </header>
  );
}

export default Header;

import { useState } from "react";
import "./Header.css";
import logo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar_true.svg";
import HamburgerIcon from "../../assets/hamburger-icon.svg";
import CloseIcon from "../../assets/close-icon.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddBtn, weatherData }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR Logo" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <div
        className={`header__nav ${
          isMobileMenuOpened ? "header__nav--active" : ""
        }`}
      >
        <button
          onClick={() => {handleAddBtn(), toggleMobileMenu()}}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add Clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt={avatar.name} className="header__avatar" />
        </div>
        {isMobileMenuOpened && (
          <button
            className="header__mobile-close-btn"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
            imgsrc={CloseIcon}
          ></button>
        )}
      </div>

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

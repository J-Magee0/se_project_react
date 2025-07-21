import "./Header.css";
import logo from "../../assets/wtwr_logo.svg";
import avatar from "../../assets/avatar_true.svg";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

function Header({ handleAddBtn, weatherData }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR Logo" />
      <p className="header__date-and-location">{currentDate}, {weatherData.city}</p>
      <button
        onClick={handleAddBtn}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="User Avatar" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;

import { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit";

// ToggleSwitch component to switch between Fahrenheit and Celsius

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTempUnit } = useContext(
    CurrentTempUnitContext
  );

  return (
    <label className="toggle__switch">
      <input
        onChange={handleToggleSwitchChange}
        className="toggle__switch-checkbox"
        type="checkbox"
      />
      <span className="toggle__switch-circle"></span>
      <span
        style={{ color: currentTempUnit === "F" ? "white" : "" }}
        className="toggle__switch-temp toggle__switch-temp_F"
      >
        F
      </span>
      <span
        style={{ color: currentTempUnit === "C" ? "white" : "" }}
        className="toggle__switch-temp toggle__switch-temp_C"
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;

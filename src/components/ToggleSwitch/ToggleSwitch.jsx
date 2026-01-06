import { useContext } from "react";
import "./ToggleSwitch.css";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

// ToggleSwitch component to switch between Fahrenheit and Celsius

function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    currentTemperatureUnitContext
  );

  return (
    <label className="toggle__switch">
      <input
        onChange={handleToggleSwitchChange}
        className="toggle__switch-checkbox"
        type="checkbox"
        checked={currentTemperatureUnit === "C"}
      />
      <span className="toggle__switch-circle"></span>
      <span
        style={{ color: currentTemperatureUnit === "F" ? "white" : "" }}
        className="toggle__switch-temp toggle__switch-temp_F"
      >
        F
      </span>
      <span
        style={{ color: currentTemperatureUnit === "C" ? "white" : "" }}
        className="toggle__switch-temp toggle__switch-temp_C"
      >
        C
      </span>
    </label>
  );
}

export default ToggleSwitch;

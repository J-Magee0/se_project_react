import { createContext } from "react";

const CurrentTemperatureUnitContext = createContext({
  CurrentTemperatureUnit: "F",
  setCurrentTemperatureUnit: () => {},
});

export default CurrentTemperatureUnitContext;

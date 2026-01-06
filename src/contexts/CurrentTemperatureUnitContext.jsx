import { createContext } from "react";

const currentTemperatureUnitContext = createContext({
  CurrentTemperatureUnit: "F",
  setCurrentTemperatureUnit: () => {},
});

export default currentTemperatureUnitContext;

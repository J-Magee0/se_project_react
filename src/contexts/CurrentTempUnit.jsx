import { createContext } from "react";  
import "./CurrentTempUnit.css";

const CurrentTempUnitContext = createContext({
  currentTempUnit: "F",
  setCurrentTempUnit: () => {},
}); 

export default CurrentTempUnitContext;
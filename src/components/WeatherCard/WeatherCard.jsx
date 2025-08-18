import { useContext } from "react";
import "./WeatherCard.css";
import { weatherType, defaultWeatherType } from "../../utils/constants";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnit";

function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  if (
    !weatherData ||
    !weatherData.condition ||
    weatherData.isDay === undefined
  ) {
    return <p>loading...</p>; // or a loading indicator
  }

  const currentWeather = weatherType.filter((type) => {
    return (
      type.condition === weatherData.condition && type.day === weatherData.isDay
    );
  });

  let currentWeatherImage;

  if (currentWeather.length === 0) {
    currentWeatherImage =
      defaultWeatherType[weatherData.isDay ? "day" : "night"];
  } else {
    currentWeatherImage = currentWeather[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTempUnit]} &deg; {currentTempUnit}
      </p>
      <img
        src={currentWeatherImage?.url}
        alt={`Card showing ${
          currentWeatherImage?.day ? "night" : "day"
        } weather condition: ${weatherData.condition}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;

import { useContext } from "react";
import "./WeatherCard.css";
import { weather, defaultWeather } from "../../utils/constants";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);

  if (
    !weatherData ||
    !weatherData.condition ||
    weatherData.isDay === undefined
  ) {
    return <p>loading...</p>; // or a loading indicator
  }

  const currentWeather = weather.filter((type) => {
    return (
      type.condition === weatherData.condition && type.day === weatherData.isDay
    );
  });

  let currentWeatherImage;

  if (currentWeather.length === 0) {
    currentWeatherImage = defaultWeather[weatherData.isDay ? "day" : "night"];
  } else {
    currentWeatherImage = currentWeather[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
        {currentTemperatureUnit}
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

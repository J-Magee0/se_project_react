import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import currentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

// Main component to display weather and clothing items

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(currentTemperatureUnitContext);
  if (!weatherData || !weatherData.temp || !weatherData.type) {
    return <p>Loading...</p>; // or a loading indicator
  }

  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;

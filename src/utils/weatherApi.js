export const getWeatherData = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const res = {};
  res.city = data.name;
  res.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  res.type = getWeathertype(data.main.temp);
  res.condition = data.weather[0].main.toLowerCase();
  res.isDay = isDay(data.sys, Date.now());

  return res;
};

const isDay = ({ sunrise, sunset }, now) => {
  return now >= sunrise * 1000 && now < sunset * 1000;
};

const getWeathertype = (temp) => {
  if (temp >= 86) {
    return "hot";
  } else if (temp >= 66 && temp < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

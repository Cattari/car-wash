const checkForecastForRain = (forecast) => {
  return forecast.some((item) => {
    return item.weather.some((weather) => {
      console.log(weather.main);
      return weather.main.toLowerCase().includes('rain');
    });
  });
};

export default checkForecastForRain;

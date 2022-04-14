import { useEffect, useState } from "react";
import "../App.css";

const SearchWeather = () => {
  const [search, setSearch] = useState("Manchester");
  const [weatherData, setWeatherData] = useState({});
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=f6c6ca4478a624208f693170a66f8c41`
      );
      setWeatherData(await response.json());
    };
    fetchWeatherData();
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(textInput);
  };

  let date = new Date();
  let dateTime = date.toGMTString();

  let condition = "";
  if (weatherData.weather) {
    if (weatherData.weather[0].main === "Clear") condition = "sunny";
    else if (weatherData.weather[0].main === "Clouds") condition = "cloudy";
    else if (weatherData.weather[0].main === "Snow") condition = "snowy";
    else if (weatherData.weather[0].main === "Thunderstorm")
      condition = "stormy";
    else if (
      weatherData.weather[0].main === "Rain" ||
      weatherData.weather[0].main === "Drizzle"
    )
      condition = "rainy";
    else condition = "haze";
  }

  let windDirection = "";
  if (weatherData.wind) {
    if (weatherData.wind.deg >= 0 && weatherData.wind.deg < 22.5)
      windDirection = "North ⬇️";
    else if (weatherData.wind.deg >= 22.5 && weatherData.wind.deg < 67.5)
      windDirection = "Northeast ↙️";
    else if (weatherData.wind.deg >= 67.5 && weatherData.wind.deg < 112.5)
      windDirection = "East ⬅️";
    else if (weatherData.wind.deg >= 122.5 && weatherData.wind.deg < 157.5)
      windDirection = "Southeast ↖";
    else if (weatherData.wind.deg >= 157.5 && weatherData.wind.deg < 202.5)
      windDirection = "South ⬆️";
    else if (weatherData.wind.deg >= 202.5 && weatherData.wind.deg < 247.5)
      windDirection = "Southwest ↗️";
    else if (weatherData.wind.deg >= 247.5 && weatherData.wind.deg < 292.5)
      windDirection = "West ➡️";
    else if (weatherData.wind.deg >= 292.5 && weatherData.wind.deg < 337.5)
      windDirection = "Northwest ↘️";
    else if (weatherData.wind.deg >= 337.5 && weatherData.wind.deg < 360)
      windDirection = "North ⬇️";
  }

  return (
    <div>
      {weatherData.main ? (
        <div className={`page ${condition}`}>
          <h1 className="title">
            Jay's <br /> Weather Station
          </h1>
          <section className="search">
            <form onSubmit={handleSubmit}>
              <input
                className="searchbar"
                type="text"
                required
                placeholder="Where are you thinking?"
                onChange={(e) => setTextInput(e.target.value)}
              ></input>
              <button className="searchbutton" type="submit">
                Search
              </button>
            </form>
          </section>
          <section className="results-section">
            <h2 className="city-selection">{weatherData.name}</h2>
            <h3>{dateTime}</h3>
            <hr className="rule" />
            <div className="primary-results">
              <h2 className="temperature">{weatherData.main.temp}&deg;C</h2>
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="weather-icon"
              />
              <ul>
                <li>{weatherData.weather[0].main}</li>
                <p>{weatherData.weather[0].description}</p>
              </ul>
            </div>
            <hr className="rule" />
            <div className="upcoming">
              <p>
                Low {weatherData.main.temp_min}
                &deg;C | High {weatherData.main.temp_max}
                &deg;C
              </p>
            </div>
            <hr className="rule" />
            <div className="extra-info">
              <ul>
                <li>Humidity: {weatherData.main.humidity}%</li>
                <li>
                  Wind: {weatherData.wind.speed}m/s, coming from the{" "}
                  {windDirection}
                </li>
              </ul>
            </div>
          </section>
          <button>History</button>
        </div>
      ) : (
        <h1 className="loading-screen">Loading...</h1>
      )}
    </div>
  );
};

export default SearchWeather;

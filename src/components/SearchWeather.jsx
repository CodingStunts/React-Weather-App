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

  return (
    <div>
      {weatherData.main ? (
        <div className="page">
          <h1 className="title">Jay's Weather Station</h1>
          <section className="search">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                required
                placeholder="Where are you thinking?"
                onChange={(e) => setTextInput(e.target.value)}
              ></input>
              <button type="submit">Search</button>
            </form>
          </section>
          <section className="results-section">
            <h2 className="city-selection">{weatherData.name}</h2>
            <h3>{dateTime}</h3>
            <hr className="rule" />
            <div className="primary-results">
              <h2>{weatherData.main.temp}&deg;C</h2>
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
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
                  Wind: {weatherData.wind.speed} going {weatherData.wind.deg}
                </li>
              </ul>
            </div>
          </section>
          <button>History</button>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default SearchWeather;

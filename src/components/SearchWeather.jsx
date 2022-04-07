import { useEffect, useState } from "react";
import "../App.css";

const SearchWeather = () => {
  const [search, setSearch] = useState("Manchester");
  const [weatherData, setWeatherData] = useState([]);
  const [textInput, setTextInput] = useState("");
  let mounted = true;

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search},uk&APPID=f6c6ca4478a624208f693170a66f8c41`
      );
      if (mounted) {
        setWeatherData(await response.json());
        console.log(weatherData);
      }
      return () => {
        mounted = false;
      };
    };
    fetchWeatherData();
  }, []);

  return (
    <div className="page">
      <h1 className="title">Jay's UK Weather Station</h1>
      <section className="search">
        <form>
          <input type="text" placeholder="Where are you thinking?"></input>
        </form>
        <button type="submit">Search</button>
      </section>
      <section className="results-section">
        <h2 className="city-selection">{weatherData.name}</h2>
        <h3>*Current date and time*</h3>
        <hr className="rule" />
        <div className="primary-results">
          <h2>{weatherData.main.temp}&deg;C</h2>
          <i className="weather-icon">🌧️</i>
          <ul>
            <li>Windy</li>
            <li>Raining</li>
          </ul>
        </div>
        <hr className="rule" />
        <div className="upcoming">
          <ul>
            <li>12:00 - Low 11&deg;C | High 23&deg;C</li>
            <li>13:00 - Low 10&deg;C | High 22&deg;C</li>
            <li>14:00 - Low 9&deg;C | High 21&deg;C</li>
            <li>15:00 - Low 8&deg;C | High 20&deg;C</li>
            <li>16:00 - Low 7&deg;C | High 18&deg;C</li>
          </ul>
        </div>
        <hr className="rule" />
        <div className="extra-info">
          <ul>
            <li>UV Index</li>
            <li>Wind Strength</li>
          </ul>
        </div>
      </section>
      <button>History</button>
    </div>
  );
};

export default SearchWeather;

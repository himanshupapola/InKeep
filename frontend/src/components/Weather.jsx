import { useEffect, useState } from "react";
import useUserLocation from "../hooks/useUserLocation";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiFog,
  WiStrongWind,
  WiHumidity,
} from "react-icons/wi";
import "../styles/weather.css";

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

function getWeatherIcon(weather) {
  const condition = weather.toLowerCase();
  if (condition.includes("cloud")) return <WiCloudy />;
  if (condition.includes("rain")) return <WiRain />;
  if (condition.includes("sun")) return <WiDaySunny />;
  if (condition.includes("storm")) return <WiThunderstorm />;
  if (condition.includes("snow")) return <WiSnow />;
  if (condition.includes("fog") || condition.includes("mist")) return <WiFog />;
  return <WiDaySunny />;
}

function Weather() {
  const { location, error } = useUserLocation();
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${location.latitude}&lon=${location.longitude}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`
          );
          if (!response.ok) throw new Error("Weather API error");
          const data = await response.json();
          setForecast(data.daily);
          setLoading(false);
        } catch (err) {
          setFetchError(err.message);
          setLoading(false);
        }
      };

      const fetchCityAndCountry = async () => {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${location.latitude}&lon=${location.longitude}&limit=1&appid=${apiKey}`
          );
          const data = await res.json();
          if (data.length > 0) {
            setCity(data[0].name);
            setCountry(data[0].country);
          }
        } catch (err) {
          console.error("Error fetching city and country:", err);
        }
      };

      fetchCityAndCountry();
      fetchWeather();
    }
  }, [location]);

  if (error) return <p>Error getting location: {error}</p>;
  if (fetchError) return <p>Weather fetch error: {fetchError}</p>;
  if (loading || !forecast) return <p>Loading weather...</p>;

  const today = forecast[0];

  return (
    <div className="weather_container">
      <div className="weather_main">
        <div className="weather_left">
          <h3>{city.toUpperCase()}</h3>
          <div className="weather_icon_large">
            {getWeatherIcon(today.weather[0].main)}
          </div>
          <h2>{Math.round(today.temp.day)}°C</h2>
          <p>
            {today.weather[0].description.replace(/\b\w/g, (c) =>
              c.toUpperCase()
            )}
          </p>
          <div className="weather_details" style={{ display: "flex" }}>
            <p>
              <WiStrongWind
                style={{ verticalAlign: "middle", fontSize: "22px" }}
              />{" "}
              {today.wind_speed} m/s |
            </p>
            <p>
              <WiHumidity
                style={{ verticalAlign: "middle", fontSize: "22px" }}
              />{" "}
              {today.humidity}%
            </p>
          </div>
        </div>
        <div className="weather_right">
          {forecast.slice(1, 7).map((day, index) => {
            const date = new Date(day.dt * 1000);
            const dayName = date.toLocaleDateString("en-US", {
              weekday: "long",
            });
            return (
              <div className="day_card" key={index}>
                <p className="day_name">{dayName}</p>
                <div className="icon_small">
                  {getWeatherIcon(day.weather[0].main)}
                </div>
                <div className="day_temps">
                  <p className="temp_high">{Math.round(day.temp.max)}°C</p>
                  <p className="temp_low">{Math.round(day.temp.min)}°C</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Weather;

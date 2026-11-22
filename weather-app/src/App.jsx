import { useState, useRef, useEffect } from "react";
import logo from "./assets/images/logo.svg";
import sunnyIcon from "./assets/images/icon-sunny.webp";
import dropdownIcon from "./assets/images/icon-dropdown.svg";
import gearIcon from "./assets/images/icon-units.svg";
import checkmarkIcon from "./assets/images/icon-checkmark.svg";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";
import HourlyForecast from "./HourlyForecast";
import Dropdown from "./Dropdown";
import DayCard from "./DayCard";
import WeatherToday from "./WeatherToday";
import RowCard from "./RowCard";

import "./app.css";

function App() {
  const [tempUnit, setTempUnit] = useState("°C");
  const [speedUnit, setSpeedUnit] = useState("km/h");
  const [precipitationUnit, setPrecipitationUnit] = useState("mm");
  const [place, setPlace] = useState({
    name: "Amman",
    country: "Jordan",
    latitude: 31.95522,
    longitude: 35.94503,
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["forecast", place, tempUnit, speedUnit, precipitationUnit],

    queryFn: () =>
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,wind_speed_10m,apparent_temperature,relative_humidity_2m&timezone=auto${speedUnit == "mph" ? `&wind_speed_unit=mph` : ""}${tempUnit == "°F" ? `&temperature_unit=fahrenheit` : ""}${tempUnit == "in" ? `&precipitation_unit=inch` : ""}`,
      ).then((res) => res.json()),
  });
  return (
    <div className="app">
      <div className="app__header">
        <img src={logo} />
        <Dropdown
          heading={
            <>
              <div className="units-button">
                <div className="units-button__label">
                  <img src={gearIcon} width={15} height={15} />
                  Units
                </div>{" "}
                <img src={dropdownIcon} width={10} height={10} />
              </div>
            </>
          }
          options={
            <>
              <button
                className="dropdown__option"
                onClick={() => {
                  if (
                    tempUnit == "°F" &&
                    speedUnit == "mph" &&
                    precipitationUnit == "in"
                  ) {
                    setTempUnit("°C");
                    setSpeedUnit("km/h");
                    setPrecipitationUnit("mm");
                  } else {
                    setTempUnit("°F");
                    setSpeedUnit("mph");
                    setPrecipitationUnit("in");
                  }
                }}
              >
                {tempUnit == "°F" &&
                speedUnit == "mph" &&
                precipitationUnit == "in"
                  ? "Switch to Metric"
                  : "Switch to Imperial"}
              </button>
              <p className="dropdown__label">Temperature</p>
              <button
                className="dropdown__option"
                onClick={() => setTempUnit("°C")}
              >
                Celsius (°C){tempUnit == "°C" && <img src={checkmarkIcon} />}
              </button>
              <button
                className="dropdown__option"
                onClick={() => setTempUnit("°F")}
              >
                Fahrenheit (°F){tempUnit == "°F" && <img src={checkmarkIcon} />}
              </button>
              <hr />
              <p className="dropdown__label">Wind Speed</p>
              <button
                className="dropdown__option"
                onClick={() => setSpeedUnit("km/h")}
              >
                km/h{speedUnit == "km/h" && <img src={checkmarkIcon} />}
              </button>
              <button
                className="dropdown__option"
                onClick={() => setSpeedUnit("mph")}
              >
                mph {speedUnit == "mph" && <img src={checkmarkIcon} />}
              </button>
              <hr />
              <p className="dropdown__label">Precipitation</p>
              <button
                className="dropdown__option"
                onClick={() => setPrecipitationUnit("mm")}
              >
                Milimeters (mm){" "}
                {precipitationUnit == "mm" && <img src={checkmarkIcon} />}
              </button>
              <button
                className="dropdown__option"
                onClick={() => setPrecipitationUnit("in")}
              >
                Inches (in){" "}
                {precipitationUnit == "in" && <img src={checkmarkIcon} />}
              </button>
            </>
          }
        />
      </div>
      <h1 className="app__title">How's the sky looking today?</h1>
      <SearchBar setPlace={setPlace} />
      {data && data.error ? (
        <h2 className="app__error">No search result found!</h2>
      ) : (
        <div className="app__main">
          <div className="app__content">
            {isPending ? (
              <div className="weather-today weather-today--loading">
                <h1 className="weather-today__loading-dots">. . .</h1>
                <p className="weather-today__loading-text">Loading...</p>
              </div>
            ) : (
              <WeatherToday
                city={place.name}
                country={place.country}
                temperature={data.current.temperature_2m}
                weather="sunny"
                date={new Date(data.current.time)}
              />
            )}
            <div className="app__stats">
              <RowCard
                text="Feels like"
                value={
                  isPending ? "-" : data.current.apparent_temperature + "°"
                }
              />
              <RowCard
                text="Humidity"
                value={
                  isPending ? "-" : data.current.relative_humidity_2m + "%"
                }
              />
              <RowCard
                text="Wind"
                value={
                  isPending
                    ? "-"
                    : Math.round(data.current.wind_speed_10m) + " " + speedUnit
                }
              />
              <RowCard
                text="Precipitation"
                value={
                  isPending
                    ? "-"
                    : `${data.current.precipitation} ${precipitationUnit}`
                }
              />
            </div>
            <p className="app__section-title">Daily forecast:</p>
            <div className="app__daily">
              {Array(7)
                .fill(0)
                .map((d, index) =>
                  isPending ? (
                    <div
                      key={index}
                      className="day-card day-card--loading"
                    ></div>
                  ) : (
                    <DayCard
                      key={data.daily.time[index]}
                      day={new Date(data.daily.time[index]).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "short",
                        },
                      )}
                      high={Math.round(data.daily.temperature_2m_max[index])}
                      low={Math.round(data.daily.temperature_2m_min[index])}
                      weather={sunnyIcon}
                    />
                  ),
                )}
            </div>
          </div>
          <HourlyForecast data={data} isPending={isPending} />
        </div>
      )}
    </div>
  );
}

export default App;

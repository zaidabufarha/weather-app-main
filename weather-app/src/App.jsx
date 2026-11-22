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
    queryKey: ["geocode", place, tempUnit, speedUnit, precipitationUnit],

    queryFn: () =>
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,precipitation,weather_code,wind_speed_10m,apparent_temperature,relative_humidity_2m&timezone=auto${speedUnit == "mph" ? `&wind_speed_unit=mph` : ""}${tempUnit == "°F" ? `&temperature_unit=fahrenheit` : ""}${tempUnit == "in" ? `&precipitation_unit=inch` : ""}`,
      ).then((res) => res.json()),
  });
  //if (isPending) return "Loading...";
  //if (!isPending && !data.latitude && data.generationtime_ms) return "hi";
  //if (error) return "An error has occured: " + error.message;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: " #02012b",
        margin: 0,
        width: "100%",
        minHeight: "100vh",
        padding: 40,
        alignItems: "center",
        gap: 20,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <img src={logo} />
        <Dropdown
          heading={
            <>
              <div
                style={{
                  display: "flex",
                  borderRadius: 10,
                  backgroundColor: "hsl(243, 23%, 30%)",
                  color: "white",
                  padding: 10,
                  width: 100,
                  height: 40,
                  gap: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ display: "flex", gap: 5 }}>
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
              <p
                style={{
                  margin: 0,
                  padding: 10,
                  textAlign: "left",
                  fontSize: 11,
                  color: "hsl(243, 23%, 80%)",
                }}
              >
                Temperature
              </p>
              <button onClick={() => setTempUnit("°C")}>
                Celsius (°C){tempUnit == "°C" && <img src={checkmarkIcon} />}
              </button>
              <button onClick={() => setTempUnit("°F")}>
                Fahrenheit (°F){tempUnit == "°F" && <img src={checkmarkIcon} />}
              </button>
              <hr />
              <p
                style={{
                  margin: 0,
                  padding: 10,
                  textAlign: "left",
                  fontSize: 11,
                  color: "hsl(243, 23%, 80%)",
                }}
              >
                Wind Speed
              </p>
              <button onClick={() => setSpeedUnit("km/h")}>
                km/h{speedUnit == "km/h" && <img src={checkmarkIcon} />}
              </button>
              <button onClick={() => setSpeedUnit("mph")}>
                mph {speedUnit == "mph" && <img src={checkmarkIcon} />}
              </button>
              <hr />
              <p
                style={{
                  margin: 0,
                  padding: 10,
                  textAlign: "left",
                  fontSize: 11,
                  color: "hsl(243, 23%, 80%)",
                }}
              >
                Precipitation
              </p>
              <button onClick={() => setPrecipitationUnit("mm")}>
                Milimeters (mm){" "}
                {precipitationUnit == "mm" && <img src={checkmarkIcon} />}
              </button>
              <button onClick={() => setPrecipitationUnit("in")}>
                Inches (in){" "}
                {precipitationUnit == "in" && <img src={checkmarkIcon} />}
              </button>
            </>
          }
        />
      </div>
      <h1
        style={{
          color: "white",
          fontFamily: "Bricolage Grotesque",
          fontWeight: 700,
          fontSize: "60px",
          textAlign: "center",
        }}
      >
        How's the sky looking today?
      </h1>
      <SearchBar setPlace={setPlace} />
      {data && data.error ? (
        <h2 style={{ color: "white", fontFamily: "DM Sans" }}>
          No search result found!
        </h2>
      ) : (
        <div style={{ display: "flex", gap: 20 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 30,
            }}
          >
            {isPending ? (
              <div
                style={{
                  backgroundColor: "#25253f",
                  height: 286,
                  width: 800,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 20,
                  color: "white",
                  fontFamily: "DM Sans",
                }}
              >
                <h1 style={{ fontSize: 100, margin: 0 }}>. . .</h1>
                <p style={{ margin: 0 }}>Loading...</p>
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
            <div style={{ display: "flex", gap: 30, width: 800, margin: 0 }}>
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
            <p
              style={{
                color: "white",
                fontFamily: "DM Sans",
                margin: 0,
                fontSize: "18px",
              }}
            >
              Daily forecast:
            </p>
            <div
              style={{
                display: "flex",
                gap: 20,
                width: 800,
                margin: 0,
              }}
            >
              {Array(7)
                .fill(0)
                .map((d, index) =>
                  isPending ? (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "hsl(243, 23%, 30%)",
                        padding: 10,
                        borderRadius: 10,
                        alignItems: "center",
                        color: "white",
                        fontSize: 18,
                        fontFamily: "DM Sans",
                        margin: 0,
                        height: 144,
                        flex: 1,
                      }}
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

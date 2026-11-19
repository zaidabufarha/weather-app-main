import { useState, useRef, useEffect } from "react";
import backgroundTodayLarge from "./assets/images/bg-today-large.svg";
import logo from "./assets/images/logo.svg";
import sunnyIcon from "./assets/images/icon-sunny.webp";
import dropdownIcon from "./assets/images/icon-dropdown.svg";
import gearIcon from "./assets/images/icon-units.svg";
import checkmarkIcon from "./assets/images/icon-checkmark.svg";
import SearchBar from "./SearchBar";
import { useQuery } from "@tanstack/react-query";

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
      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          {isPending ? (
            <h1>hi</h1>
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
              value={isPending ? "-" : data.current.apparent_temperature + "°"}
            />
            <RowCard
              text="Humidity"
              value={isPending ? "-" : data.current.relative_humidity_2m + "%"}
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
    </div>
  );
}

function RowCard({ text, value }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "hsl(243, 23%, 30%)",
        padding: 20,
        borderRadius: 10,
        flex: 1,
      }}
    >
      <p
        style={{
          color: "white",
          fontSize: 20,
          fontFamily: "DM Sans",
          margin: 0,
        }}
      >
        {text}
      </p>
      <p
        style={{
          color: "white",
          fontSize: 36,
          fontFamily: "DM Sans",
          margin: 0,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function WeatherToday({ city, country, date, temperature, weather }) {
  return (
    <div
      style={{
        background: `url(${backgroundTodayLarge})`,
        height: 286,
        width: 800,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p
          style={{
            color: "white",
            fontSize: 30,
            fontFamily: "DM Sans",
            fontWeight: 700,
            margin: 0,
          }}
        >
          {country != undefined && country != city
            ? `${city}, ${country}`
            : `${city}`}
        </p>
        <p
          style={{
            color: "white",
            fontSize: 20,
            fontFamily: "DM Sans",
            fontWeight: 500,
            margin: 0,
          }}
        >
          {date.toLocaleDateString("en-US", {
            //US format for month first
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <img
          src={weather === "sunny" ? sunnyIcon : dropdownIcon}
          width={100}
          height={100}
        />
        <h1
          style={{
            color: "white",
            fontSize: 90,
            fontFamily: "DM Sans",
            fontWeight: 500,
            fontStyle: "italic",
          }}
        >
          {temperature}°
        </h1>
      </div>
    </div>
  );
}
function HourCard({ icon, hour, temperature }) {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "white",
        justifyContent: "space-between",
        padding: 5,
        backgroundColor: "#2F2F49",
        alignContent: "center",
        gap: 20,
        fontSize: 20,
        borderRadius: 10,
        color: "white",
        fontFamily: "DM Sans",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src={icon} width={50} height={50} />
        <p>{hour}</p>
      </div>
      <p
        style={{
          fontSize: 18,
          marginRight: 10,
        }}
      >
        {temperature}°
      </p>
    </div>
  );
}
function DayCard({ day, weather, high, low }) {
  return (
    <div
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
        flex: 1,
      }}
    >
      <p style={{ fontSize: 24, margin: 0 }}>{day}</p>
      <img src={weather} style={{ width: 70 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <p style={{ margin: 0 }}>{high}</p>
        <p style={{ margin: 0 }}>{low}</p>
      </div>
    </div>
  );
}
function Dropdown({ heading, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <div style={{ position: "relative" }} ref={ref}>
      <button
        style={{
          display: "flex",
          borderRadius: 10,
          backgroundColor: "hsl(243, 23%, 30%)",
          color: "white",
          padding: 20,
          width: 110,
          height: 40,
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "DM Sans",
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        {heading}
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="dropdown"
          style={{
            position: "absolute",
            right: 0,
            top: "110%",
            borderRadius: 10,
            backgroundColor: "hsl(243, 23%, 30%)",
            color: "white",
            width: 150,
            padding: 5,
            fontFamily: "DM Sans",
            textAlign: "left",
          }}
        >
          {options}
        </div>
      )}
    </div>
  );
}
function HourlyForecast({ data, isPending }) {
  const [dayOffset, setDayOffset] = useState(0);
  return (
    <div
      style={{
        display: "flex",
        borderRadius: 10,
        height: 660,
        width: 350,
        flex: 1,
        gap: 10,
        backgroundColor: "#25253f",
        padding: 20,
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <p style={{ color: "white", fontSize: 20, fontFamily: "DM Sans" }}>
          Hourly forecast
        </p>
        <Dropdown
          heading={
            isPending ? (
              "-"
            ) : (
              <>
                {new Date(data.daily.time[dayOffset]).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                  },
                )}
                <img src={dropdownIcon} width={10} height={10} />
              </>
            )
          }
          options={
            isPending ? (
              "-"
            ) : (
              <>
                {data.daily.time.map((d, index) => (
                  <button
                    onClick={() => {
                      setDayOffset(index);
                    }}
                    key={d}
                  >
                    {new Date(d).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}
                  </button>
                ))}
              </>
            )
          }
        />
      </div>
      {Array(24)
        .fill("")
        .map((i, index) =>
          isPending ? (
            <HourCard />
          ) : (
            <HourCard
              key={data.hourly.time[index + 24 * dayOffset]}
              temperature={data.hourly.temperature_2m[index + 24 * dayOffset]}
              icon={sunnyIcon}
              hour={`${new Date(
                data.hourly.time[index + 24 * dayOffset],
              ).toLocaleTimeString("en-US", {
                hour: "numeric",
              })}`}
            />
          ),
        )}
    </div>
  );
}

export default App;

import { useState } from "react";
import searchIcon from "./assets/images/icon-search.svg";
import backgroundTodayLarge from "./assets/images/bg-today-large.svg";
import backgroundTodaySmall from "./assets/images/bg-today-small.svg";
import logo from "./assets/images/logo.svg";
import sunnyIcon from "./assets/images/icon-sunny.webp";
import dropdownIcon from "./assets/images/icon-dropdown.svg";
import gearIcon from "./assets/images/icon-units.svg";

import "./app.css";
function App() {
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
        <button
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
          <img src={gearIcon} width={15} height={15} />
          Units <img src={dropdownIcon} width={10} height={10} />
        </button>
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
      <div style={{ display: "flex", gap: 15 }}>
        <SearchBar /> <SearchButton />
      </div>
      <div style={{ display: "flex", gap: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 30,
          }}
        >
          <WeatherToday
            city="Berlin"
            country="Germany"
            temperature="20"
            weather="sunny"
            date={new Date("2025-08-05")}
          />
          <div style={{ display: "flex", gap: 30, width: 800, margin: 0 }}>
            <RowCard text="Feels like" value="18°" />
            <RowCard text="Humidity" value="46%" />
            <RowCard text="Wind" value="14km/h" />
            <RowCard text="Precipitation" value="0mm" />
          </div>
          <p style={{ color: "white", fontFamily: "DM Sans", margin: 0 }}>
            Daily forecast:
          </p>
          <div style={{ display: "flex", gap: 30, width: 800, margin: 0 }}>
            <RowCard text="Feels like" value="18°" />
            <RowCard text="Humidity" value="46%" />
            <RowCard text="Wind" value="14km/h" />
            <RowCard text="Precipitation" value="0mm" />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            borderRadius: 10,
            width: 350,
            height: 600,
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
            <button
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
              Tuesday <img src={dropdownIcon} width={10} height={10} />
            </button>
          </div>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
            <HourCard temperature={20} icon={sunnyIcon} hour={"3 PM"} />
          ))}
        </div>
      </div>
    </div>
  );
}
function SearchBar() {
  const [input, setInput] = useState("");

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#25253f",
        width: 500,
        height: 50,
        padding: 10,
        alignContent: "center",
        gap: 20,
        borderRadius: 10,
      }}
    >
      <img src={searchIcon} style={{ width: 25 }} />
      <input
        value={input}
        onChange={(i) => setInput(i.target.value)}
        placeholder="Search for a place..."
        style={{
          width: 800,
          margin: 0,
          fontSize: "18px",
          borderWidth: 0,
          backgroundColor: "transparent",
          color: "white",
        }}
      ></input>
    </div>
  );
}
function SearchButton() {
  return (
    <button
      style={{
        borderRadius: 10,
        backgroundColor: "hsl(233, 67%, 56%)",
        color: "white",
        padding: 10,
        width: 100,
      }}
    >
      Search
    </button>
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
        width: 180,
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
          fontSize: 40,
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
          {city}, {country}
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
        padding: 10,
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

export default App;

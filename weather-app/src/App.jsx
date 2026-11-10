import { useState } from "react";
import searchIcon from "./assets/images/icon-search.svg";
import backgroundTodayLarge from "./assets/images/bg-today-large.svg";
import backgroundTodaySmall from "./assets/images/bg-today-small.svg";
import logo from "./assets/images/logo.svg";
import sunnyIcon from "./assets/images/icon-sunny.webp";
import dropdownIcon from "./assets/images/icon-dropdown.svg";

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
        height: "100vh",
        padding: 20,
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
        <button>hi</button>
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
            height: 500,
          }}
        >
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
                  fontWeight: 500,
                  margin: 0,
                }}
              >
                Berlin, Germany
              </p>
              <p
                style={{
                  color: "white",
                  fontSize: 20,
                  fontFamily: "DM Sans",
                  fontWeight: 300,
                  margin: 0,
                }}
              >
                Tuesday, Aug 5, 2025
              </p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={sunnyIcon} width={80} height={80} />
              <h1
                style={{
                  color: "white",
                  fontSize: 60,
                  fontFamily: "DM Sans",
                  fontWeight: 500,
                  fontStyle: "italic",
                }}
              >
                20°
              </h1>
            </div>
          </div>
          <div style={{ display: "flex", gap: 30, width: 800, margin: 0 }}>
            <RowCard />
            <RowCard />
            <RowCard />
            <RowCard />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            height: 500,
            borderRadius: 10,
            width: 350,
            backgroundColor: "#25253f",
            padding: 20,
            flexDirection: "column",
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
              Tuesday <img src={dropdownIcon} width={15} height={15} />
            </button>
          </div>
          <h1>hi</h1>
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
function RowCard() {
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
        Feels like
      </p>
      <p
        style={{
          color: "white",
          fontSize: 40,
          fontFamily: "DM Sans",
          margin: 0,
        }}
      >
        20
      </p>
    </div>
  );
}

export default App;

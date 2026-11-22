import backgroundTodayLarge from "./assets/images/bg-today-large.svg";
import sunnyIcon from "./assets/images/icon-sunny.webp";

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
export default WeatherToday;

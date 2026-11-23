import getWeatherIcon from "./WeatherIcon";

function WeatherToday({ city, country, date, temperature, weather }) {
  return (
    <div className="weather-today">
      <div className="weather-today__info">
        <p className="weather-today__location">
          {country != undefined && country != city
            ? `${city}, ${country}`
            : `${city}`}
        </p>
        <p className="weather-today__date">
          {date.toLocaleDateString("en-US", {
            //US format for month first
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
      <div className="weather-today__current">
        <img src={weather} width={100} height={100} />
        <h1 className="weather-today__temp">{Math.round(temperature)}°</h1>
      </div>
    </div>
  );
}
export default WeatherToday;

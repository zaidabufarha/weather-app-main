import { useState } from "react";
import HourCard from "./HourCard";
import Dropdown from "./Dropdown";
import dropdownIcon from "./assets/images/icon-dropdown.svg";
import sunnyIcon from "./assets/images/icon-sunny.webp";

function HourlyForecast({ data, isPending }) {
  const [dayOffset, setDayOffset] = useState(0);
  return (
    <div className="hourly-forecast">
      <div className="hourly-forecast__header">
        <p className="hourly-forecast__title">Hourly forecast</p>
        <Dropdown
          heading={
            isPending ? (
              <>
                - <img src={dropdownIcon} width={10} height={10} />
              </>
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
                    className="dropdown__option"
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
            <div key={index} className="hour-card">
              <div className="hour-card__placeholder"></div>
            </div>
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
export default HourlyForecast;

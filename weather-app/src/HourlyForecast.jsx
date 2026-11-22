import { useState } from "react";
import HourCard from "./HourCard";
import Dropdown from "./Dropdown";
import dropdownIcon from "./assets/images/icon-dropdown.svg";
import sunnyIcon from "./assets/images/icon-sunny.webp";

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
            <div
              key={index}
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
              <div style={{ height: 65 }}></div>
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

import { useState, useRef, useEffect } from "react";
import searchIcon from "./assets/images/icon-search.svg";
import { useQuery } from "@tanstack/react-query";
import "./app.css";

function SearchBar({ setPlace }) {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);

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

  const { isPending, error, data } = useQuery({
    queryKey: ["geocode", debouncedInput],
    enabled: input.length > 2,
    queryFn: () =>
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedInput}&count=3&language=en&format=json`,
      ).then((res) => res.json()),
  });
  // if (isPending) return "Loading...";

  // if (error) return "An error has occured: " + error.message;

  return (
    <form
      style={{ display: "flex", gap: 10 }}
      onSubmit={(e) => {
        e.preventDefault();
        setPlace({
          name: data.results[0].name,
          country: data.results[0].country,
          latitude: data.results[0].latitude,
          longitude: data.results[0].longitude,
        });
      }}
    >
      <div
        ref={ref}
        onClick={() => {
          setOpen(!open);
        }}
        style={{
          position: "relative",
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

        {data && open && data.results && (
          <div
            className="suggestion"
            style={{
              position: "absolute",
              width: "100%",
              left: 0,
              padding: 5,
              borderRadius: 10,
              top: "110%",
              backgroundColor: "#25253f",
              color: "white",
              fontFamily: "DM Sans",
              fontSize: 9,
              margin: 0,
            }}
          >
            {data.results.map((r) => (
              <button
                onClick={() =>
                  setPlace({
                    name: r.name,
                    country: r.country,
                    latitude: r.latitude,
                    longitude: r.longitude,
                  })
                }
              >
                {r.name != r.country && r.country != undefined
                  ? `${r.name}, ${r.country}`
                  : r.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <button
        type="submit"
        style={{
          borderRadius: 10,
          backgroundColor: "hsl(233, 67%, 56%)",
          color: "white",
          padding: 10,
          width: 100,
          fontSize: 18,
        }}
      >
        Search
      </button>
    </form>
  );
}
export default SearchBar;

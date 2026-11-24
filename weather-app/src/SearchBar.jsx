import { useState, useRef, useEffect } from "react";
import searchIcon from "./assets/images/icon-search.svg";
import loadingIcon from "./assets/images/icon-loading.svg";
import useExternalClickDetector from "./useExternalClickDetector";
import { useQuery } from "@tanstack/react-query";
import "./app.css";

function SearchBar({ setPlace, setNoResults }) {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  useExternalClickDetector(ref, setOpen);

  const { isPending, error, data, isLoading } = useQuery({
    queryKey: ["geocode", debouncedInput],
    enabled: input.length > 2,
    queryFn: () =>
      fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${debouncedInput}&count=3&language=en&format=json`,
      ).then((res) => res.json()),
  });
  // if (isPending) return "Loading...";

  // if (error) return "An error has occured: " + error.message;

  useEffect(() => {
    if (data && data.results && submitting) {
      setPlace({
        name: data.results[0].name,
        country: data.results[0].country,
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude,
      });
      setNoResults(false);
      setSubmitting(false);
    } else if (data && data.generationtime_ms && submitting) {
      //response with no data
      setNoResults(true);
      setSubmitting(false);
      setOpen(true);
    }
  }, [submitting, data]);
  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        setDebouncedInput(input);
        setSubmitting(true);
        setOpen(false);
      }}
    >
      <div ref={ref} className="search-bar__field">
        <img src={searchIcon} className="search-bar__icon" />
        <input
          className="search-bar__input"
          onClick={() => {
            setOpen(true);
          }}
          value={input}
          onChange={(i) => setInput(i.target.value)}
          placeholder="Search for a place..."
        ></input>

        {data && open && data.results ? (
          <div className="search-bar__suggestions">
            {data.results.map((r) => (
              <button
                type="button"
                className="search-bar__suggestion"
                key={r.id}
                onClick={() => {
                  setPlace({
                    name: r.name,
                    country: r.country,
                    latitude: r.latitude,
                    longitude: r.longitude,
                  });
                  setOpen(false);
                  setNoResults(false);
                }}
              >
                {r.name != r.country && r.country != undefined
                  ? `${r.name}, ${r.country}`
                  : r.name}
              </button>
            ))}
          </div>
        ) : isLoading ? (
          <div className="search-bar__suggestions">
            <div className="search-bar__suggestion">
              <img src={loadingIcon} style={{ marginRight: "1vw" }} />
              Search in progress
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <button type="submit" className="search-bar__submit">
        Search
      </button>
    </form>
  );
}
export default SearchBar;

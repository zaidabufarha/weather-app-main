import { useState, useRef, useEffect } from "react";

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

export default Dropdown;

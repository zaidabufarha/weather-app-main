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
    <div className="dropdown" ref={ref}>
      <button
        className="dropdown__toggle"
        onClick={() => {
          setOpen(!open);
        }}
      >
        {heading}
      </button>
      {open && (
        <div onClick={() => setOpen(false)} className="dropdown__menu">
          {options}
        </div>
      )}
    </div>
  );
}

export default Dropdown;

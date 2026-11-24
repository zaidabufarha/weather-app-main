import { useState, useRef, useEffect } from "react";
import useExternalClickDetector from "./useExternalClickDetector";
function Dropdown({ heading, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useExternalClickDetector(ref, setOpen);
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

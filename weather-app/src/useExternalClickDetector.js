import { useEffect } from "react";
function useExternalClickDetector(ref, setOpen){
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
  }, [ref, setOpen]);

}
export default useExternalClickDetector
import { useEffect, useState } from "react";

export function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    function windowSizeChangeHandler() {
      setIsMobile(window.innerWidth < 640);
    }
    window.addEventListener("resize", windowSizeChangeHandler);
    return () => window.removeEventListener("resize", windowSizeChangeHandler);
  }, []);
  return isMobile;
}

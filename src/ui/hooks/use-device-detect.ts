import { useEffect, useState } from "react";

export default function useDeviceDetect() {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      const screenWidth = window.innerWidth;
      const isMobile = screenWidth < 920; 
      setMobile(isMobile);
    };

    checkIsMobile();

   
    window.addEventListener("resize", checkIsMobile);

   
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  return { isMobile };
}

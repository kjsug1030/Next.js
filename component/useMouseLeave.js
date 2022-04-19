import { useEffect, useRef } from "react";

const useMouseLeave = (handler) => {
  if (typeof handler !== "function") {
    return;
  }

  const element = useRef();
  useEffect(() => {
    const { canvas } = element.current && element.current.chartInstance;
    if (element.current) {
      canvas.addEventListener("mouseleave", handler);
    }
    return () => {
      if (element.current) {
        canvas.removeEventListener("mouseleave", handler);
      }
    };
  }, []);
  return element;
};

export default useMouseLeave;
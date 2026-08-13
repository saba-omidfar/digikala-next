"use client";

import { useEffect, useState } from "react";

export default function useScreenStatus() {
  const getSize = () => ({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  const [size, setSize] = useState(getSize);
  const [isClientReady, setIsClientReady] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      document.documentElement.style.setProperty(
        "--window-inner-height",
        `${window.innerHeight}px`,
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    setIsClientReady(true);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { width, height } = size;

  return {
    innerWidth: width,
    innerHeight: height,

    isSmallScreen: width <= 1024,
    isMobile: width <= 640,
    isSmallMobile: width <= 360,

    isClientReady,
  };
}

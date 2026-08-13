"use client";

import { useEffect, useState } from "react";

export function useScrollStatus() {
  const [isScrolledY, setIsScrolledY] = useState(false);
  const [isLightIndexMobileHeader, setIsLightIndexMobileHeader] =
    useState(false);
  const [isIndexMobileHeaderScrolledY, setIsIndexMobileHeaderScrolledY] =
    useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setIsScrolledY(currentY > 105 && currentY > lastY);

      setIsLightIndexMobileHeader(currentY >= 200);
      setIsIndexMobileHeaderScrolledY(currentY >= 373);

      lastY = currentY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isScrolledY,
    isLightIndexMobileHeader,
    isIndexMobileHeaderScrolledY,
  };
}

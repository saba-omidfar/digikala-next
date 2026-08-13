"use client";

import { useEffect, useState } from "react";

export function useMobileHeaderScroll() {
  const [isLightIndexMobileHeader, setIsLightIndexMobileHeader] =
    useState(false);

  const [isIndexMobileHeaderScrolledY, setIsIndexMobileHeaderScrolledY] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      setIsLightIndexMobileHeader(y >= 200);
      setIsIndexMobileHeaderScrolledY(y >= 35);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    isLightIndexMobileHeader,
    isIndexMobileHeaderScrolledY,
  };
}

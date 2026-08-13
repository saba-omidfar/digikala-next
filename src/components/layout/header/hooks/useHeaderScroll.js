"use client";

import { useEffect, useState } from "react";

export function useHeaderScroll() {
  const [hideMenuOnTop, setHideMenuOnTop] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;

      setHideMenuOnTop(currentY >= 105 && currentY > lastScrollY);

      lastScrollY = currentY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    hideMenuOnTop,
  };
}

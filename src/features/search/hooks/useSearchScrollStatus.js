"use client";

import { useEffect, useState } from "react";

export function useSearchScrollStatus() {
  const [searchpageIsScrolledY, setSearchpageIsScrolledY] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSearchpageIsScrolledY(window.scrollY > 64);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return {
    searchpageIsScrolledY,
  };
}

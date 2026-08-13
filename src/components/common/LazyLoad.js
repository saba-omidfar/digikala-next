"use client";

import { useRef, useEffect, useState } from "react";

export default function LazyLoad({
  children,
  onVisible,
  rootMargin = "200px",
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || isVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          onVisible && onVisible(); // فقط یکبار اجرا میشه
          observer.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [onVisible, isVisible]);

  return <div ref={ref}>{children}</div>;
}

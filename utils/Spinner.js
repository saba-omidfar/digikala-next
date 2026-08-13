"use client";

import { useEffect, useRef } from "react";

export default function Spinner({ size, color = "#000", loading = true }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!loading || !ref.current) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    const dpr = window.devicePixelRatio || 1;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let start = performance.now();
    let frame;

    const draw = (a, b) => {
      ctx.clearRect(0, 0, size, size);

      const lw = size * 0.08;

      ctx.beginPath();
      ctx.strokeStyle = "#e5e5e5";
      ctx.lineWidth = lw;
      ctx.arc(size / 2, size / 2, size / 2 - lw, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.lineCap = "round";
      ctx.arc(size / 2, size / 2, size / 2 - lw, a, b);
      ctx.stroke();
    };

    const animate = (t) => {
      const elapsed = t - start;

      const startAngle = ((elapsed % 1500) / 1500) * Math.PI * 2;
      const endAngle = startAngle + 1.5;

      draw(startAngle, endAngle);

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frame);
  }, [loading, size, color]);

  return <canvas ref={ref} />;
}

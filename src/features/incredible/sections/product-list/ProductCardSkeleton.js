"use client";

import React from "react";
import useScreenStatus from "@/hooks/useScreenStatus";

export default function ProductCardSkeleton() {
  const { isSmallScreen } = useScreenStatus();

  const uniqueId = React.useId();
  const clipId = `product-card-clip-${uniqueId}`;
  const gradientId = `product-card-gradient-${uniqueId}`;

  if (isSmallScreen) {
    return (
      <svg
        aria-labelledby="product-card-loading"
        role="img"
        viewBox="0 0 400 156"
        className="m-auto w-100 h-100"
      >
        <title id="product-card-loading">Loading...</title>

        <rect
          role="presentation"
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath={`url(#${clipId})`}
          style={{ fill: `url(#${gradientId})` }}
        ></rect>

        <defs>
          <clipPath id={clipId}>
            <rect x="282" y="28" rx="2" ry="2" width="118" height="118"></rect>
            <rect x="0" y="28" rx="2" ry="2" width="270" height="20"></rect>
            <rect x="190" y="56" rx="2" ry="2" width="80" height="26"></rect>
            <rect x="0" y="110" rx="2" ry="2" width="80" height="20"></rect>
            <rect x="150" y="110" rx="2" ry="2" width="120" height="20"></rect>
          </clipPath>

          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor="#f3f3f3" stopOpacity="1"></stop>
            <stop offset="50%" stopColor="#ecebeb" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="#f3f3f3" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <div className="product_list__item">
      <svg
        aria-labelledby="product-card-loading"
        role="img"
        viewBox="0 0 320 530"
        className="m-auto w-100 h-100"
      >
        <title id="product-card-loading">Loading...</title>

        <rect
          role="presentation"
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath={`url(#${clipId})`}
          style={{ fill: `url(#${gradientId})` }}
        ></rect>

        <defs>
          <clipPath id={clipId}>
            <rect x="16" y="16" rx="8" ry="8" width="288" height="272"></rect>
            <rect x="16" y="308" rx="2" ry="2" width="288" height="20"></rect>
            <rect x="164" y="344" rx="2" ry="2" width="140" height="20"></rect>
            <rect x="16" y="400" rx="2" ry="2" width="98" height="20"></rect>
            <rect x="16" y="454" rx="2" ry="2" width="136" height="20"></rect>
          </clipPath>

          <linearGradient id={gradientId}>
            <stop offset="0%" stopColor="#f3f3f3" stopOpacity="1"></stop>
            <stop offset="50%" stopColor="#ecebeb" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="#f3f3f3" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

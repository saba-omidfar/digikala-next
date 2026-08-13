"use client";

export default function SidebarSkeleton() {
  return (
    <div className="sidebar_skeleton_wrapper">
      <svg
        aria-labelledby="4mn67ih-aria"
        role="img"
        viewBox="0 0 340 600"
        className="w-full h-full"
      >
        <title id="4mn67ih-aria">Loading...</title>
        <rect
          role="presentation"
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath="url(#4mn67ih-diff)"
          style={{ fill: "url(#4mn67ih-animated-diff)" }}
        ></rect>
        <defs>
          <clipPath id="4mn67ih-diff">
            <rect x="0" y="0" rx="8" ry="8" width="340" height="600"></rect>
          </clipPath>
          <linearGradient id="4mn67ih-animated-diff">
            <stop offset="0%" stopColor="#f3f3f3" stopOpacity="1"></stop>
            <stop offset="50%" stopColor="#ecebeb" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="#f3f3f3" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

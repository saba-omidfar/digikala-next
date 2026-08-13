export default function SidebarLoading() {
  return (
    <div>
      <svg
        aria-labelledby="a6pqm3g-aria"
        role="img"
        viewBox="0 0 340 600"
        className="m-auto w-100 h-100"
      >
        <title id="a6pqm3g-aria">Loading...</title>
        <rect
          role="presentation"
          x="0"
          y="0"
          width="100%"
          height="100%"
          clipPath="url(#a6pqm3g-diff)"
          style={{ fill: `url("#a6pqm3g-animated-diff")` }}
        ></rect>
        <defs>
          <clipPath id="a6pqm3g-diff">
            <rect x="0" y="0" rx="8" ry="8" width="340" height="600"></rect>
          </clipPath>
          <linearGradient id="a6pqm3g-animated-diff">
            <stop offset="0%" stopColor="#f3f3f3" stopOpacity="1"></stop>
            <stop offset="50%" stopColor="#ecebeb" stopOpacity="1"></stop>
            <stop offset="100%" stopColor="#f3f3f3" stopOpacity="1"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

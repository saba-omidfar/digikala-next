export default function ListLoading() {
  return Array.from({ length: 6 }).map((_, i) => (
    <svg
      key={i}
      aria-labelledby="_r_c_-aria"
      role="img"
      viewBox="0 0 320 214"
      className="m-auto w-100 h-100"
    >
      <title id="_r_c_-aria">Loading...</title>
      <rect
        role="presentation"
        x="0"
        y="0"
        width="100%"
        height="100%"
        clipPath="url(#_r_c_-diff)"
        style={{ fill: `url("#_r_c_-animated-diff")` }}
      ></rect>
      <defs>
        <clipPath id="_r_c_-diff">
          <rect x="16" y="16" rx="8" ry="8" width="287" height="42"></rect>
          <rect x="160" y="74" rx="4" ry="4" width="144" height="30"></rect>
          <rect x="144" y="120" rx="4" ry="4" width="160" height="20"></rect>
        </clipPath>
        <linearGradient
          id="_r_c_-animated-diff"
          gradientTransform="translate(-2 0)"
        >
          <stop offset="0%" stopColor="#f3f3f3" stopOpacity="1"></stop>
          <stop offset="50%" stopColor="#ecebeb" stopOpacity="1"></stop>
          <stop offset="100%" stopColor="#f3f3f3" stopOpacity="1"></stop>
          <animateTransform
            attributeName="gradientTransform"
            type="translate"
            values="-2 0; 0 0; 2 0"
            dur="2s"
            repeatCount="indefinite"
          ></animateTransform>
        </linearGradient>
      </defs>
    </svg>
  ));
}

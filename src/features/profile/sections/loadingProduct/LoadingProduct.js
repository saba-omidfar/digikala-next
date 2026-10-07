import styles from "./loadingProduct.module.css";

export default function LoadingProduct() {
  return (
    <div
      className={`${styles.product_loading_container} border-complete-b border-complete-l`}
    >
      <div className={styles.product_loading}>
        <svg
          aria-labelledby="_r_68_-aria"
          role="img"
          viewBox="0 0 320 530"
          className="m-auto w-100 h-100"
        >
          <title id="_r_68_-aria">Loading...</title>
          <rect
            role="presentation"
            x="0"
            y="0"
            width="100%"
            height="100%"
            clipPath="url(#_r_68_-diff)"
            style={{ fill: `url("#_r_68_-animated-diff")` }}
          ></rect>
          <defs>
            <clipPath id="_r_68_-diff">
              <rect x="16" y="16" rx="8" ry="8" width="288" height="272"></rect>
              <rect x="16" y="308" rx="2" ry="2" width="288" height="20"></rect>
              <rect
                x="164"
                y="344"
                rx="2"
                ry="2"
                width="140"
                height="20"
              ></rect>
              <rect x="16" y="400" rx="2" ry="2" width="98" height="20"></rect>
              <rect x="16" y="454" rx="2" ry="2" width="136" height="20"></rect>
            </clipPath>
            <linearGradient
              id="_r_68_-animated-diff"
              gradientTransform="translate(-2 0)"
            >
              <stop offset="0%" stopColor="#f3f3f3" stopOpacity="1"></stop>
              <stop offset="50%" stopColor="#ecebeb" stopOpacity="1"></stop>
              <stop offset="100%" stopColor="#f3f3f3" stopOpacity="1"></stop>
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

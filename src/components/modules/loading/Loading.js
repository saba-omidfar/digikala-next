import React from "react";

import styles from "./loading.module.css";

export default function Loading({ isSmall, tooSmall, bgColor }) {
  return (
    <div className={styles.loading_container}>
      <div
        className={`${
          isSmall || tooSmall ? styles.loading_reactions : styles.loading
        }`}
      >
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="d-flex align-items-center justify-content-around"
            style={{
              width: tooSmall ? "18px" : isSmall ? "24px" : "36px",
              height: tooSmall ? "18px" : isSmall ? "24px" : "36px",
            }}
          >
            <div
              className={`${styles.rounded_circle} ${styles.loading_circle1}`}
              style={{
                width: tooSmall ? "4.5px" : isSmall ? "6px" : "9px",
                height: tooSmall ? "4.5px" : isSmall ? "6px" : "9px",
                background: bgColor ? bgColor : "rgb(129, 133, 139)",
              }}
            ></div>
            <div
              className={`${styles.rounded_circle} ${styles.loading_circle2}`}
              style={{
                width: tooSmall ? "4.5px" : isSmall ? "6px" : "9px",
                height: tooSmall ? "4.5px" : isSmall ? "6px" : "9px",
                background: bgColor ? bgColor : "rgb(129, 133, 139)",
              }}
            ></div>
            <div
              className={`${styles.rounded_circle} ${styles.loading_circle3}`}
              style={{
                width: tooSmall ? "4.5px" : isSmall ? "6px" : "9px",
                height: tooSmall ? "4.5px" : isSmall ? "6px" : "9px",
                background: bgColor ? bgColor : "rgb(129, 133, 139)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

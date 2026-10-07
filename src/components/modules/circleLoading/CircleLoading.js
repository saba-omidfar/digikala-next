import styles from "./circleLoading.module.css";

export default function CircleLoading({ margin, size = 8 }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={styles.loading_container} style={{ margin: margin }}>
        <div
          className={`${styles.rounded_circle} ${styles.loading_circle1}`}
          style={{ width: `${size}px`, height: `${size}px` }}
        ></div>
        <div
          className={`${styles.rounded_circle} ${styles.loading_circle2}`}
          style={{ width: `${size}px`, height: `${size}px` }}
        ></div>
        <div
          className={`${styles.rounded_circle} ${styles.loading_circle3}`}
          style={{ width: `${size}px`, height: `${size}px` }}
        ></div>
      </div>
    </div>
  );
}

import styles from "./circleLoading.module.css";

export default function CircleLoading() {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className={styles.loading_container}>
        <div
          className={`${styles.rounded_circle} ${styles.loading_circle1}`}
        ></div>
        <div
          className={`${styles.rounded_circle} ${styles.loading_circle2}`}
        ></div>
        <div
          className={`${styles.rounded_circle} ${styles.loading_circle3}`}
        ></div>
      </div>
    </div>
  );
}

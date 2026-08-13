import styles from "./lazyLoading.module.css";

function LazyLoading() {
  return (
    <div className={styles.loading_container}>
      <div className="d-flex align-items-center justify-content-center">
        <div className={styles.loading}>
          <div
            className={`${styles.loading_circle} ${styles.loading_circle1}`}
          ></div>
          <div
            className={`${styles.loading_circle} ${styles.loading_circle2}`}
          ></div>
          <div
            className={`${styles.loading_circle} ${styles.loading_circle3}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default LazyLoading;

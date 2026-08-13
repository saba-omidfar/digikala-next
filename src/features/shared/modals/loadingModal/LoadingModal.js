import styles from "./loadingModal.module.css";

export default function LoadingModal() {
  return (
    <div className={styles.modal_layout}>
      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.modal_content}>
          <div className="d-flex align-items-center justify-content-center h-100">
            <div className={styles.logo_container}>
              <div className={styles.logo_img_container}>
                <img
                  className={styles.logo_img}
                  src="/images/brand/full-vertical.svg"
                  alt="لوگوی دیجیکالا"
                />
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <div className={styles.circles_container}>
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
          </div>
        </div>
      </div>
    </div>
  );
}

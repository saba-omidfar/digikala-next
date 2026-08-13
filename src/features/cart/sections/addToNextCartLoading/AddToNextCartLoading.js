import styles from "./addToNextCartLoading.module.css";

function AddToNextCartLoading() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading}>
        <span className={styles.loading_title}>
          در حال انتقال به سبد خرید بعدی
        </span>
        <div className={styles.progress_bar_container}>
          <div className={styles.progress_bar_item}></div>
        </div>
        <div className="d-flex align-items-center gap-2">
          <div className="d-flex" aria-hidden="false">
            <div
              className={`${styles.nav_icon} cube-font-icon`}
              data-icon-name="cube-nav-redo"
              data-icon=""
            ></div>
          </div>
          <div className={styles.cancle_btn}>
            <span className={styles.cancle_btn_text}>انصراف</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddToNextCartLoading;

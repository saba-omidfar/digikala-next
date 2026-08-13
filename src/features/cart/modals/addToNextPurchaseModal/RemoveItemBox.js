import styles from "./removeItemBox.module.css";

export default function RemoveItemBox() {
  return (
    <div>
      <div className={styles.remove_item_container}>
        <div className={styles.remove_item}>
          <div className={styles.remove_item_img_container}>
            <Image
              className={styles.remove_item_img}
              src="https://dkstatics-public.digikala.com/digikala-products/111826764.jpg?x-oss-process=image/resize,m_lfit,h_300,w_300/quality,q_80"
              width="36"
              height="36"
              alt="بافر ناخن کد 05"
              title=""
            />
          </div>
          <p className={styles.remove_item_title}>کالای موردنظر شما حذف شد</p>
          <div className={styles.remove_item__progress_bar_container}>
            <div className={styles.remove_item__progress_bar_item}></div>
          </div>
          <button className={styles.remove_item__btn}>
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              بازگرداندن کالا
              <div className={styles.remove_item_icon_container}>
                <div
                  data-icon-name="cube-star"
                  data-icon="&#xE928;"
                  className={`${styles.remove_item_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

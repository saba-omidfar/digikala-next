import styles from "./notFoundMessage.module.css";

function NotFoundMessage() {
  return (
    <div className={styles.empty_productlist_wrapper}>
      <div className={styles.empty_productlist}>
        <div className={styles.not_found_img_container}>
          <img
            className={styles.not_found_img}
            src="/images/svg/plp/not-found.svg"
            alt="نتیجه‌ای یافت نشد"
            title=""
          />
        </div>
        <div className={styles.not_found_text_container}>
          <div className={styles.not_found_text}>
            <div
              className={styles.not_found_icon_container}
              aria-hidden="false"
            >
              <svg className={styles.not_found_icon}>
                <use href="#infoFill"></use>
              </svg>
            </div>
            کالایی با این مشخصات پیدا نکردیم
          </div>
          <div className={styles.not_found_subtext}>
            پیشنهاد می‌کنیم فیلترها را تغییر دهید
          </div>
        </div>
      </div>
    </div>
  );
}
export default NotFoundMessage;

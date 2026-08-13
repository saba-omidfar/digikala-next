import styles from "./plusService.module.css";

export default function PlusService() {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>سرویس‌های همکاری‌ مشترک</h2>
      <div className={styles.servises_container}>
        <div className={styles.servise_item}>
          <div
            className={styles.servise_img_container}
            role="img"
            aria-hidden="false"
            aria-label="icon"
          >
            <picture>
              <source
                type="image/webp"
                srcSet="https://www.digikala.com/statics/img/png/digiplus/landing/perks/tabdeal-d.webp"
              />
              <source
                type="image/jpeg"
                srcSet="https://www.digikala.com/statics/img/png/digiplus/landing/perks/tabdeal-d.webp"
              />
              <img
                className={styles.servise_img}
                src="https://www.digikala.com/statics/img/png/digiplus/landing/perks/tabdeal-d.webp"
                width="104"
                height="104"
                alt="icon"
                title=""
              />
            </picture>
          </div>
          <div className={styles.servise_infos}>
            <h3 className={styles.servise_infos_title}>سرویس تبدیل</h3>
            <div className={styles.servise_infos_subtitle}>
              حساب کاربری مشترک با پلاس و دریافت شیبا و تخفیف کارمزد با انجام
              ماموریت‌ها
            </div>
          </div>

          <div className={styles.service_btn}>
            <span className={styles.service_btn_text}>مشاهده</span>
            <div className={styles.service_icon_container} aria-hidden="false">
              <svg className={styles.service_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

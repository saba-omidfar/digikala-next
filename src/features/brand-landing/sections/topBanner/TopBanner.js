import styles from "./topBanner.module.css";

export default function TopBanner({ banner }) {
  const isFirstPanel = banner?.id !== 207535;

  if (!banner) return null;

  return (
    <div className={styles.banner_container}>
      <div
        className={`${styles.side_panel} ${isFirstPanel ? styles.right_panel : styles.left_panel}`}
      >
        <h4 className={styles.banner_title}>{banner?.title}</h4>
        <p className={styles.banner_description}>{banner.description}</p>
        <ul className="d-flex flex-column">
          {banner?.bullet_points?.map((item, index) => (
            <li key={index} className={styles.widget_option}>
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.bullet_icon}>
                  <use href="#dotOutline"></use>
                </svg>
              </div>
              {item}
            </li>
          ))}
        </ul>
        <button className={styles.see_more_btn}>
          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
            مشاهده بیشتر
          </div>
        </button>
      </div>
      <div
        className={`${styles.widget_image} ${isFirstPanel ? styles.right_image_container : styles.left_image_container}`}
        role="img"
        aria-hidden="false"
        aria-label={banner?.title}
      >
        <picture>
          <source type="image/webp" srcSet={banner?.image} />
          <source type="image/jpeg" srcSet={banner?.image} />
          <img
            className={`${styles.banner_img} ${isFirstPanel ? styles.left_image : styles.right_image}`}
            src={banner?.image}
            alt={banner?.title}
            title=""
          />
        </picture>
      </div>
    </div>
  );
}

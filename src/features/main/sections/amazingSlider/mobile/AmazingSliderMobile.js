"use client";

import Link from "next/link";

import AmazingItem from "./amazingItem/AmazingItem";

import styles from "./amazingSliderMobile.module.css";

export default function AmazingSliderMobile({
  incredibbleOffers,
  backgroundColor,
  backgroundBg,
}) {
  return (
    <div
      className={styles.content_container}
      style={{ background: backgroundColor }}
    >
      <div className={styles.slide_link}>
        <Link
          className="d-flex align-items-center justify-content-center flex-column"
          target="_blank"
          href="/incredible-offers/"
        >
          <div
            className={styles.amazing_logo_container}
            aria-hidden="true"
            aria-label=""
          >
            <img
              className={styles.amazing_logo}
              src="/images/svg/specialCarousel/Amazings.svg"
              alt="شگفت‌انگیز"
              title=""
            />
          </div>
          <div
            className={styles.logo_container}
            aria-hidden="true"
            aria-label=""
          >
            <picture>
              <source type="image/webp" srcSet={backgroundBg} />
              <source type="image/jpeg" srcSet={backgroundBg} />
              <img
                className={styles.logo}
                src={backgroundBg}
                width="145"
                height="115"
                alt="شگفت انگیز"
                title=""
              />
            </picture>
          </div>
          <div className={styles.see_all_btn} id="amazing-see-all">
            مشاهده همه
            <div className="d-flex">
              <svg className={styles.chevron_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </div>
        </Link>
      </div>

      {/* Amazing Products */}
      {incredibbleOffers?.products?.map((product, index) => (
        <AmazingItem key={product?.id} index={index} product={product} />
      ))}

      {/* See More Link */}
      <div className={styles.see_all_btn_link}>
        <Link
          className="d-flex flex-column align-items-center justify-content-center"
          href="incredible-offers/"
        >
          <div className={styles.arrow_icon_container}>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.arrow_icon}>
                <use href="#arrowLeft"></use>
              </svg>
            </div>
          </div>
          <p className={styles.show_all_card__text}>مشاهده همه</p>
        </Link>
      </div>
    </div>
  );
}

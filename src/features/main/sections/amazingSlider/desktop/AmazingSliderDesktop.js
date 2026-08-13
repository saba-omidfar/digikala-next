"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import AmazingItem from "./amazingItem/AmazingItem";

import styles from "./amazingSliderDesktop.module.css";

export default function AmazingSliderDesktop({
  incredibbleOffers,
  backgroundColor,
  backgroundBg,
}) {
  return (
    <div
      className={styles.slider_container}
      style={{ background: backgroundColor }}
    >
      <Swiper
        className={styles.amazing_slider}
        slidesPerView={"auto"}
        slidesOffsetAfter={12}
        spaceBetween={2}
        grabCursor={true}
        navigation={{
          prevEl: ".amazing__prev-button-selector",
          nextEl: ".amazing__next-button-selector",
        }}
        modules={[Navigation]}
      >
        <SwiperSlide className={styles.amazing_slide}>
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
        </SwiperSlide>

        {/* Amazing Products */}
        {incredibbleOffers?.products?.map((product, index) => (
          <SwiperSlide key={product?.id} className={styles.amazing_slide}>
            <AmazingItem index={index} product={product} />
          </SwiperSlide>
        ))}

        {/* See More Link */}
        <SwiperSlide className={styles.amazing_last_slide}>
          <div className="h-100">
            <div className={styles.show_all_card_btn}>
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
        </SwiperSlide>
      </Swiper>

      <div className="amazing__next-button-selector">
        <svg className={styles.swiper_btn_icon}>
          <use href="#chevronLeft"></use>
        </svg>
      </div>
      <div className="amazing__prev-button-selector">
        <svg className={styles.swiper_btn_icon}>
          <use href="#chevronRight"></use>
        </svg>
      </div>
    </div>
  );
}

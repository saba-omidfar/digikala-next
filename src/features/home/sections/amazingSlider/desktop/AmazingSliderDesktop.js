"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import AmazingItem from "@/features/home/sections/amazingSlider/desktop/amazingItem/AmazingItem";
import Timer from "@/components/modules/timer/Timer";

import styles from "./amazingSliderDeskop.module.css";

export default function AmazingSliderDesktop({ data }) {
  if (!data) return null;

  return (
    <div className={styles.content}>
      <div
        className={styles.container}
        style={{
          background: `linear-gradient(225deg,${data?.style?.background_colors?.[0]} 0%, ${data?.style?.background_colors?.[1]} 100%)`,
        }}
      >
        <div className={styles.header_box_container}>
          <div
            aria-hidden="true"
            aria-label=""
            className={styles.header_box_logo_container}
          >
            <img
              className={styles.header_box_logo}
              src={data?.icon?.url}
              width="64"
              height="64"
              alt=""
              title=""
            />
          </div>
          <div className={styles.header_box_timer}>
            <div
              aria-hidden="true"
              aria-label=""
              className={styles.header_box_img_container}
            >
              <img
                className={styles.header_box_img}
                src={data?.header_image?.url}
                width="126"
                height="28"
                alt=""
                title=""
              />
            </div>
            <Timer hasBg />
          </div>
          <Link target="_self" href="/incredible-offers/">
            <button type="button" className={styles.see_all_btn}>
              <div className={styles.btn_content_container}>
                <div className={styles.btn_content}></div>
                <div
                  className="h-100 d-flex align-items-center justify-content-center position-relative"
                  style={{ opacity: "1" }}
                >
                  <span className={styles.see_all_text}>مشاهده همه</span>
                  <span
                    aria-hidden="true"
                    className={styles.arrow_icon_container}
                  >
                    <svg className={styles.arrow_icon}>
                      <use href="#arrowLeft"></use>
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          </Link>
        </div>
        <div className={styles.slider_container}>
          <Swiper
            className={styles.amazing_slider}
            slidesPerView={"auto"}
            slidesOffsetAfter={12}
            spaceBetween={4}
            grabCursor={true}
            navigation={{
              prevEl: ".amazing__prev-button-selector",
              nextEl: ".amazing__next-button-selector",
            }}
            modules={[Navigation]}
          >
            {/* Amazing Products */}
            {data?.products?.map((product, index) => (
              <SwiperSlide key={product?.id} className={styles.amazing_slide}>
                <AmazingItem key={product.id} index={index} product={product} />
              </SwiperSlide>
            ))}

            {/* See More Link */}
            <SwiperSlide className={styles.amazing_last_slide}>
              <div className="h-100">
                <div className={styles.show_all_card_btn}>
                  <Link
                    className={styles.see_all_link}
                    href="/incredible-offers/"
                    target="_self"
                  >
                    <div
                      className={styles.see_all_icon_container}
                      aria-hidden="false"
                    >
                      <svg className={styles.see_all_icon}>
                        <use href="#arrowLeft"></use>
                      </svg>
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
      </div>
    </div>
  );
}

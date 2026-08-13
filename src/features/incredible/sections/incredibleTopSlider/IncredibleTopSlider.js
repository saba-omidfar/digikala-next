"use client";

import React from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import styles from "./incredibleTopSlider.module.css";

export default function IncredibleTopSlider({ slides, SlideChange }) {
  if (!slides?.length) return;

  return (
    <div className={styles.container}>
      <div className={styles.slider_container}>
        <div className="w-100 h-100 position-relative">
          <Swiper
            navigation={{
              prevEl: ".topSlider__prev-button-selector",
              nextEl: ".topSlider__next-button-selector",
            }}
            modules={[Navigation, Autoplay, Pagination]}
            className={styles.slider}
            pagination={{
              bulletActiveClass: "topSlider-pagination-bullet-active",
              bulletClass: "topSlider-pagination-bullet",
              clickable: true,
            }}
            loop={slides?.length > 1}
            slidesPerView={1}
            spaceBetween={0}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            onSlideChange={(swiper) => {
              const activeSlide = slides?.[swiper.realIndex];
              SlideChange?.(activeSlide?.hex_code || null);
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                centeredSlides: false,
              },
            }}
            lazyPreloadPrevNext={1}
            loopAdditionalSlides={2}
          >
            {slides?.map((slide) => (
              <SwiperSlide key={slide?.id} className={styles.slide}>
                <div className="h-100">
                  <Link
                    className={styles.banner_link}
                    href="#"
                    // href={
                    // isSmallScreen
                    //       ? slide?.url?.url
                    //       : slide?.url?.uri
                    // }
                  >
                    <div className={styles.banner_img_bg}>
                      <div className={styles.banner_img_container}>
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={slide?.webp_image}
                          />
                          <source
                            type="image/jpeg"
                            srcSet={slide?.webp_image}
                          />
                          <img
                            src={slide.image}
                            alt={slide?.title}
                            title={slide?.title}
                            className={styles.banner_img}
                          />
                        </picture>
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.slider_navigator}>
            <div className="topSlider__prev-button-selector">
              <svg className={styles.swiper_btn_icon}>
                <use href="#chevronRight"></use>
              </svg>
            </div>
            <div className="topSlider__next-button-selector">
              <svg className={styles.swiper_btn_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

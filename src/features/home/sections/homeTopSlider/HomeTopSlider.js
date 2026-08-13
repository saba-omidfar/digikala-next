"use client";

import React from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import Skeleton from "@/features/home/sections/homeTopSlider/Skeleton";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./homeTopSlider.module.css";

export default function HomeTopSlider({ slides, isLoading, SlideChange }) {
  const { isSmallScreen } = useScreenStatus();

  if (!isSmallScreen && isLoading) {
    return <Skeleton />;
  }

  if (!slides?.length) return;

  return (
    <div className={styles.slider}>
      {slides?.length ? (
        <div className={styles.container}>
          <div className="w-100 h-100 position-relative">
            <Swiper
              navigation={{
                prevEl: ".topSlider__prev-button-selector",
                nextEl: ".topSlider__next-button-selector",
              }}
              modules={[Navigation, Autoplay, Pagination]}
              className={styles.top_slider}
              pagination={{
                bulletActiveClass: "topSlider-pagination-bullet-active",
                bulletClass: "topSlider-pagination-bullet",
                clickable: true,
              }}
              loop={slides?.length > 1}
              centeredSlides={slides?.length > 1}
              slidesPerView={1}
              spaceBetween={8}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              onSlideChange={(swiper) => {
                const activeSlide = slides?.[swiper.realIndex];
                SlideChange?.(activeSlide?.hex_code || null);
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1.1,
                  centeredSlides: true,
                },
                1024: {
                  slidesPerView: 1,
                  centeredSlides: true,
                },
              }}
              loopAdditionalSlides={2}
              speed={500}
            >
              {slides?.map((slide) => (
                <SwiperSlide key={slide?.id}>
                  <div>
                    <Link
                      className={styles.banner_link}
                      href="#"
                      // href={
                      //slide?.url?.url || "#"
                      // }
                    >
                      <div className={styles.banner_img_bg}>
                        <div className={styles.banner_img_container}>
                          <picture>
                            <source
                              type="image/jpeg"
                              srcSet={slide?.image?.url}
                            />
                            <source type="image/jpeg" src={slide?.image?.url} />
                            {isSmallScreen && isLoading ? (
                              <span className={styles.img_skeleton}></span>
                            ) : (
                              <img
                                src={slide?.image?.url}
                                alt={slide?.title}
                                title={slide?.title}
                                className={styles.banner_img}
                              />
                            )}
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
                  <use href="#arrowRight"></use>
                </svg>
              </div>
              <div className="topSlider__next-button-selector">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#arrowLeft"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

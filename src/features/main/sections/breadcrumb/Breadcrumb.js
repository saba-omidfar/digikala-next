"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import styles from "./breadcrumb.module.css";

export default function Breadcrumb({ breadcrumb, isLoading }) {
  if (!breadcrumb?.length) return;

  return (
    <nav aria-label="breadcrumb" className={styles.nav_container}>
      {isLoading ? (
        <div className="skeleton_container">
          <div
            className={`${styles.breadcrumb_skeleton} skeleton_no_animation`}
          ></div>
        </div>
      ) : (
        <div>
          <Swiper
            lazyPreloadPrevNext={1}
            loopAdditionalSlides={2}
            slidesPerView="auto"
            spaceBetween={0}
            freeMode
          >
            {breadcrumb?.map((breadcrumb, index, arr) => (
              <SwiperSlide
                key={breadcrumb?.title}
                className={styles.breadcrumb_slide}
              >
                {index !== arr.length - 1 ? (
                  <Link
                    className={styles.breadcrumb_link}
                    data-cro-id="plp-burger-menu"
                    href={breadcrumb?.url?.uri}
                  >
                    {breadcrumb?.title}

                    <span className={styles.divider}>/</span>
                  </Link>
                ) : (
                  <h1 className={styles.breadcrumb_title}>
                    {breadcrumb?.title}
                  </h1>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </nav>
  );
}

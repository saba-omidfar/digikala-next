"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./incredibleProductsSlider.module.css";

function IncredibleProductsSlider({ products, title }) {
  const { isSmallScreen } = useScreenStatus();

  return (
    <>
      <div className={styles.empty_space}></div>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.header_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <div className={styles.header_icon_container}>
                <div
                  data-icon-name="cube-icon"
                  data-icon={
                    title === "شگفت‌انگیز سفارشی" ? "\uE9BC" : "\uE933"
                  }
                  className={`${styles.header_icon} ${
                    title === "شگفت‌انگیز سفارشی"
                      ? styles.ad_icon
                      : styles.comming_soon_icon
                  } cube-font-icon`}
                ></div>
              </div>
              <p className={styles.header_title}>
                <span className="position-relative">{title}</span>
              </p>
            </div>
            <div className={styles.title_line}></div>
          </div>
          <div>
            <Swiper
              navigation={{
                prevEl: ".prev-button-selector",
                nextEl: ".next-button-selector",
              }}
              modules={[Navigation]}
              slidesOffsetAfter={0}
              slidesOffsetBefore={0}
              slidesPerView={"auto"}
              spaceBetween={isSmallScreen ? 0 : 24}
            >
              {products?.map((product, index) => (
                <SwiperSlide key={index} className={styles.slide}>
                  <VerticalProductCard
                    index={index}
                    product={product}
                    imgContainerClassName={styles.product_img_container}
                    linkClassName={styles.product_link}
                    hasBadge
                    isVertical
                    hasNoRating
                    hasPromotionTimeline
                    hasBorderLeft={index !== products?.length - 1}
                  />
                </SwiperSlide>
              ))}
              <div className="next-button-selector">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
              <div className="prev-button-selector">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronRight"></use>
                </svg>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncredibleProductsSlider;

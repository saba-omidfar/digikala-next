"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import useScreenStatus from "@/hooks/useScreenStatus";

import ProductCard from "@/features/incredible/sections/incredibleOffersDealOfTheDay/productCard/ProductCard";

import styles from "./incredibleOffersDealOfTheDay.module.css";

function IncredibleOffersDealOfTheDay({ products, title }) {
  const { isSmallScreen } = useScreenStatus();

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div
          style={{
            margin: "0 16px",
          }}
        >
          <div className={styles.header_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <div className={styles.header_icon_container}>
                <div
                  data-icon-name="cube"
                  data-icon="&#xEB79;"
                  className={`${styles.header_icon} cube-font-icon`}
                ></div>
              </div>
              <p className={styles.header_text}>
                <span className="position-relative">{title}</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles.slider_container}>
            <Swiper
              navigation={{
                prevEl: ".prev-button-selector",
                nextEl: ".next-button-selector",
              }}
              modules={[Navigation]}
              centeredSlides={false}
              slidesOffsetAfter={isSmallScreen ? 8 : 16}
              slidesOffsetBefore={isSmallScreen ? 8 : 16}
              slidesPerView={"auto"}
              spaceBetween={isSmallScreen ? 8 : 16}
            >
              {products?.map((product, index) => (
                <SwiperSlide key={index} className={styles.slide}>
                  <ProductCard key={index} product={product} />
                </SwiperSlide>
              ))}

              <SwiperSlide className={styles.slide}>
                <ProductCard isIncrediblePage lastBox />
              </SwiperSlide>

              {products.length > 2 && (
                <>
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
                </>
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncredibleOffersDealOfTheDay;

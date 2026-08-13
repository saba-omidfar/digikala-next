"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./categories.module.css";

export default function Categories({ categories, isIncredibleTeasing }) {
  const { isSmallScreen } = useScreenStatus();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("category_id");

  const url = isIncredibleTeasing
    ? "incredible-offers-teasing"
    : "incredible-offers";

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className="w-100">
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
            {categories?.map((category, index) => (
              <SwiperSlide key={index} className={styles.slide}>
                <Link
                  key={index}
                  href={
                    category.id
                      ? `/${url}/?category_id=${category?.id}`
                      : `/${url}/`
                  }
                  className={`${styles.category_link} ${
                    +categoryId === category?.id ||
                    (!category?.id && !categoryId)
                      ? styles.category_link__active
                      : ""
                  }`}
                >
                  <div className={styles.category_img_container}>
                    <img
                      src={
                        category?.image || "/images/svg/image-placeholder.svg"
                      }
                      alt={category?.title}
                      className={styles.category_img}
                    />
                  </div>
                  <span
                    className={`${styles.category_name} ${
                      +categoryId === category?.id ||
                      (!category?.id && !categoryId)
                        ? styles.category_name__active
                        : ""
                    }`}
                  >
                    {category?.title}
                  </span>
                </Link>
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
  );
}

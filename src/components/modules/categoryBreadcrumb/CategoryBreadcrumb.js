"use client";

import React from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./categoryBreadcrumb.module.css";

function CategoryBreadcrumb({ textDecoration }) {
  const { productDetails } = useProductContext();

  return (
    <>
      <nav className={styles.breadcrumb_nav}>
        <div>
          <Swiper
            slidesPerView="auto"
            className={styles.category_breadcrumb_swiper}
          >
            {productDetails?.breadcrumb?.slice(0, -1).map((item, index) => (
              <SwiperSlide
                key={`${index}-${item?.title}`}
                className={`${styles.category_breadcrumb_slide} ${
                  index === productDetails?.breadcrumb?.length - 2
                    ? styles.category_breadcrumb_slide_pl
                    : ""
                }`}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <Link
                    className={styles.category_breadcrumb_link}
                    href={item?.url?.uri}
                  >
                    {item?.title}
                    {index !== productDetails?.breadcrumb?.length - 2 && (
                      <span className={styles.divider_icon}>/</span>
                    )}
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </nav>
    </>
  );
}

export default CategoryBreadcrumb;

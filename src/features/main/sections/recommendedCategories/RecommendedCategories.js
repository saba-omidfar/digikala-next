"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import chunkArray from "@/utils/chunkArray";

import styles from "./recommendedCategories.module.css";

function RecommendedCategories({ title, categoryGroups }) {
  const groupedProducts = chunkArray(categoryGroups, 2);

  return (
    <div className={styles.categories_container}>
      <div className={styles.categories_title_container}>
        <h2 className={styles.categories_title}>{title}</h2>
      </div>
      <div className={styles.categories_content_container}>
        <Swiper slidesPerView={"auto"} spaceBetween={0}>
          {groupedProducts.map((categories, index) => (
            <SwiperSlide
              key={index}
              className={styles.leaf_category}
              lazypreloadprevnext={1}
              loopadditionalslides={2}
            >
              <div className={styles.leaf_category}>
                {categories.map((category, categoryIndex) => (
                  <Link
                    key={categoryIndex}
                    id="categories-offers-icons"
                    href={category.url?.uri}
                    className={styles.leaf_category_link}
                  >
                    <div
                      className={styles.leaf_category_content}
                      style={{
                        borderTop:
                          categoryIndex === 1 ? "1px solid #f0f0f1" : "none",
                      }}
                    >
                      <div className={styles.leaf_category__item_container}>
                        <div className={styles.leaf_category_item}>
                          <Image
                            width={60}
                            height={60}
                            alt={category.title_fa}
                            className={styles.leaf_category_item_img}
                            src={category.top_product_image}
                          />
                        </div>
                      </div>
                      <h4 className={styles.leaf_category__item_text}>
                        {category.title_fa}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default RecommendedCategories;

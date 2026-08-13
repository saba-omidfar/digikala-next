"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import chunkArray from "@/utils/chunkArray";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./bestSellingProductsSlider.module.css";

function BestSellingProductsSlider({ title, products }) {
  const { isSmallScreen } = useScreenStatus();
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    if (!products) return;

    setGroupedProducts(chunkArray(products, 3));
  }, [products]);

  if (!products?.length) return null;

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.title_container}>
          <div className={styles.section_title_container}>
            {isSmallScreen ? (
              <h5 className={styles.section_title}>
                {title === "داغ ترین چند ساعت گذشته" ||
                  ("داغ‌ترین چند ساعت گذشته" && (
                    <div className={styles.title_icon_container}>
                      <img
                        src="/statics/cd89e7fff160139c25350c3194c28fafaad3da0e_1722332355.svg"
                        className={styles.title_img_icon}
                      />
                    </div>
                  ))}
                {title ? title : ""}
              </h5>
            ) : (
              <h1 className={styles.section_title}>
                {title === "داغ ترین چند ساعت گذشته" && (
                  <div className={styles.title_icon_container}>
                    <img
                      src="/statics/cd89e7fff160139c25350c3194c28fafaad3da0e_1722332355.svg"
                      className={styles.title_img_icon}
                    />
                  </div>
                )}
                {title ? title : ""}
              </h1>
            )}
          </div>
        </div>

        <div className={styles.slider_container}>
          <div className="w-100">
            <Swiper
              autoplay={false}
              freeMode={true}
              slidesPerView={isSmallScreen ? 1.5 : 4}
              spaceBetween={isSmallScreen ? 8 : 16}
              slidesOffsetAfter={isSmallScreen ? 16 : 24}
              slidesOffsetBefore={isSmallScreen ? 16 : 24}
              navigation={{
                prevEl: ".sellingProducts-swiper-prev",
                nextEl: ".sellingProducts-swiper-next",
              }}
              modules={[Navigation]}
              className={styles.slider}
            >
              {groupedProducts?.map((products, index) => (
                <SwiperSlide key={index} className={styles.slide}>
                  <div>
                    {products?.map((product, productIndex) => (
                      <div
                        key={productIndex}
                        className={styles.product_container}
                      >
                        <Link
                          key={product.id}
                          target="_blank"
                          href={
                            (isSmallScreen
                              ? `/product/${product?.id}`
                              : product?.url?.uri) || "#"
                          }
                        >
                          <div className={styles.product_item}>
                            <div className={styles.product_item_bg}>
                              <div className={styles.product_img_container}>
                                {isSmallScreen ? (
                                  <img
                                    className={styles.product_img}
                                    src={product?.image?.url}
                                    alt={product?.title}
                                  />
                                ) : (
                                  <picture>
                                    <source
                                      type="image/webp"
                                      srcSet={product?.image?.url}
                                    />
                                    <source
                                      type="image/jpeg"
                                      srcSet={product?.image?.url}
                                    />
                                    <img
                                      className={styles.product_img}
                                      src={product?.image?.url}
                                      alt={product?.title}
                                    />
                                  </picture>
                                )}
                              </div>
                            </div>

                            <div className={styles.product_item_description}>
                              <p className={styles.description_container}>
                                <span className={styles.product_item_count}>
                                  {(
                                    index * 3 +
                                    productIndex +
                                    1
                                  ).toLocaleString("fa-IR")}
                                </span>
                                <span>{product?.title}</span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SwiperSlide>
              ))}
              <div className="sellingProducts-swiper-next">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
              <div className="sellingProducts-swiper-prev">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronRight"></use>
                </svg>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestSellingProductsSlider;

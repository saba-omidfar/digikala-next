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

function BestSellingProductsSlider({
  title,
  products,
  url,
  hasProductsSeeMoreUrl,
}) {
  const { isSmallScreen } = useScreenStatus();
  const [groupedProducts, setGroupedProducts] = useState([]);

  useEffect(() => {
    if (!products) return;

    setGroupedProducts(chunkArray(products, 3));
  }, [products]);

  if (!products?.length) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <div className={styles.section_title_container}>
          <div className={styles.title_icon_container} aria-hidden="false">
            <svg className={styles.title_icon}>
              <use href="#searchTrend"></use>
            </svg>
          </div>
          <p className={styles.section_title}>{title ? title : ""}</p>
        </div>

        <Link className={styles.see_all_link} href={url ? url : ""}>
          <button className={styles.see_all_btn}>
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              مشاهده همه
            </div>
          </button>
        </Link>
        {hasProductsSeeMoreUrl && (
          <Link href="#" className={styles.see_all_btn}>
            مشاهده همه
            <div className="d-flex">
              <div
                data-icon-name="cube-chevron-left"
                data-icon="&#xE9C2;"
                className={`${styles.see_all_icon} cube-font-icon`}
              ></div>
            </div>
          </Link>
        )}
      </div>
      <div className={styles.slider_container}>
        <Swiper
          autoplay={false}
          freeMode={true}
          slidesPerView={isSmallScreen ? 1.5 : 4}
          spaceBetween={isSmallScreen ? 8 : 20}
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
                  <Link
                    key={product.id}
                    target="_blank"
                    href={product?.url?.uri || "#"}
                    className={styles.product_link}
                  >
                    <div className={styles.product_item}>
                      <div className={styles.product_item_bg}>
                        <div className={styles.product_img_container}>
                          {isSmallScreen ? (
                            <img
                              className={styles.product_img}
                              src={product?.images?.main?.url?.[0]}
                              alt={product?.title_fa}
                            />
                          ) : (
                            <picture>
                              <source
                                type="image/webp"
                                srcSet={product?.images?.main?.webp_url?.[0]}
                              />
                              <source
                                type="image/jpeg"
                                srcSet={product?.images?.main?.webp_url?.[0]}
                              />
                              <img
                                className={styles.product_img}
                                src={product?.images?.main?.url?.[0]}
                                alt={product?.title_fa}
                              />
                            </picture>
                          )}
                        </div>
                      </div>
                      <span className={styles.product_item_count}>
                        {(index * 3 + productIndex + 1).toLocaleString("fa-IR")}
                      </span>
                      <div className={styles.product_item_description}>
                        <p className={styles.product_item_title}>
                          {product?.title_fa}
                        </p>
                      </div>
                    </div>
                  </Link>
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
  );
}

export default BestSellingProductsSlider;

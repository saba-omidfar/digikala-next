"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductContentTitle from "../productContent/productContentTitle/ProductContentTitle";
import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";

import styles from "./recommendationProducts.module.css";

function RecommendationProducts({ data }) {
  if (!data || !data?.length) return;

  return (
    <div className="w-100 px-3">
      <div className={styles.similar_products_container}>
        <ProductContentTitle title={data?.title} isSlider />

        <div>
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={24}
            modules={[Navigation]}
            navigation={{
              prevEl: ".similar-products-swiper-button-prev",
              nextEl: ".similar-products-swiper-button-next",
            }}
          >
            {data?.products?.map((product, index) => (
              <SwiperSlide
                key={product?.id}
                className={styles.similar_products_slide}
              >
                <VerticalProductCard
                  index={index}
                  product={product}
                  linkClassName={styles.product_link}
                  imgContainerClassName={styles.product_img_container}
                  isVertical
                  hasBorderLeft={index !== data?.products?.length - 1}
                  hasNoRating
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="similar-products-swiper-button-next">
            <svg className={styles.swiper_btn_icon}>
              <use href="#chevronLeft"></use>
            </svg>
          </div>
          <div className="similar-products-swiper-button-prev">
            <svg className={styles.swiper_btn_icon}>
              <use href="#chevronRight"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationProducts;

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductContentTitle from "../productContentTitle/ProductContentTitle";
import ProductCard from "@/components/modules/productCard/ProductCard";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./sellerRecommendations.module.css";

function SellerRecommendations() {
  const { cpc, isLoadingCpc } = useProductContext();

  if (!cpc?.products?.length || cpc?.products?.length === 1 || isLoadingCpc)
    return null;

  return (
    <div className={styles.recommendation_container}>
      <ProductContentTitle
        title={cpc?.title}
        description={cpc?.description}
        isSlider
      />

      <div>
        <Swiper
          slidesPerView="auto"
          centeredSlides={false}
          draggable={true}
          navigation={{
            prevEl: ".recommendation-swiper-button-prev",
            nextEl: ".recommendation-swiper-button-next",
          }}
          modules={[Navigation]}
        >
          {cpc?.products?.map((product, index) => (
            <SwiperSlide
              key={index + product.id}
              className={styles.recommendation_slider}
            >
              <ProductCard
                product={product}
                isLastSlide={index === cpc?.length - 1}
                SellerRecommendations={true}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="recommendation-swiper-button-next">
          <svg className={styles.swiper_btn_icon}>
            <use href="#chevronLeft"></use>
          </svg>
        </div>
        <div className="recommendation-swiper-button-prev">
          <svg className={styles.swiper_btn_icon}>
            <use href="#chevronRight"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}
export default SellerRecommendations;

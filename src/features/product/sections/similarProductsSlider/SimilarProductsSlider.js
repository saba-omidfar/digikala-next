"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import ProductCard from "@/components/modules/productCard/ProductCard";
import SimilarProductCard from "./SimilarProductCard";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useProductContext } from "@/contexts/ProductContext";

import "@/styles/similarProductsSlider.css";

function SimilarProductsSlider({ width }) {
  const { isSmallScreen } = useScreenStatus();
  const {
    tabularRecommendation,
    isLoadingTabularRecommendation,
    activeOffset,
    setActiveOffset,
  } = useProductContext();

  return (
    <div>
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        initialSlide={activeOffset}
        onSlideChange={(swiper) => {
          setActiveOffset(swiper.activeIndex);
        }}
      >
        {[0, 1, 2, 3].map((_, index) => (
          <SwiperSlide key={index} style={{ width: `calc(${width - 32}px)` }}>
            <div className="product_list__pages_container product_list__pages_container_without_sidebar">
              {tabularRecommendation?.data?.products?.map((product) =>
                isSmallScreen ? (
                  <SimilarProductCard
                    key={product.id}
                    product={product}
                    isLoadingTabularRecommendation={
                      isLoadingTabularRecommendation
                    }
                  />
                ) : (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isSimilarProductsSlider={true}
                  />
                ),
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SimilarProductsSlider;

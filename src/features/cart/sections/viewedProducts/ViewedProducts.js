import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import ViewedProductItem from "@/features/cart/sections/viewedProducts/viewedProductItem/ViewedProductItem";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./viewedProducts.module.css";

function ViewedProducts() {
  const { recentViewed } = useProductContext();

  if (!recentViewed?.length) return;

  return (
    <div className={styles.container} id="Viewed-products">
      <div className={styles.content}>
        <span className={styles.content_title}>بازدیدهای اخیر</span>
        <div>
          <div className="position-relative">
            <div>
              <Swiper
                className={styles.slider}
                loopAdditionalSlides={2}
                slidesPerView={"auto"}
                spaceBetween={10}
                slidesOffsetAfter={24}
                slidesOffsetBefore={0}
                navigation={{
                  prevEl: ".next_purchase-button-prev",
                  nextEl: ".next_purchase-button-next",
                }}
              >
                {recentViewed?.map((product) => (
                  <SwiperSlide key={product.id} className={styles.slide}>
                    <ViewedProductItem
                      product={product}
                      variant={product.default_variant}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ViewedProducts;

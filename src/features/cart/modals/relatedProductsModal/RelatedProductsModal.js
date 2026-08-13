import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import { useModal } from "@/contexts/modalContext";
import { useGetRelatedProducts } from "@/features/cart/hooks/useRelatedProducts";

import useScreenStatus from "@/hooks/useScreenStatus";

import Loading from "@/components/modules/loading/Loading";
import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";

import styles from "./relatedProductsModal.module.css";

export default function RelatedProductsModal({ productId }) {
  const { closeModal } = useModal();
  const { data, isLoading } = useGetRelatedProducts(productId);

  const { isSmallScreen } = useScreenStatus();

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.title}>
                <span className="position-relative">
                  گوشی موبایل شیائومی مدل 15T دو سیم کارت ظرفیت 512 گیگابایت و
                  رم 12 گیگابایت
                </span>
              </p>
            </div>
          </div>
          <div className="grow text-h5"></div>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal()}
          >
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.close_icon}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
        <div className={styles.content}>
          <div className={styles.products_container}>
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                <Swiper
                  className={styles.related_products_slider}
                  slidesPerView="auto"
                  spaceBetween={isSmallScreen ? 0 : 24}
                  loopAdditionalSlides={2}
                  navigation={{
                    prevEl: ".related__prev-button-selector",
                    nextEl: ".related__next-button-selector",
                  }}
                  modules={[Navigation]}
                >
                  {data?.products?.map((product, index) => (
                    <SwiperSlide key={product?.id} className={styles.slide}>
                      <VerticalProductCard
                        product={product}
                        index={index}
                        isVertical
                        hasBorderLeft={index !== data?.products?.length - 1}
                        hasNoColors
                        hasNoRating
                        hasBadge
                        linkClassName={styles.product_link}
                        imgContainerClassName={styles.product_img_container}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="related__next-button-selector">
                  <svg className={styles.swiper_btn_icon}>
                    <use href="#chevronLeft"></use>
                  </svg>
                </div>
                <div className="related__prev-button-selector">
                  <svg className={styles.swiper_btn_icon}>
                    <use href="#chevronRight"></use>
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

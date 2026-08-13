"use client";

import { useEffect, useRef } from "react";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import Tabs from "@/features/cart/sections/tabs/Tabs";
import NextCartMobileItem from "./nextCartMobileItem/NextCartMobileItem";
import FavoriteCartMobileItem from "./favoriteCartMobileItem/FavoriteCartMobileItem";

import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./nextCartMobileModal.module.css";

function NextCartMobileModal() {
  const swiperRef = useRef(null);

  const { openMobileModal, closeMobileModal } = useModal();
  const {
    activeTab,
    setActiveTab,
    nextPurchaseBasket,
    isLoadingAddToNextCart,
    loadingVariantId,
  } = useCartContext();

  const { favoriteProducts, isLoadingFavoriteProducts } = useUserContext();

  const initialSlide = nextPurchaseBasket?.length ? 0 : 1;

  const handleDismiss = () => {
    closeMobileModal();
  };

  const handleSlideChange = (swiper) => {
    const { activeIndex } = swiper;

    if (activeIndex === 0) {
      setActiveTab("next-cart");
    }

    if (activeIndex === 1) {
      setActiveTab("favorites");
    }
  };

  useEffect(() => {
    if (!swiperRef.current) return;

    if (activeTab === "next-cart") {
      swiperRef.current?.slideTo(0);
    }

    if (activeTab === "favorites") {
      swiperRef.current?.slideTo(1);
    }
  }, [activeTab]);

  useEffect(() => {
    if (!nextPurchaseBasket?.length && activeTab !== "favorites") {
      setActiveTab("favorites");
    }
  }, [nextPurchaseBasket?.length, activeTab]);

  useEffect(() => {
    if (!swiperRef.current) return;

    swiperRef.current.slideTo(activeTab === "favorites" ? 1 : 0);
  }, [activeTab]);

  return (
    <>
      <BottomSheet
        open
        onDismiss={handleDismiss}
        blocking
        expandOnContentDrag
        skipInitialTransition={false}
        snapPoints={({ maxHeight }) => [maxHeight]}
        defaultSnap={({ maxHeight }) => maxHeight}
        className={styles.sheet}
        header={
          <div className={styles.header_container}>
            <div className={styles.header}>
              <div
                className={styles.header_btn_container}
                onClick={handleDismiss}
              >
                <button
                  type="button"
                  className={styles.header_close_btn}
                  aria-label="بستن"
                >
                  <div className="d-flex" aria-hidden="false">
                    <div
                      className={`${styles.arrow_icon} cube-font-icon`}
                      data-icon-name="cube-nav-arrow-right"
                      data-icon=""
                    ></div>
                  </div>
                </button>
                <span className={styles.header_title}>لیست‌های شما</span>
              </div>

              <Tabs />
            </div>
          </div>
        }
      >
        <div>
          <div className={styles.content}>
            <div className="d-flex flex-column">
              <div className="position-relative">
                <div>
                  <Swiper
                    className={styles.slider}
                    initialSlide={initialSlide}
                    autoHeight
                    loopAdditionalSlides={2}
                    slidesPerView={1}
                    spaceBetween={16}
                    onSwiper={(swiper) => {
                      swiperRef.current = swiper;
                    }}
                    onSlideChange={handleSlideChange}
                  >
                    {/* Next Purchase */}
                    <SwiperSlide className={styles.slide}>
                      {nextPurchaseBasket?.length ? (
                        <div className="d-flex flex-column">
                          <div className={styles.slide_header}>
                            <div
                              className={styles.slide_header_title_container}
                            >
                              <span className={styles.slide_header_title}>
                                {toPersianDigits(nextPurchaseBasket.length)}{" "}
                                کالا
                              </span>
                              <div
                                className="d-flex"
                                aria-hidden="false"
                                onClick={() =>
                                  openMobileModal("cart-next-tab-sort-header", {
                                    type: "next-cart",
                                  })
                                }
                              >
                                <div
                                  className={`${styles.more_icon} cube-font-icon`}
                                  data-icon-name="cube-nav-more-vert"
                                  data-icon=""
                                ></div>
                              </div>
                            </div>
                          </div>
                          {nextPurchaseBasket?.map((item, index) => (
                            <div key={item?.id} className="position-relative">
                              {loadingVariantId === item.variant.id &&
                                isLoadingAddToNextCart && (
                                  <AddToNextCartLoading />
                                )}
                              <NextCartMobileItem item={item} isNextCartItem />
                              {nextPurchaseBasket.length !== 1 &&
                              index !== nextPurchaseBasket.length - 1 ? (
                                <div className={styles.divider}>
                                  <div className={styles.line_container}>
                                    <div className={styles.line}></div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={styles.empty_cart_container}>
                          <div className={styles.empty_cart}>
                            <div
                              aria-hidden="false"
                              aria-label="empty-next-cart"
                              className={styles.empty_cart_img_container}
                            >
                              <img
                                className={styles.empty_cart_img}
                                src="/images/svg/cart/empty-next-basket.svg"
                                alt="empty-next-cart"
                                title=""
                              />
                            </div>
                            <div className={styles.empty_cart_title_container}>
                              <span className={styles.empty_cart_title}>
                                سبد خرید بعدی خالی است!
                              </span>
                              <span className={styles.empty_cart_subtitle}>
                                <p className="d-block text-center">
                                  به لیست دیگر سر بزنید و کالاهای مورد‌علاقه تان
                                  را به سبد خریدتان اضافه کنید.
                                </p>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </SwiperSlide>

                    {/* Favorites */}
                    <SwiperSlide>
                      {favoriteProducts?.length ? (
                        <section className="w-100 flex-grow-1 position-relative">
                          <div>
                            <div className="user-select-none d-flex flex-column align-items-start justify-content-stretch">
                              <div
                                className={styles.slide_header_title_container}
                              >
                                <span className={styles.slide_header_title}>
                                  {toPersianDigits(favoriteProducts?.length)}{" "}
                                  کالا
                                </span>
                              </div>
                              <div className="d-flex w-100 h-100 flex-column">
                                <div>
                                  <div
                                    className={styles.slide_products_container}
                                  >
                                    {favoriteProducts?.map((product) => (
                                      <FavoriteCartMobileItem
                                        key={product?.id}
                                        product={product}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      ) : (
                        <div className={styles.empty_cart_container}>
                          <div className={styles.empty_cart}>
                            <div
                              aria-hidden="false"
                              aria-label="empty-next-cart"
                              className={styles.empty_cart_img_container}
                            >
                              <img
                                className={styles.empty_cart_img}
                                src="/images/svg/cart/empty-next-basket.svg"
                                alt="empty-next-cart"
                                title=""
                              />
                            </div>
                            <div className={styles.empty_cart_title_container}>
                              <span className={styles.empty_cart_title}>
                                لیست علاقه‌مندی‌ها خالی است!
                              </span>
                              <span className={styles.empty_cart_subtitle}>
                                <p className="d-block text-center">
                                  به لیست دیگر سر بزنید و کالاهای مورد‌علاقه تان
                                  را به سبد خریدتان اضافه کنید.
                                </p>
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BottomSheet>
    </>
  );
}

export default NextCartMobileModal;

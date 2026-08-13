import { useEffect, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { useCartContext } from "@/contexts/CartContext";
import toPersianDigits from "@/utils/toPersianDigits";
import { useUserContext } from "@/contexts/UserContext";
import useScreenStatus from "@/hooks/useScreenStatus";
import { useModal } from "@/contexts/modalContext";

import Tabs from "@/features/cart/sections/tabs/Tabs";
import NextCartItem from "@/features/cart/sections/nextCart/NextCartItem/NextCartItem";
import NextCartModal from "@/features/shared/modals/cartActionModal/NextCartModal";

import styles from "./nextCart.module.css";

function NextCart() {
  const swiperRef = useRef(null);

  const { isSmallScreen } = useScreenStatus();
  const { openMobileModal, openModal } = useModal();
  const { activeTab, setActiveTab, nextPurchaseBasket } = useCartContext();
  const { favoriteProducts, isLoadingFavoriteProducts } = useUserContext();

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
    if (!nextPurchaseBasket?.length) {
      setActiveTab("favorites");
    }
  }, [nextPurchaseBasket?.length]);

  // if (addProductToCartIsLoading) {
  //   return (
  //     <div className="cart_overlay">
  //       <div className="page_loading_container">
  //         <LoadingModal />
  //       </div>
  //     </div>
  //   );
  // }

  const handleNextCartClick = () => {
    isSmallScreen
      ? openMobileModal("basket", {
          type: "next-cart",
        })
      : openModal(<NextCartModal />, {
          name: "next-cart",
          className: "rounded-medium",
        });
  };
  return (
    <div className={styles.container} id="NEXTCART">
      <div className={styles.content}>
        <div className={styles.tabs_sticky}>
          <span className={styles.content_title}>لیست‌های شما</span>
          <Tabs />
        </div>
        <div className={styles.tabs_container}>
          <span className={styles.content_title}>لیست‌های شما</span>
          <Tabs />
        </div>
        <div>
          <div className="position-relative">
            <div>
              <Swiper
                className={styles.slider}
                autoHeight
                loopAdditionalSlides={2}
                slidesPerView={1}
                spaceBetween={16}
                slidesOffsetAfter={1}
                slidesOffsetBefore={0}
                navigation={{
                  prevEl: ".next_purchase-button-prev",
                  nextEl: ".next_purchase-button-next",
                }}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                onSlideChange={handleSlideChange}
              >
                {/* Next Purchase */}
                <SwiperSlide>
                  {nextPurchaseBasket?.length ? (
                    <div className={styles.slide_container}>
                      <div className={styles.slide_header}>
                        <div className={styles.slide_header_title_container}>
                          <span className={styles.slide_header_title}>
                            {toPersianDigits(nextPurchaseBasket.length)} کالا
                          </span>
                          <div
                            className="d-flex"
                            aria-hidden="false"
                            onClick={handleNextCartClick}
                          >
                            <div
                              className={`${styles.more_icon} cube-font-icon`}
                              data-icon-name="cube-nav-more-vert"
                              data-icon=""
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className={styles.slide_products_container}>
                        {nextPurchaseBasket?.map((item, index) => (
                          <NextCartItem
                            isNextCartItem
                            key={index}
                            product={item?.product}
                            variant={item?.variant}
                          />
                        ))}
                      </div>
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
                              به لیست دیگر سر بزنید و کالاهای مورد‌علاقه تان را
                              به سبد خریدتان اضافه کنید.
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
                          <div className={styles.slide_header_title_container}>
                            <span className={styles.slide_header_title}>
                              {toPersianDigits(favoriteProducts?.length)} کالا
                            </span>
                          </div>
                          <div className="d-flex w-100 h-100 flex-column">
                            <div>
                              <div className={styles.slide_products_container}>
                                {favoriteProducts?.map((item, index) => (
                                  <NextCartItem
                                    key={index}
                                    product={item}
                                    variant={item?.default_variant}
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
                              به لیست دیگر سر بزنید و کالاهای مورد‌علاقه تان را
                              به سبد خریدتان اضافه کنید.
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
  );
}

export default NextCart;

"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./advertisement.module.css";

function Advertisement({ advertisement }) {
  const { sellerCode } = useParams();

  const sponsoredBrands = Array.isArray(advertisement)
    ? null
    : advertisement?.sponsored_brands;

  const advertisementItems = Array.isArray(advertisement)
    ? advertisement
    : (sponsoredBrands?.products ?? []);

  if (sellerCode || (!advertisementItems.length && !sponsoredBrands)) {
    return null;
  }

  return (
    <div className={styles.advertisement_container}>
      <div className="align-items-center">
        <Swiper
          className={styles.advertisement_slider}
          lazyPreloadPrevNext={1}
          loopAdditionalSlides={2}
          slidesPerView="auto"
          navigation={{
            prevEl: ".advertisement-swiper-prev",
            nextEl: ".advertisement-swiper-next",
          }}
          modules={[Navigation]}
        >
          <SwiperSlide className={styles.advertisement_slide}>
            <div className={styles.sponsored_brands_container}>
              <div className={styles.ads_title_container}>
                <span className={styles.ads_title}>سفارشی</span>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.ads_icon}>
                    <use href="#ads"></use>
                  </svg>
                </div>
              </div>
              <Link
                href={
                  advertisement?.sponsored_brands?.brand?.url?.uri
                    ? advertisement?.sponsored_brands?.brand?.url?.uri
                    : "#"
                }
              >
                <div
                  aria-hidden="false"
                  aria-label={advertisement?.sponsored_brands?.brand?.title_fa}
                  className={styles.sponsored_brands_img_container}
                >
                  <img
                    className={styles.sponsored_brands_img}
                    src={advertisement?.sponsored_brands?.brand?.logo?.url?.[0]}
                    alt={advertisement?.sponsored_brands?.brand?.title_fa}
                    title={advertisement?.sponsored_brands?.brand?.title_fa}
                  />
                </div>
              </Link>
              <div className={styles.sponsored_brands_title}>
                {advertisement?.sponsored_brands?.brand?.title_fa}
              </div>
            </div>
          </SwiperSlide>

          {advertisement?.sponsored_brands?.products?.map((product) => (
            <SwiperSlide
              key={product?.id}
              className={styles.advertisement_slide}
            >
              <div>
                <Link href={product?.url?.uri ? product?.url?.uri : "#"}>
                  <div className={styles.product_container}>
                    <div className="position-relative">
                      <div
                        className={styles.product_img_container}
                        aria-hidden="true"
                        aria-label=""
                      >
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={product?.images?.main?.url?.[0]}
                          />
                          <source
                            type="image/jpeg"
                            srcSet={product?.images?.main?.url?.[0]}
                          />
                          <img
                            className={styles.product_img}
                            src={product?.images?.main?.url?.[0]}
                            alt=""
                            title=""
                          />
                        </picture>
                      </div>
                    </div>
                    <span
                      title={product?.title_fa}
                      className={styles.product_title}
                    >
                      {product?.title_fa}
                    </span>
                    <div>
                      <div className={styles.product_price_container}>
                        <div className={styles.product_price}>
                          <div
                            className={styles.product_discount_percent_badge}
                          >
                            <span
                              className={styles.product_discount_percent}
                              data-testid="price-discount-percent"
                            >
                              {toPersianDigits(
                                product?.default_variant?.price
                                  ?.discount_percent,
                              )}
                              ٪
                            </span>
                          </div>
                          <span className={styles.product_rrp_price}>
                            {toPersianDigits(
                              product?.default_variant?.price?.rrp_price / 10,
                            )}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <span className={styles.product_selling_price}>
                              {toPersianDigits(
                                product?.default_variant?.price?.selling_price /
                                  10,
                              )}
                            </span>
                            <div className="d-flex" aria-hidden="false">
                              <svg className={styles.price_icon}>
                                <use href="#toman"></use>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
          {/* <div className="advertisement-swiper-next">
            <svg className={styles.swiper_btn_icon}>
              <use href="#chevronLeft"></use>
            </svg>
          </div>
          <div className="advertisement-swiper-prev">
            <svg className={styles.swiper_btn_icon}>
              <use href="#chevronRight"></use>
            </svg>
          </div> */}
        </Swiper>
      </div>
    </div>
  );
}

export default Advertisement;

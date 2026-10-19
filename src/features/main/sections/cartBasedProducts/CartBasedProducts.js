"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./cartBasedProducts.module.css";

export default function CartBasedProducts({ data }) {
  return (
    <div
      className={styles.container}
      style={{
        background: `linear-gradient(225deg, ${data?.style?.background_colors?.[0]} 0%, ${data?.style?.background_colors?.[1]} 100%)`,
      }}
    >
      <div className={styles.lockup}>
        <div
          className={styles.lockup_icon_container}
          aria-hidden="true"
          aria-label=""
        >
          <picture>
            <source type="image/webp" srcSet={data?.icon?.url} />
            <source type="image/jpeg" srcSet={data?.icon?.url} />
            <img
              className={styles.lockup_icon}
              alt=""
              title=""
              src={data?.icon?.url}
            />
          </picture>
        </div>

        <div
          className={styles.lockup_header_img_container}
          role="img"
          aria-hidden="false"
          aria-label={data?.header_image?.title}
        >
          <picture>
            <source type="image/webp" srcSet={data?.header_image?.url} />
            <source type="image/jpeg" srcSet={data?.header_image?.url} />
            <img
              className={styles.lockup_icon}
              alt={data?.header_image?.title}
              title=""
              src={data?.header_image?.url}
            />
          </picture>
        </div>

        <Link
          className={styles.see_all_link}
          href={
            (data?.see_more?.url).replace("https://www.digikala.com", "") ||
            " #"
          }
        >
          مشاهده همه
          <div className="d-flex">
            <svg className={styles.chevron_icon}>
              <use href="#chevronLeft"></use>
            </svg>
          </div>
        </Link>
      </div>

      <div className={styles.body}>
        <Swiper
          spaceBetween={4}
          slidesPerView="auto"
          navigation={{
            prevEl: ".products-swiper-button-prev",
            nextEl: ".products-swiper-button-next",
          }}
          modules={[Navigation]}
          className={styles.slider}
        >
          {data?.products?.map((product, index) => (
            <SwiperSlide key={product.id} className={styles.product_slide}>
              <Link
                className={`${styles.product_link} ${index === 0 ? styles.first_product : ""}`}
                href={product?.url?.uri || "#"}
              >
                <div
                  role="img"
                  aria-hidden="false"
                  aria-label={product?.title}
                  className={styles.product_img_container}
                >
                  <picture>
                    <source type="image/webp" srcSet={product.image.url} />
                    <source type="image/jpeg" srcSet={product.image.url} />
                    <img
                      className={styles.product_img}
                      width="164"
                      height="164"
                      alt={product.title}
                      title=""
                      src={product.image.url}
                    />
                  </picture>
                </div>

                <div className={styles.product_infos}>
                  <p className={styles.product_title}>{product.title}</p>

                  <div>
                    <div className={styles.product_price}>
                      <div className="d-flex justify-content-start align-items-center gap-1">
                        <div className={styles.product_discount_percent}>
                          <span className={styles.product_discount}>
                            {toPersianDigits(
                              product.price?.discount_percent ?? 0,
                            )}
                            ٪
                          </span>
                        </div>

                        <span className={styles.product_rrp_price}>
                          {(
                            (product.price?.rrp_price ?? 0) / 10
                          ).toLocaleString("fa-IR")}
                        </span>
                      </div>

                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span className={styles.product_selling_price}>
                            {(
                              (product.price?.selling_price ?? 0) / 10
                            ).toLocaleString("fa-IR")}
                          </span>

                          <svg className={styles.product_price_icon}>
                            <use href="#toman" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}

          <SwiperSlide className={styles.product_slide}>
            <Link
              className={styles.see_all_link_card}
              href={
                data?.see_more?.url.replace("https://www.digikala.com", "") ||
                " #"
              }
            >
              <div className={styles.see_all_link_icon}>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.arrow_icon}>
                    <use href="#arrowLeft"></use>
                  </svg>
                </div>
              </div>
              <p className={styles.see_all_link_text}>مشاهده همه</p>
            </Link>
          </SwiperSlide>

          <SwiperSlide className={styles.product_slide}>
            <span aria-hidden="true" className={styles.edge} />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

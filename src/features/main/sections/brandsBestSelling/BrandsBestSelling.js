"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import styles from "./brandsBestSelling.module.css";

export default function BrandsBestSelling({ data }) {
  return (
    <div className="w-100">
      <section className={styles.brands_container}>
        <div className={styles.brands_title}>
          <span>{data?.title}</span>
        </div>
        <div className={styles.brands_content}>
          <Swiper
            spaceBetween={12}
            slidesPerView={"auto"}
            navigation={{
              prevEl: ".brands-swiper-button-prev",
              nextEl: ".brands-swiper-button-next",
            }}
            modules={[Navigation]}
            className={styles.slider}
          >
            <SwiperSlide className={styles.brand_slide}>
              <span aria-hidden="true" className={styles.edge}></span>
            </SwiperSlide>

            {data?.brands?.map((brand) => (
              <SwiperSlide key={brand.id} className={styles.brand_slide}>
                <Link
                  className={styles.brand_link}
                  href={brand.url.url.replace("https://www.digikala.com", "")}
                >
                  <div
                    className={styles.brand_img_container}
                    role="img"
                    aria-hidden="false"
                    aria-label={brand.title_fa}
                  >
                    <picture>
                      <source type="image/webp" srcSet={brand.logo.url[0]} />
                      <source type="image/jpeg" srcSet={brand.logo.url[0]} />
                      <img
                        className={styles.brand_img}
                        width="180"
                        height="180"
                        alt={brand.title_fa}
                        title=""
                        src={brand.logo.url[0]}
                      />
                    </picture>
                  </div>
                  <h4 className={styles.brand_title}>{brand.title_fa}</h4>
                </Link>
              </SwiperSlide>
            ))}

            <SwiperSlide className={styles.brand_slide}>
              <span aria-hidden="true" className={styles.edge}></span>
            </SwiperSlide>

            <div className="brands-swiper-button-next">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
            <div className="brands-swiper-button-prev">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronRight"></use>
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </section>
    </div>
  );
}

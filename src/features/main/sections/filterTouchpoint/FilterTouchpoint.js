"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import styles from "./filterTouchpoint.module.css";

export default function FilterTouchpoint({ data }) {
  return (
    <div className="w-100">
      <section className={styles.filters_container}>
        <div className={styles.filters_title}>
          <span>{data?.title}</span>
        </div>
        <div className={styles.filters_content}>
          <Swiper
            spaceBetween={12}
            slidesPerView={"auto"}
            navigation={{
              prevEl: ".filters-swiper-button-prev",
              nextEl: ".filters-swiper-button-next",
            }}
            modules={[Navigation]}
            className={styles.slider}
          >
            <SwiperSlide className={styles.filter_slide}>
              <span aria-hidden="true" className={styles.edge}></span>
            </SwiperSlide>

            {data?.values?.map((filter) => (
              <SwiperSlide key={filter.id} className={styles.filter_slide}>
                <Link
                  className={styles.filter_link}
                  href={filter.url.url.replace("https://www.digikala.com", "")}
                >
                  <div
                    className={styles.filter_img_container}
                    role="img"
                    aria-hidden="false"
                    aria-label={filter.title_fa}
                  >
                    <picture>
                      <source type="image/webp" srcSet={filter.images[0]} />
                      <source type="image/jpeg" srcSet={filter.images[0]} />
                      <img
                        className={styles.filter_img}
                        width="80"
                        height="80"
                        alt={filter.title_fa}
                        title=""
                        src={filter.images[0]}
                      />
                    </picture>
                  </div>
                  <h4 className={styles.filter_title}>{filter.title_fa}</h4>
                </Link>
              </SwiperSlide>
            ))}

            <SwiperSlide className={styles.filter_slide}>
              <span aria-hidden="true" className={styles.edge}></span>
            </SwiperSlide>

            <div className="filters-swiper-button-next">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
            <div className="filters-swiper-button-prev">
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

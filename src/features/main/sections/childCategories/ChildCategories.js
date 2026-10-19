"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import styles from "./childCategories.module.css";

export default function ChildCategories({ data }) {
  return (
    <div className="w-100">
      <section className={styles.categories_container}>
        <div className={styles.categories_title}>
          <span>{data?.title}</span>
        </div>
        <div className={styles.categories_content}>
          <Swiper
            spaceBetween={12}
            slidesPerView={"auto"}
            navigation={{
              prevEl: ".categories-swiper-button-prev",
              nextEl: ".categories-swiper-button-next",
            }}
            modules={[Navigation]}
            className={styles.slider}
          >
            <SwiperSlide className={styles.category_slide}>
              <span aria-hidden="true" className={styles.edge}></span>
            </SwiperSlide>

            {data?.categories?.map((category) => (
              <SwiperSlide key={category.id} className={styles.category_slide}>
                <Link
                  className={styles.category_link}
                  href={category.url.url.replace(
                    "https://www.digikala.com/",
                    "/",
                  )}
                >
                  <div
                    className={styles.category_img_container}
                    role="img"
                    aria-hidden="false"
                    aria-label={category.title}
                  >
                    <picture>
                      <source type="image/webp" srcSet={category.image} />
                      <source type="image/jpeg" srcSet={category.image} />
                      <img
                        className={styles.category_img}
                        width="180"
                        height="180"
                        alt={category.title}
                        title=""
                        src={category.image}
                      />
                    </picture>
                  </div>
                  <p className={styles.category_title}>{category.name}</p>
                </Link>
              </SwiperSlide>
            ))}

            <SwiperSlide className={styles.category_slide}>
              <span aria-hidden="true" className={styles.edge}></span>
            </SwiperSlide>

            {/* <div className="categories-swiper-button-next">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
            <div className="categories-swiper-button-prev">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronRight"></use>
                </svg>
              </div>
            </div> */}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

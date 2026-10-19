"use client";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import styles from "./touchpointGroup.module.css";

export default function TouchpointGroup({ data }) {
  return (
    <div className="w-100">
      <div className="w-100 d-flex flex-column align-items-center">
        <div className={styles.touchpoints_title_container}>
          <h1 className={styles.touchpoints_title}>
            {data?.default_groups?.title}
          </h1>
        </div>
        <div className="w-100">
          <Swiper
            spaceBetween={24}
            slidesPerView={"auto"}
            navigation={{
              prevEl: ".touchpoints-swiper-button-prev",
              nextEl: ".touchpoints-swiper-button-next",
            }}
            modules={[Navigation]}
            className={styles.slider}
          >
            {data?.default_groups?.items?.map((item) => (
              <SwiperSlide key={item.id} className={styles.touchpoints_slide}>
                <div className={styles.touchpoint}>
                  <Link
                    href={
                      item.link.url.replace("https://www.digikala.com", "") ||
                      "#"
                    }
                    className={styles.touchpoint_link}
                  >
                    <div
                      className={styles.touchpoint_img_container}
                      role="img"
                      aria-hidden="false"
                      aria-label={item.title}
                    >
                      <picture>
                        <source type="image/webp" srcSet={item.image.url} />
                        <source type="image/jpeg" srcSet={item.image.url} />
                        <img
                          className={styles.touchpoint_img}
                          width="100"
                          height="100"
                          alt={item.title_fa}
                          title=""
                          src={item.image.url}
                        />
                      </picture>
                    </div>
                    <h4 className={styles.touchpoint_title}>{item.title}</h4>
                  </Link>
                </div>
              </SwiperSlide>
            ))}

            <div className="touchpoints-swiper-button-next">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
            <div className="touchpoints-swiper-button-prev">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronRight"></use>
                </svg>
              </div>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

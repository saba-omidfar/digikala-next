import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import styles from "./popularBrands.module.css";

export default function PopularBrands({ brands }) {
  if (!brands?.items) return null;

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.brands_header}>
          <h1 className={styles.title_container}>
            <div className={styles.title_icon_container} aria-hidden="false">
              <div aria-hidden="true" className={styles.title_logo_container}>
                <img
                  className={styles.title_logo}
                  src={brands?.icon?.url}
                  alt="brand_logo"
                />
              </div>
            </div>
            {brands?.title}
          </h1>
        </div>
        <div className={styles.brands_container}>
          <Swiper
            lazyPreloadPrevNext={1}
            loopAdditionalSlides={2}
            resizeObserver={true}
            slidesOffsetAfter={24}
            slidesOffsetBefore={24}
            slidesPerView={"auto"}
            spaceBetween={12}
            navigation={{
              prevEl: ".home-popularBrands-swiper-button-prev",
              nextEl: ".home-popularBrands-swiper-button-next",
            }}
            modules={[Navigation]}
            className={styles.slider}
          >
            {brands?.items?.map((brand, index) => (
              <SwiperSlide
                key={`${index}-${brand?.title}`}
                className={styles.slide}
              >
                <div>
                  <Link
                    className={styles.brand_link}
                    href={brand?.url?.url || "#"}
                  >
                    <div className={styles.brand_bg}>
                      <div className={styles.brand_logo_container}>
                        <Image
                          width={70}
                          height={70}
                          src={brand?.image?.url}
                          alt={brand?.image?.alt}
                          className={styles.brand_logo}
                        />
                      </div>
                    </div>
                    <h4 className={styles.brand_title}>{brand?.title}</h4>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
            <div className="home-popularBrands-swiper-button-next">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
            <div className="home-popularBrands-swiper-button-prev">
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

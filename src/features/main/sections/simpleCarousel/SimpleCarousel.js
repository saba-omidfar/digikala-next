import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import ProductCard from "./freshIncredibleCarousel/productCard/ProductCard";

import styles from "./simpleCarousel.module.css";

function SimpleCarousel({ data, title, isFreshPage, titleLineColor }) {
  if (!data) return;

  return (
    <div className={styles.content_container}>
      <div className={styles.content}>
        {/* Title */}
        <div className={styles.header_container}>
          <div className="d-flex align-items-center flex-grow-1">
            <p className={styles.header_title}>
              <span className="position-relative">
                {title ? title : data?.title}
              </span>
            </p>
            <Link
              className={styles.see_all_btn}
              href={data ? data?.see_more_url?.uri : "#"}
            >
              <span>
                <span className={styles.see_all_btn_text}>مشاهده همه</span>
              </span>
              <div className="flex" aria-hidden="false">
                <div
                  data-icon-name="cube-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.see_all_icon} cube-font-icon`}
                ></div>
              </div>
            </Link>
          </div>
          <div
            className={styles.header_title_line}
            style={{ backgroundColor: titleLineColor }}
          ></div>
        </div>
        <div>
          <Swiper
            className={styles.simple_carousel}
            slidesPerView={"auto"}
            spaceBetween={24}
            navigation={{
              prevEl: ".prev-button-selector",
              nextEl: ".next-button-selector",
            }}
            modules={[Navigation]}
          >
            {data?.products?.map((product) => (
              <SwiperSlide
                key={product?.id}
                className={styles.simple_carousel_slide}
              >
                <ProductCard product={product} isFreshPage={isFreshPage} />
              </SwiperSlide>
            ))}
            <SwiperSlide className={styles.simple_carousel_slide}>
              <div className={styles.carousel_show_all_card_btn}>
                <a
                  className="d-flex flex-column align-items-center justify-content-center "
                  target="_blank"
                  href={data?.see_more_url?.uri}
                >
                  <div className={styles.carousel_show_all_card}>
                    <div className="d-flex" aria-hidden="false">
                      <div
                        data-icon-name="cube-arrow-left"
                        data-icon="&#xE956;"
                        className={`${styles.carousel_show_all_card_icon} cube-font-icon`}
                      ></div>
                    </div>
                  </div>
                  <p className={styles.carousel_show_all_card_text}>
                    مشاهده همه
                  </p>
                </a>
              </div>
            </SwiperSlide>
            <div className="next-button-selector">
              <svg className={styles.swiper_btn_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
            <div className="prev-button-selector">
              <svg className={styles.swiper_btn_icon}>
                <use href="#chevronRight"></use>
              </svg>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default SimpleCarousel;

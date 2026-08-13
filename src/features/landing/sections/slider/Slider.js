import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./slider.module.css";

function Slider({ heroMobileSlides, heroDesktopSlides }) {
  const { innerWidth, isSmallScreen } = useScreenStatus();

  return (
    <>
      <Swiper
        className={styles.landing__hero_slider}
        slidesPerView={1}
        centeredSlides={
          heroMobileSlides?.length && heroDesktopSlides?.length >= 2
        }
        spaceBetween={0}
        observer={true}
        observeParents={true}
        observeSlideChildren={true}
        resizeObserver={true}
        pagination={{
          el: ".landing__hero_slider_pagination",
          type: "custom",
          renderCustom: function (swiper, current, total) {
            let bullets = "";

            for (let i = 1; i <= total; i++) {
              bullets += `<span class="swiper-pagination-bullet ${
                i === current ? "swiper-pagination-bullet-active" : ""
              }"></span>`;
            }

            return bullets;
          },
        }}
        loop={heroMobileSlides?.length && heroDesktopSlides?.length >= 2}
        autoplay={false}
        navigation={{
          nextEl: ".slider__next-button-selector",
          prevEl: ".slider__prev-button-selector",
        }}
        freeMode={false}
        slidesOffsetAfter={0}
        slidesOffsetBefore={0}
        modules={[Navigation, Pagination]}
      >
        {(isSmallScreen ? heroMobileSlides : heroDesktopSlides)?.map(
          (heroSlide, index) => (
            <SwiperSlide key={index} style={{ width: innerWidth }}>
              <div>
                <Link
                  className="d-block h-100 w-100"
                  target="_blank"
                  href={heroSlide.url ? heroSlide?.url.uri : "#"}
                >
                  <div className={styles.slide_img_container}>
                    <picture>
                      <source
                        srcSet={heroSlide.image.webp_url}
                        type="image/webp"
                      />
                      <source srcSet={heroSlide.image.url} type="image/jpeg" />
                      <img
                        src={heroSlide.image.url}
                        alt={heroSlide.alt}
                        className={styles.slide_img}
                      />
                    </picture>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ),
        )}
        {heroMobileSlides?.length && heroDesktopSlides?.length >= 2 && (
          <div className="swiper-pagination">
            <div className="landing__hero_slider_pagination"></div>
          </div>
        )}

        {heroMobileSlides?.length && heroDesktopSlides?.length >= 2 && (
          <>
            {/* next button */}
            <div className="slider__next-button-selector">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
            {/* prev button */}
            <div className="slider__prev-button-selector">
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronRight"></use>
                </svg>
              </div>
            </div>
          </>
        )}
      </Swiper>
    </>
  );
}

export default Slider;

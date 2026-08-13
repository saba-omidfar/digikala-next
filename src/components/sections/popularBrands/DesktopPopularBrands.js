"use client";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./popularBrands.module.css";

function DesktopPopularBrands({ brands, isHomePage, isLandingPage }) {
  const { isSmallScreen } = useScreenStatus();

  return (
    <div className={styles.slider_container}>
      <Swiper
        navigation={{
          prevEl: ".popularBrands-swiper-button-prev",
          nextEl: ".popularBrands-swiper-button-next",
        }}
        modules={[Navigation]}
        spaceBetween={isLandingPage ? 3 : 0}
        slidesPerView={"auto"}
      >
        {brands?.map((brand, index) => (
          <SwiperSlide
            key={index}
            className={
              isLandingPage ? styles.landing_brand_slide : styles.brand_slide
            }
          >
            <div className={isLandingPage ? styles.landing_link_container : ""}>
              <Link
                className={`${isLandingPage ? "" : styles.brand_link}`}
                href={isHomePage && isSmallScreen ? "" : brand?.url?.uri}
              >
                <div
                  className={`${isLandingPage ? styles.landing_brand_img_container : styles.brand_img_container}`}
                >
                  {isLandingPage ? (
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={brand?.image?.webp_url}
                      />
                      <source type="image/jpeg" srcSet={brand?.image?.url} />
                      <img
                        className={styles.brand_img}
                        src={brand?.image?.url}
                        alt=""
                        title=""
                      />
                    </picture>
                  ) : (
                    <img
                      src={
                        isHomePage && isSmallScreen
                          ? brand?.image?.url
                          : brand?.logo?.url?.[0]
                      }
                      alt={
                        isHomePage && isSmallScreen
                          ? brand?.image?.alt
                          : brand?.title_fa
                      }
                      className={styles.brand_img}
                    />
                  )}
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="popularBrands-swiper-button-next"
        style={{
          borderColor: isLandingPage ? "hsl(199,54%,89%)" : "#c3c3ce",
          backgroundColor: isLandingPage ? "hsl(199,60%,96%)" : "#fff",
        }}
      >
        <div className="d-flex" aria-hidden="false">
          <svg
            className={styles.swiper_btn_icon}
            style={{ fill: isLandingPage ? "hsl(199,80%,40%)" : " #424750" }}
          >
            <use href="#chevronLeft"></use>
          </svg>
        </div>
      </div>
      <div
        className="popularBrands-swiper-button-prev"
        style={{
          borderColor: isLandingPage ? "hsl(199,54%,89%)" : "#c3c3ce",
          backgroundColor: isLandingPage ? "hsl(199,60%,96%)" : "#fff",
        }}
      >
        <div className="d-flex" aria-hidden="false">
          <svg
            className={styles.swiper_btn_icon}
            style={{ fill: isLandingPage ? "hsl(199,80%,40%)" : " #424750" }}
          >
            <use href="#chevronRight"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}
export default DesktopPopularBrands;

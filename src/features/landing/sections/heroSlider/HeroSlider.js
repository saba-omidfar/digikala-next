"use client";

import Slider from "@/features/landing/sections/slider/Slider";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./heroSlider.module.css";

function HeroSlider({ heroSlides }) {
  const { isSmallScreen } = useScreenStatus();
  if (
    (!heroSlides?.image_mobile || !heroSlides?.image) &&
    (!heroSlides?.mobile_slides || !heroSlides?.desktop_slides)
  )
    return;

  return (
    <div className={styles.layout_Desktop__content_container}>
      <div
        className={styles.layout_Desktop__slider_content}
        style={{
          margin: isSmallScreen ? "0 auto 16px" : "0 auto",
        }}
      >
        <section
          className={`${heroSlides?.type === "full_image" ? styles.full_image_container : styles.container}`}
        >
          {heroSlides?.type === "full_image" ? (
            <div className="d-flex align-items-center justify-content-center">
              <span target="_blank" className="w-100">
                <div
                  className={styles.img_container}
                  aria-hidden="true"
                  aria-label=""
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={
                        isSmallScreen
                          ? heroSlides?.image_mobile?.webp_url
                          : heroSlides?.image?.webp_url
                      }
                    />
                    <source
                      type="image/jpeg"
                      srcSet={
                        isSmallScreen
                          ? heroSlides?.image_mobile?.url
                          : heroSlides?.image?.url
                      }
                    />
                    <img
                      className={styles.img}
                      src={
                        isSmallScreen
                          ? heroSlides?.image_mobile?.url
                          : heroSlides?.image?.url
                      }
                      alt=""
                      title=""
                    />
                  </picture>
                </div>
              </span>
            </div>
          ) : (
            ""
          )}
          {heroSlides?.type === "slider" ? (
            <div className="h-100 position-relative">
              <div className="h-100">
                <Slider
                  heroMobileSlides={heroSlides?.mobile_slides}
                  heroDesktopSlides={heroSlides?.desktop_slides}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
}

export default HeroSlider;

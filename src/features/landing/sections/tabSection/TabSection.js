import { useState } from "react";

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import ProductCard from "@/components/modules/productCard/ProductCard";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./tabSection.module.css";

function TabSection({ data }) {
  const { isSmallScreen } = useScreenStatus();

  const [activeTab, setActiveTab] = useState(0);

  const selectedTab = data?.[activeTab];

  const imgSrc =
    selectedTab?.carousel?.[0]?.products?.[0]?.images?.main?.url?.[0];

  return (
    <div className="lazyload-wrapper w-100">
      <div>
        <div className="d-flex justify-content-center position-relative overflow-hidden">
          <div className={styles.container}>
            <div className={styles.content_container}>
              <div className={styles.content}>
                <div className={styles.title_container}>
                  <div className={styles.title_slider}>
                    <div>
                      <Swiper slidesPerView={"auto"} spaceBetween={4}>
                        {data?.map((tab, index) => (
                          <SwiperSlide
                            key={tab.title}
                            className={styles.title_slide}
                          >
                            <li
                              className={`${styles.title} ${
                                activeTab === index ? styles.title_active : ""
                              }`}
                              onClick={() => setActiveTab(index)}
                            >
                              {tab.title}
                            </li>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                  </div>
                </div>
                <div className="d-flex flex-column w-100">
                  <div className={styles.slider_container}>
                    <Swiper
                      slidesPerView={"auto"}
                      spaceBetween={isSmallScreen ? 4 : 8}
                      allowTouchMove={true}
                      navigation={{
                        prevEl: ".slider_prev-button-selector",
                        nextEl: ".slider_next-button-selector",
                      }}
                      modules={[Navigation]}
                      className={styles.slider}
                    >
                      <SwiperSlide className={styles.slide}>
                        <div className={styles.intro_slide}>
                          {selectedTab?.carousel?.[0]?.title && (
                            <p className={styles.slider_title}>
                              {selectedTab?.carousel?.[0]?.title}
                            </p>
                          )}
                          <div
                            className={styles.logo_container}
                            aria-hidden="true"
                            aria-label=""
                          >
                            <picture>
                              <source type="image/webp" src={imgSrc} />
                              <source type="image/jpeg" src={imgSrc} />
                              <img className={styles.logo} src={imgSrc} />
                            </picture>
                          </div>
                          <Link
                            className={styles.see_more_link}
                            target="_blank"
                            href={
                              selectedTab?.carousel?.[0]?.see_more_url?.uri ||
                              "#"
                            }
                          >
                            <p className={styles.see_more_text}>مشاهده همه</p>
                            <div className="d-flex" aria-hidden="false">
                              <svg className={styles.see_more_icon}>
                                <use href="#chevronLeft"></use>
                              </svg>
                            </div>
                          </Link>
                        </div>
                      </SwiperSlide>
                      {selectedTab?.carousel?.[0]?.products?.map((product) => (
                        <SwiperSlide key={product.id} className={styles.slide}>
                          <ProductCard product={product} isLandingPage />
                        </SwiperSlide>
                      ))}
                      <div className="slider_next-button-selector">
                        <svg className={styles.swiper_btn_icon}>
                          <use href="#chevronLeft"></use>
                        </svg>
                      </div>
                      <div className="slider_prev-button-selector">
                        <svg className={styles.swiper_btn_icon}>
                          <use href="#chevronRight"></use>
                        </svg>
                      </div>
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TabSection;

import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import EmptyContainer from "../emptyContainer/EmptyContainer";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./newsMeg.module.css";

function NewsMeg({ data, navigationIconColor, isLandingPage }) {
  const { isSmallScreen } = useScreenStatus();

  if (!data?.data?.news?.length) return <EmptyContainer />;

  return (
    <div className="lazyload-wrapper w-100">
      <div className="w-100">
        <div className="w-100 d-flex justify-content-center overflow-hidden position-relative">
          <div className={styles.content_container}>
            <div className={styles.content}>
              <div
                className={styles.news_container}
                style={{
                  backgroundColor: isLandingPage ? "transparent" : "#fff",
                  borderColor: isLandingPage ? "hsl(199,54%,89%)" : "#f0f0f1",
                }}
              >
                <div className={styles.news_title_container}>
                  <div
                    className={styles.news_title}
                    style={{
                      color: isLandingPage ? "hsl(199,68%,16%)" : "#23254e",
                    }}
                  >
                    {data?.data?.title}
                  </div>
                  <span className="flex-shrink-0">
                    <Link
                      className={styles.news_see_all_link}
                      target="_blank"
                      href={`https://www.digikala.com${data?.data?.see_more_url?.uri}`}
                      style={{
                        color: isLandingPage ? "hsl(199,80%,40%)" : "#ef4056",
                      }}
                    >
                      مطالب بیشتر در دیجی کالا مگ
                      <div className="d-flex" aria-hidden="false">
                        <svg
                          className={styles.news_icon}
                          style={{
                            fill: isLandingPage
                              ? "hsl(199,80%,40%)"
                              : "#ef4056",
                          }}
                        >
                          <use href="#chevronLeft"></use>
                        </svg>
                      </div>
                    </Link>
                  </span>
                </div>
                <div className="">
                  <Swiper
                    slidesPerView={isSmallScreen ? "auto" : 5}
                    spaceBetween={isSmallScreen ? 16 : 12}
                    navigation={{
                      nextEl: ".news__next-button-selector",
                      prevEl: ".news__prev-button-selector",
                    }}
                    modules={[Navigation]}
                    className={styles.news_swiper}
                  >
                    {data?.data?.news.map((news, index) => (
                      <SwiperSlide key={index} className={styles.slide}>
                        <Link
                          className={styles.news_link}
                          target="_blank"
                          href={news?.url?.uri}
                          style={{
                            backgroundColor: isLandingPage
                              ? "transparent"
                              : "#fff",
                            borderColor: isLandingPage
                              ? "hsl(199,54%,89%)"
                              : "#f0f0f1",
                          }}
                        >
                          <div
                            aria-hidden="false"
                            aria-label={news?.title}
                            className={styles.news_img_container}
                          >
                            <img
                              className={styles.news_img}
                              src={news?.image}
                              alt={news?.title}
                              title=""
                            />
                          </div>
                          <div className={styles.news_caption}>
                            {news?.title}
                          </div>
                        </Link>
                      </SwiperSlide>
                    ))}
                    {/* next button */}
                    <div className="news__next-button-selector">
                      <svg
                        className={styles.swiper_btn_icon}
                        style={{ fill: navigationIconColor }}
                      >
                        <use href="#chevronLeft"></use>
                      </svg>
                    </div>
                    <div className="news__prev-button-selector">
                      <svg
                        className={styles.swiper_btn_icon}
                        style={{ fill: navigationIconColor }}
                      >
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
  );
}

export default NewsMeg;

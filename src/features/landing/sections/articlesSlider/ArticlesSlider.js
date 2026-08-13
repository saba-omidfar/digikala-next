import React from "react";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

import article from "../../../../../data/articles";
import ArticleBox from "./ArticleBox";

import useScreenStatus from "@/hooks/useScreenStatus";
import styles from "./articlesSlider.module.css";

function ArticlesSlider() {
  const { isSmallScreen } = useScreenStatus();

  return (
    <div className={styles.content}>
      <div className={styles.title_container}>
        <div className={styles.title}>{article.articleTitle}</div>
        <span className="flex-shrink-0">
          <Link
            className={styles.see_more_link}
            target="_blank"
            href={article.articleMagazineNews.digikalaMagazineSeeMoreUrl}
          >
            مطالب بیشتر در دیجی کالا مگ
            <div className="d-flex">
              <div
                data-icon-name="cube-nav-chevron-left"
                data-icon="&#xE9C2;"
                className={`${styles.chevron_icon} cube-font-icon`}
              ></div>
            </div>
          </Link>
        </span>
      </div>
      <div>
        <div className={styles.article_slider_container}>
          <Swiper
            slidesPerView={5}
            spaceBetween={isSmallScreen ? 16 : 12}
            className={styles.article_slider}
            navigation={{
              prevEl: ".articles__prev-btn",
              nextEl: ".articles__next-btn",
            }}
            modules={[Navigation]}
            breakpoints={{
              0: { slidesPerView: 1 },
              360: { slidesPerView: 1.5 },
              700: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
          >
            {article.articleMagazineNews.digikalaMagazineNews.map(
              (article, index) => (
                <SwiperSlide key={index} className={styles.article_slide}>
                  <ArticleBox article={article} />
                </SwiperSlide>
              ),
            )}
            <div className="articles__next-btn">
              <svg className={styles.swiper_btn_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
            <div className="articles__prev-btn">
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

export default ArticlesSlider;

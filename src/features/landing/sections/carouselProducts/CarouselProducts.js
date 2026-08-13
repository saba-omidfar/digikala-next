import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";
import EmptyContainer from "@/features/landing/sections/emptyContainer/EmptyContainer";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./carouselProducts.module.css";

export default function CarouselProducts({
  data,
  systemColor,
  landingId,
  className,
  hasNotSeeMoreUlr,
  seeMoreUrlColor,
}) {
  const { isSmallScreen } = useScreenStatus();
  const mainData = data?.data?.carousel || data?.data?.data?.carousel || data;

  const mainColor =
    landingId === 2194
      ? systemColor?.["--color-primary-700"]
      : "rgb(239, 57, 78)";

  const iconBorder =
    landingId === 2194 ? systemColor?.["--color-neutral-100"] : "#f0f0f1";

  const backgroundContent = landingId === 2194 ? "rgb(228, 231, 247)" : "#fff";

  if (!mainData?.products?.length) return <EmptyContainer />;

  return (
    <div className="w-100 lazyload-wrapper">
      <div>
        <div
          className={styles.content_container}
          style={{ background: backgroundContent }}
        >
          <div className={`${styles.content} ${className}`}>
            <div className={styles.carousel_container}>
              <div
                className={styles.carousel}
                id={mainData?.widget_id}
                style={{
                  borderColor: systemColor
                    ? systemColor?.["--color-neutral-100"]
                    : "#f0f0f1",
                }}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className={styles.carousel_title_container}>
                    <div className="d-flex align-items-center flex-grow-1">
                      <p className={styles.carousel_title}>
                        <span className="position-relative">
                          {data?.data?.data?.title || data?.title}
                        </span>
                      </p>
                    </div>
                    <div
                      className={styles.carousel_title_line}
                      style={{ backgroundColor: mainColor }}
                    ></div>
                  </div>
                  {!hasNotSeeMoreUlr && (
                    <Link
                      className={styles.carousel_see_all_btn}
                      target="_blank"
                      href={
                        mainData?.carousel?.see_more_url?.uri ||
                        mainData?.see_more_url?.uri ||
                        "#"
                      }
                      style={{ color: seeMoreUrlColor || mainColor }}
                    >
                      مشاهده همه
                      <div className="flex" aria-hidden="false">
                        <div
                          data-icon-name="cube-chevron-left"
                          data-icon="&#xE9C2;"
                          className={`${styles.carousel_see_all_icon} cube-font-icon`}
                        ></div>
                      </div>
                    </Link>
                  )}
                </div>
                <div>
                  <div className="d-flex align-items-center justify-content-center">
                    <div className="w-100">
                      <Swiper
                        className={styles.special_carousel}
                        slidesPerView={"auto"}
                        spaceBetween={0}
                        slidesOffsetAfter={0}
                        slidesOffsetBefore={0}
                        autoplay={false}
                        lazyPreloadPrevNext={1}
                        loopAdditionalSlides={2}
                        navigation={{
                          prevEl: ".prev-button-selector",
                          nextEl: ".next-button-selector",
                        }}
                        modules={[Navigation]}
                      >
                        {mainData?.products?.map((product, index) => (
                          <SwiperSlide
                            key={index}
                            className={styles.special_carousel_slide}
                          >
                            <VerticalProductCard
                              index={index}
                              product={product}
                              linkClassName={styles.product_link}
                              imgContainerClassName={
                                styles.product_img_container
                              }
                              systemColor={systemColor}
                              hasBorderLeft={
                                index !== mainData?.products?.length - 1
                              }
                              isVertical
                              hasBadge
                              hasBuyersCount={!isSmallScreen}
                              hasNoRating={isSmallScreen}
                              hasNoTopBadge={isSmallScreen}
                            />
                          </SwiperSlide>
                        ))}
                        <SwiperSlide className={styles.special_carousel_slide}>
                          <div className={styles.carousel_show_all_card_btn}>
                            <a
                              className="d-flex flex-column align-items-center justify-content-center "
                              target="_blank"
                              href={mainData?.see_more_url?.uri}
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
                        <div
                          className="next-button-selector"
                          style={{
                            color: mainColor,
                            borderColor: iconBorder,
                          }}
                        >
                          <svg
                            className={styles.swiper_btn_icon}
                            style={{ fill: mainColor }}
                          >
                            <use href="#chevronLeft"></use>
                          </svg>
                        </div>
                        <div
                          className="prev-button-selector"
                          style={{
                            color: mainColor,
                            borderColor: iconBorder,
                          }}
                        >
                          <svg
                            className={styles.swiper_btn_icon}
                            style={{ fill: mainColor }}
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
      </div>
    </div>
  );
}

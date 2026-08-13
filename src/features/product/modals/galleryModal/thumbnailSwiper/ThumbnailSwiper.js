"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./thumbnailSwiper.module.css";

export default function ThumbnailSwiper({
  groups,
  totalMainItemsLength,
  setThumbnailSwiper,
  activeTab,
  activeSlide,
  handleClickSlide,
}) {
  const { productDetails, mediaComments } = useProductContext();

  return (
    <div className="w-100 overflow-hidden">
      <div className="position-relative">
        <div className="d-flex" style={{ margin: "0 8px" }}>
          <Swiper
            modules={[Virtual]}
            watchSlidesProgress
            className={styles.thumbnail_swiper}
            onSwiper={(swiper) => setThumbnailSwiper(swiper)}
            slidesPerView={"auto"}
          >
            <SwiperSlide className={styles.thumbnail_slide}>
              <div
                className={`${styles.thumbnail_slides_container} ${
                  activeTab === "MAIN" ? "bg-white" : ""
                }`}
              >
                {groups
                  ?.filter((group) => group.type === "MAIN")
                  .map((item) =>
                    item.items?.map((mainItem, index) => (
                      <div
                        key={index}
                        className={`${
                          activeSlide === index
                            ? styles.gallery_footer__active
                            : ""
                        } position-relative`}
                        onClick={() => handleClickSlide(index)}
                      >
                        {mainItem.type === "video" && (
                          <div className={styles.gallery_footer__play_icon}>
                            <div
                              data-icon-name="cube-play-simple"
                              data-icon="&#xE994;"
                              className={`${styles.play_icon} cube-font-icon`}
                            ></div>
                          </div>
                        )}
                        <div
                          className={`overflow-hidden ${
                            item.items.length === 1
                              ? `${styles.rounded_r} ${styles.rounded_l}`
                              : index === 0
                                ? styles.rounded_r
                                : index === item.items.length - 1
                                  ? styles.rounded_l
                                  : ""
                          }`}
                        >
                          <img
                            src={
                              mainItem.type === "video"
                                ? mainItem.thumbnail || mainItem.image
                                : mainItem.src.url
                            }
                            className={styles.thumbnail_slide_img}
                            alt={productDetails?.productTestTitleFa}
                          />
                        </div>
                      </div>
                    )),
                  )
                  .flat()}
              </div>
            </SwiperSlide>
            {mediaComments && (
              <SwiperSlide className={styles.thumbnail_slide}>
                <button
                  className={`${styles.gallery_footer_btn_container} m-0`}
                >
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    <div
                      className={styles.gallery_footer_btn}
                      style={{ border: "none" }}
                    >
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.gallery_footer_btn_icon}>
                          <use href="#profileOff"></use>
                        </svg>
                      </div>
                      <span className={styles.gallery_footer_btn_text}>
                        تصاویر کاربران
                      </span>
                    </div>
                  </div>
                </button>
              </SwiperSlide>
            )}
            {groups?.map((group, groupIndex) => {
              if (group.type !== "COMMENTS") return null;

              const previousCommentItemsCount = groups
                .slice(0, groupIndex)
                .filter((g) => g.type === "COMMENTS")
                .reduce((acc, g) => acc + g.items.length, 0);

              const isGroupActive = group.items.some((_, commentItemIndex) => {
                const slideIndex =
                  totalMainItemsLength +
                  previousCommentItemsCount +
                  commentItemIndex;
                return slideIndex === activeSlide;
              });

              return (
                <SwiperSlide
                  key={group.commentId}
                  className={styles.thumbnail_slide}
                >
                  <div
                    className={`${styles.thumbnail_slides_container} ${
                      isGroupActive ? "bg-white" : ""
                    }`}
                  >
                    {group?.items.map((commentItem, commentItemIndex) => {
                      const slideIndex =
                        totalMainItemsLength +
                        previousCommentItemsCount +
                        commentItemIndex;

                      return (
                        <div
                          key={`comment-${groupIndex}-${commentItemIndex}`}
                          className={`${
                            activeTab === "COMMENTS" &&
                            activeSlide === slideIndex
                              ? styles.gallery_footer__active
                              : ""
                          } position-relative`}
                          onClick={() => handleClickSlide(slideIndex)}
                        >
                          <div
                            className={`overflow-hidden ${
                              group.items.length > 1
                                ? commentItemIndex === 0
                                  ? styles.rounded_r
                                  : commentItemIndex === group.items.length - 1
                                    ? styles.rounded_l
                                    : ""
                                : `${styles.rounded_r} ${styles.rounded_l}`
                            }`}
                          >
                            <Image
                              width={70}
                              height={70}
                              className={styles.thumbnail_slide_img}
                              src={commentItem.src}
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

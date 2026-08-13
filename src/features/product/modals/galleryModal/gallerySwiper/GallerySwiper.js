import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import CommentDetailBox from "../commentDetailBox/CommentDetailBox";
import VideoPlayer from "@/components/modules/videoPlayer/VideoPlayer";

import { useProductContext } from "@/contexts/ProductContext";
import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";

import styles from "./gallerySwiper.module.css";

export default function GallerySwiper({
  setGalleryContentSwiper,
  isSmallScreen,
  activeTab,
  innerHeight,
  handleSlideChange,
  setHideHeaderFooter,
  setActiveSlide,
  selectedCommentId,
  commentDetails,
}) {
  const { productDetails, mediaComments } = useProductContext();
  const groups = useAlbumGroups(productDetails, mediaComments);

  return (
    <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
      <div
        className={`d-flex justify-content-center align-items-start ${
          activeTab === "MAIN" ? "w-100" : ""
        } ${isSmallScreen ? "h-100" : ""}`}
      >
        <div
          className={`${
            isSmallScreen
              ? styles.main_gallery_full_slider_slide
              : activeTab === "MAIN"
                ? styles.main_gallery_content_slide
                : styles.comment_gallery_content_slide
          }`}
        >
          <div style={{ height: isSmallScreen ? "100%" : "" }}>
            <Swiper
              modules={[Virtual, Navigation]}
              virtual
              className={styles.gallery_content_swiper}
              navigation={{
                prevEl: ".gallery_content-button-prev",
                nextEl: ".gallery_content-button-next",
              }}
              centeredSlides={true}
              style={{
                width: isSmallScreen
                  ? "100%"
                  : activeTab === "MAIN"
                    ? `${innerHeight - 230}px`
                    : "600px",
                height: isSmallScreen ? "100%" : `${innerHeight - 230}px`,
              }}
              onSwiper={(swiper) => {
                setGalleryContentSwiper(swiper);
              }}
              onSlideChange={(swiper) => handleSlideChange(swiper)}
            >
              {groups?.map((group) =>
                group.items?.map((item, index) => (
                  <SwiperSlide
                    key={index}
                    className="d-flex align-items-center"
                    onClick={() => {
                      isSmallScreen && setHideHeaderFooter((prev) => !prev);
                      setActiveSlide(index);
                    }}
                    style={{
                      height: isSmallScreen ? "100%" : `${innerHeight - 230}px`,
                    }}
                  >
                    <div
                      className={`${
                        !selectedCommentId && !isSmallScreen
                          ? styles.slide
                          : isSmallScreen
                            ? styles.mobile_comments_slide
                            : styles.comments_slide
                      }`}
                    >
                      <div className={styles.comments_slide_img_container}>
                        {item.type === "video" ? (
                          <VideoPlayer src={item?.src} poster={item.image} />
                        ) : (
                          <picture>
                            <source
                              type="image/webp"
                              srcSet={item?.src?.url || item?.src}
                            />
                            <source
                              type="image/jpeg"
                              srcSet={item?.src?.url || item?.src}
                            />
                            <img
                              className={styles.comment_file}
                              src={item?.src?.url || item?.src}
                              alt={productDetails?.title_fa}
                              title=""
                            />
                          </picture>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                )),
              )}
              <div className="gallery_content-button-next">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
              <div className="gallery_content-button-prev">
                <svg className={styles.swiper_btn_icon}>
                  <use href="#chevronRight"></use>
                </svg>
              </div>
            </Swiper>
          </div>
        </div>
        {!isSmallScreen && activeTab === "COMMENTS" && (
          <CommentDetailBox
            commentDetails={commentDetails}
            isMobileView={false}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useMemo } from "react";

import useScreenStatus from "@/hooks/useScreenStatus";
import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";
import { useProductContext } from "@/contexts/ProductContext";

import GalleryModalHeader from "./galleryModalHeader/GalleryModalHeader";
import GallerySwiper from "./gallerySwiper/GallerySwiper";
import ThumbnailSwiper from "./thumbnailSwiper/ThumbnailSwiper";
import CommentDetailBox from "./commentDetailBox/CommentDetailBox";

import styles from "./galleryModal.module.css";

export default function GalleryModal({
  selectedSlideIndex,
  selectedCommentId,
}) {
  const { width, innerHeight, isSmallScreen } = useScreenStatus();
  const { productDetails, mediaComments } = useProductContext();

  const groups = useAlbumGroups(productDetails, mediaComments);

  const totalMainItemsLength = useMemo(() => {
    return groups?.filter((g) => g.type === "MAIN").flatMap((g) => g.items)
      .length;
  }, [groups]);

  const [galleryContentSwiper, setGalleryContentSwiper] = useState(null);
  const [thumbnailSwiper, setThumbnailSwiper] = useState(null);

  const [activeTab, setActiveTab] = useState("MAIN");
  const [bucket, setBucket] = useState(-1);
  const [slide, setSlide] = useState(0);
  const [commentDetails, setCommentDetails] = useState(null);
  const [hideHeaderFooter, setHideHeaderFooter] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const commentGroups = useMemo(() => {
    return groups?.filter((g) => g.type === "COMMENTS") ?? [];
  }, [groups]);

  const slideToBucketMap = useMemo(() => {
    if (!groups?.length) return [];

    const map = [];
    let slideIndex = 0;

    groups?.forEach((group, bucketIndex) => {
      group.items.forEach((item, itemIndex) => {
        map[slideIndex] = {
          index: slideIndex,
          bucket: group.type === "MAIN" ? 0 : bucketIndex,
          slide: itemIndex,
          tab: group.type,
        };
        slideIndex++;
      });
    });

    return map;
  }, [groups]);

  useEffect(() => {
    let index = 0;

    if (selectedSlideIndex !== undefined) {
      index = selectedSlideIndex;
    } else if (selectedCommentId) {
      outer: for (const group of groups) {
        for (const item of group.items) {
          if (
            group.type === "COMMENTS" &&
            group.comment?.id === selectedCommentId
          ) {
            break outer;
          }
          index++;
        }
      }
    }

    setActiveSlide(index);
    galleryContentSwiper?.slideTo(index, 0);
    thumbnailSwiper?.slideTo(index, 0);
  }, [
    groups,
    selectedSlideIndex,
    selectedCommentId,
    galleryContentSwiper,
    thumbnailSwiper,
  ]);

  useEffect(() => {
    const map = slideToBucketMap[activeSlide];

    if (map) {
      setBucket(map.bucket);
      setSlide(map.slide);
      setActiveTab(map.tab);

      if (map.tab === "COMMENTS") {
        const commentGroup = commentGroups[map.bucket - 1];
        if (commentGroup) {
          setCommentDetails(commentGroup.comment);
        }
      }
    }

    galleryContentSwiper?.slideTo(activeSlide, 0);
    thumbnailSwiper?.slideTo(activeSlide, 0);
  }, [activeSlide, slideToBucketMap, commentGroups]);

  useEffect(() => {
    if (activeSlide >= totalMainItemsLength) {
      setActiveTab("COMMENTS");
    } else {
      setActiveTab("MAIN");
    }

    galleryContentSwiper?.slideTo(activeSlide, 0);
  }, [activeSlide]);

  useEffect(() => {
    if (
      activeTab === "COMMENTS" &&
      commentDetails === null &&
      bucket > 0 &&
      groups?.length > 0
    ) {
      const commentGroup = commentGroups[bucket - 1];
      if (commentGroup) {
        setCommentDetails(commentGroup.comment);
      }
    }
  }, [activeTab, bucket, commentDetails, groups]);

  const handleSlideChange = (swiper) => {
    const { activeIndex } = swiper;
    const map = slideToBucketMap[activeIndex];

    if (map) {
      setActiveSlide(activeIndex);
      setBucket(map.bucket);
      setSlide(map.slide);
      setActiveTab(map.tab);

      if (map.tab === "COMMENTS") {
        const commentGroup = commentGroups[map.bucket - 1];
        if (commentGroup) {
          setCommentDetails(commentGroup.comment);
        }
      }
    }
  };

  const handleClickSlide = (index) => {
    setActiveSlide(index);
    galleryContentSwiper?.slideTo(index, 0);
  };

  useEffect(() => {
    if (thumbnailSwiper) {
      if (activeTab === "COMMENTS") {
        const commentIndex = slideToBucketMap.findIndex(
          (item) => item.tab === "COMMENTS",
        );
        thumbnailSwiper.slideTo(commentIndex !== -1 ? commentIndex : 0);
      } else {
        const mainIndex = slideToBucketMap.findIndex(
          (item) => item.tab === "MAIN",
        );
        thumbnailSwiper.slideTo(mainIndex !== -1 ? mainIndex : 0);
      }
    }
  }, [activeTab, slideToBucketMap, thumbnailSwiper]);

  return (
    <div className={styles.modal_layout}>
      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.modal_content}>
          <div
            className="position-relative d-flex h-100 w-100 flex-column justify-content-between user-select-none"
            style={{ touchAction: "none" }}
          >
            <GalleryModalHeader
              hideHeaderFooter={hideHeaderFooter}
              activeTab={activeTab}
              setActiveSlide={setActiveSlide}
            />
            <GallerySwiper
              isSmallScreen={isSmallScreen}
              activeTab={activeTab}
              width={width}
              innerHeight={innerHeight}
              setGalleryContentSwiper={setGalleryContentSwiper}
              handleSlideChange={handleSlideChange}
              setHideHeaderFooter={setHideHeaderFooter}
              setActiveSlide={setActiveSlide}
              selectedCommentId={selectedCommentId}
              commentDetails={commentDetails}
            />
            <div
              className={styles.thumbnail_container}
              style={{ opacity: hideHeaderFooter ? "0" : "100" }}
            >
              {isSmallScreen && activeTab === "COMMENTS" && (
                <CommentDetailBox
                  commentDetails={commentDetails}
                  isMobileView={true}
                />
              )}
              <button className={styles.gallery_footer_btn_container}>
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <div className={styles.gallery_footer_btn}>
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.gallery_footer_btn_icon}>
                        <use href="#gridLayout"></use>
                      </svg>
                    </div>

                    <span className={styles.gallery_footer_btn_text}>
                      همه تصاویر
                    </span>
                  </div>
                </div>
              </button>
              <ThumbnailSwiper
                groups={groups}
                totalMainItemsLength={totalMainItemsLength}
                setThumbnailSwiper={setThumbnailSwiper}
                activeTab={activeTab}
                activeSlide={activeSlide}
                handleClickSlide={handleClickSlide}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

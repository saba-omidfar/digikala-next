"use client";

import React, { useMemo, useRef, useState, useCallback } from "react";

import VerticalSlider from "@/features/product/sections/productDetails/VerticalSlider";
import GalleryModal from "@/features/product/modals/galleryModal/GalleryModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";

import chunkArray from "@/utils/chunkArray";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./galleryMobile.module.css";

const INDICATOR_WIDTH = 8;

function GalleryImage({ src, alt, className, containerClassName }) {
  return (
    <div className={containerClassName} aria-hidden="true" aria-label="">
      <picture>
        <source type="image/webp" srcSet={src} />
        <source type="image/jpeg" srcSet={src} />
        <img
          className={className}
          src={src}
          alt={alt}
          width="300"
          height="300"
        />
      </picture>
    </div>
  );
}

export default function GalleryMobile() {
  const { openModal } = useModal();
  const { productDetails, mediaComments } = useProductContext();

  const sliderRef = useRef(null);
  const paginationRef = useRef(null);

  const [indicatorX, setIndicatorX] = useState(0);

  const groups = useAlbumGroups(productDetails, mediaComments);

  const {
    mainImageItems,
    commentsImageItems,
    totalMainItemsLength,
    commentsImageItemsLength,
    chunkedImages,
  } = useMemo(() => {
    const mainItems =
      groups?.find((group) => group.type === "MAIN")?.items ?? [];

    const commentsItems =
      groups?.filter((group) => group.type === "COMMENTS") ?? [];

    const mainImageItems = mainItems.map((item, index) => ({
      item,
      originalIndex: index,
    }));

    const commentsImageItems = commentsItems
      ?.flatMap((item) => item.items)
      ?.map((item, index) => ({
        item,
        originalIndex: index,
      }));

    return {
      mainImageItems,
      commentsImageItems,
      totalMainItemsLength: mainImageItems.length,
      commentsImageItemsLength: commentsImageItems.length,
      chunkedImages: chunkArray(mainImageItems, 3),
    };
  }, [groups]);

  const openGalleryModal = useCallback(
    (slideIndex) => {
      openModal(
        <GalleryModal
          selectedSlideIndex={slideIndex}
          customClass="modal_content_album_modal"
          isMobile
        />,
        {
          name: "album",
          size: "full",
          className: "modal__album",
        },
      );
    },
    [openModal],
  );

  const handleScroll = useCallback(() => {
    const slider = sliderRef.current;
    const pagination = paginationRef.current;

    if (!slider || !pagination) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;

    if (maxScroll <= 0) {
      setIndicatorX(0);
      return;
    }

    const progress = slider.scrollLeft / maxScroll;

    const maxTranslate = pagination.clientWidth - INDICATOR_WIDTH;

    setIndicatorX(progress * maxTranslate);
  }, []);

  return (
    <>
      <div className={styles.album_footer}>
        <div className={styles.vertical_slider_container}>
          <VerticalSlider
            badges={productDetails?.product_badges}
            transform={36}
            isMobileAlbum
          />
        </div>

        <div className={styles.album_slider_container}>
          <div className={styles.file_icon_container}>
            <div className="d-flex">
              <div
                className={`${styles.file_icon} cube-font-icon`}
                data-icon-name="cube-file-image"
                data-icon=""
              />
            </div>

            <div className={styles.album_text}>
              {toPersianDigits(totalMainItemsLength)}
            </div>
          </div>

          <div className={styles.divider} />

          <div ref={paginationRef} className={styles.album_slider__pagination}>
            <div
              className={styles.indicator}
              style={{
                width: INDICATOR_WIDTH,
                transform: `translateX(${indicatorX}px)`,
              }}
            />
          </div>
        </div>
      </div>

      <div
        ref={sliderRef}
        className={styles.album_container}
        onScroll={handleScroll}
      >
        {chunkedImages.map((group, displayIndex) => {
          const isLastGroup = displayIndex === chunkedImages.length - 1;
          const isTwoItemsLayout = isLastGroup && group.length === 2;

          if (isTwoItemsLayout) {
            return (
              <React.Fragment key={displayIndex}>
                {group.map(({ item, originalIndex }, index) => (
                  <div className={styles.album} key={index}>
                    <div
                      className={styles.album_single}
                      onClick={() => openGalleryModal(originalIndex)}
                    >
                      <GalleryImage
                        src={item?.src?.url}
                        alt={productDetails?.title_fa}
                        className={styles.single_img}
                        containerClassName={styles.single_img_container}
                      />
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          }

          const [firstItem, ...restItems] = group;

          return (
            <div key={displayIndex} className={styles.album}>
              <div
                className={styles.album_single}
                onClick={() => openGalleryModal(firstItem.originalIndex)}
              >
                <div className="position-relative d-flex justify-content-center align-items-center">
                  <GalleryImage
                    src={firstItem?.item?.src?.url}
                    alt={productDetails?.title_fa}
                    className={styles.single_img}
                    containerClassName={styles.single_img_container}
                  />
                </div>
              </div>

              <div className={styles.album_group}>
                {restItems.map(({ item, originalIndex }, index) => (
                  <div
                    key={index}
                    className={styles.album_grouped}
                    onClick={() => openGalleryModal(originalIndex)}
                  >
                    <div className="position-relative d-flex justify-content-center align-items-center">
                      <GalleryImage
                        src={item?.src?.url}
                        alt={productDetails?.title_fa}
                        className={styles.grouped_img}
                        containerClassName={styles.grouped_img_container}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className={styles.all_images_container}>
          <div className={styles.all_images}>
            <div
              className={styles.image_container}
              onClick={() => openGalleryModal()}
            >
              <div aria-hidden="true" aria-label="">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={mainImageItems?.[0]?.item?.src?.url}
                  />
                  <source
                    type="image/jpeg"
                    srcSet={mainImageItems?.[0]?.item?.src?.url}
                  />
                  <img
                    className={styles.image}
                    src={mainImageItems?.[0]?.item?.src?.url}
                    alt=""
                    title=""
                  />
                </picture>
              </div>
              <span className={styles.gallery__show_more_bg}>
                رسمی ({toPersianDigits(totalMainItemsLength)} تصویر)
              </span>
            </div>
            <div
              className={styles.image_container}
              onClick={() => openGalleryModal()}
            >
              <div aria-hidden="true" aria-label="">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={commentsImageItems?.[0]?.item?.src}
                  />
                  <source
                    type="image/jpeg"
                    srcSet={commentsImageItems?.[0]?.item?.src}
                  />
                  <img
                    className={styles.image}
                    src={commentsImageItems?.[0]?.item?.src}
                    alt=""
                    title=""
                  />
                </picture>
              </div>
              <span className={styles.gallery__show_more_bg}>
                خریدار ({toPersianDigits(commentsImageItemsLength)} تصویر)
              </span>
            </div>

            <div
              className={styles.all_images_text_container}
              onClick={() => openGalleryModal()}
            >
              <button className={styles.all_images_text_btn}>
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <span className={styles.all_images_text}>
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className={`${styles.icon} cube-font-icon`}
                        data-icon-name="cube-file-image"
                        data-icon=""
                      ></div>
                    </div>
                    همه تصویرها
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className={`${styles.icon} cube-font-icon`}
                        data-icon-name="cube-nav-chevron-left"
                        data-icon=""
                      ></div>
                    </div>
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

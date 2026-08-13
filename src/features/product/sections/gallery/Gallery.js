"use client";

import { useMemo } from "react";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import useScreenStatus from "@/hooks/useScreenStatus";

import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";
import AlbumModal from "@/features/product/modals/galleryModal/GalleryModal";

import styles from "./gallery.module.css";

export default function Gallery() {
  const { openModal } = useModal();
  const { innerWidth } = useScreenStatus();

  const { productDetails, mediaComments, selectedThemes, isSelectedColor } =
    useProductContext();

  const groups = useAlbumGroups(productDetails, mediaComments);

  const mainItems = useMemo(() => {
    return (
      groups?.filter((g) => g.type === "MAIN")?.flatMap((g) => g.items) || []
    );
  }, [groups]);

  const selectedColorTheme = selectedThemes?.find(
    (theme) => theme.themeType === "colored",
  );

  const selectedColor = productDetails?.colors?.find(
    (color) => color.id === selectedColorTheme?.themeId,
  );

  const images = useMemo(() => {
    if (isSelectedColor && selectedColor?.images?.length) {
      return selectedColor.images;
    }

    return mainItems.filter((item) => item.type === "image");
  }, [isSelectedColor, selectedColor, mainItems]);

  const video = useMemo(() => {
    return mainItems.find((item) => item.type === "video");
  }, [mainItems]);

  const imageLimit = useMemo(() => {
    if (innerWidth < 1262) {
      return video ? 2 : 3;
    }

    if (innerWidth < 1507) {
      return video ? 3 : 4;
    }

    return video ? 4 : 5;
  }, [innerWidth, video]);
  const visibleItems = useMemo(() => {
    const result = [];

    if (video) {
      result.push({
        type: "video",
        data: video,
      });
    }

    images?.slice(0, imageLimit).forEach((img) => {
      result.push({
        type: "image",
        data: img,
      });
    });

    if (images?.length > imageLimit) {
      result.push({
        type: "more",
      });
    }

    return result;
  }, [images, video, imageLimit]);

  const handleOpenModal = (index) => {
    openModal(
      <AlbumModal
        customClass="modal_content_album_modal"
        selectedSlideIndex={index}
      />,
      { name: "album", size: "full" },
    );
  };

  return (
    <div className={styles.album_items_container}>
      {visibleItems.map((item, index) => {
        if (item.type === "video") {
          const realIndex = mainItems.indexOf(item.data);

          return (
            <div
              key="video"
              className={styles.album_item}
              onClick={() => handleOpenModal(realIndex)}
            >
              <div
                className={`${styles.album_item_img_container} ${styles.album_item_blur}`}
              >
                <img
                  src={item.data.thumbnail || item.data.image}
                  alt={productDetails?.title_fa}
                  className={styles.album_item_img}
                />
              </div>

              <div className={styles.play_icon_container}>
                <svg className={styles.play_icon}>
                  <use href="#video" />
                </svg>
              </div>
            </div>
          );
        }

        if (item.type === "more") {
          return (
            <div
              key="more"
              className={styles.album_item}
              onClick={() => handleOpenModal(0)}
            >
              <div
                className={`${styles.album_item_img_container} ${styles.album_item_blur}`}
              >
                <picture>
                  <source
                    srcSet={
                      visibleItems?.[0]?.data?.thumb_url ||
                      visibleItems?.[0]?.data?.src?.url
                    }
                    type="image/webp"
                  />
                  <source
                    srcSet={
                      visibleItems?.[0]?.data?.image_url ||
                      visibleItems?.[0]?.data?.src?.url
                    }
                    type="image/webp"
                  />
                  <img
                    src={
                      visibleItems?.[0]?.data?.image_url ||
                      visibleItems?.[0]?.data?.src?.url
                    }
                    alt={productDetails?.title_fa}
                    className={styles.album_item_img}
                  />
                </picture>
              </div>

              <div className={styles.more_icon_container}>
                <svg className={styles.more_icon}>
                  <use href="#moreHoriz" />
                </svg>
              </div>
            </div>
          );
        }

        const img = item.data;

        return (
          <div
            key={index}
            className={styles.album_item}
            onClick={() => handleOpenModal(index)}
          >
            <div className={styles.album_item_img_container}>
              <picture>
                <source
                  srcSet={img.thumb_url || img.webp_url}
                  type="image/webp"
                />

                <img
                  src={img.thumb_url || img.src?.url || img.src}
                  className={styles.album_item_img}
                />
              </picture>
            </div>
          </div>
        );
      })}
    </div>
  );
}

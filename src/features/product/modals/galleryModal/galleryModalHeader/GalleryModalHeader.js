import React, { useMemo } from "react";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import useAlbumGroups from "@/features/shared/hooks/useGalleryGroups";

import styles from "./galleryModalHeader.module.css";

export default function AlbumModalHeader({
  hideHeaderFooter,
  activeTab,
  setActiveSlide,
}) {
  const { closeModal } = useModal();
  const { productDetails, commentsData, mediaComments } = useProductContext();

  const groups = useAlbumGroups(productDetails, mediaComments);
  const totalMainItemsLength = useMemo(() => {
    return groups?.filter((g) => g.type === "MAIN").flatMap((g) => g.items)
      .length;
  }, [groups]);

  const hasHeader =
    (commentsData && commentsData?.comments?.length) ||
    (Array.isArray(commentsData) && commentsData.length);

  return (
    <div
      className={styles.modal_header}
      style={{
        opacity: hideHeaderFooter ? "0" : "1",
        pointerEvents: hideHeaderFooter ? "none" : "auto",
      }}
    >
      <div
        className={`${styles.header_icon_container} ${styles.header_back_icon_container}`}
      >
        <div
          data-icon-name="cube-value-back"
          data-icon="&#xE955;"
          className={`${styles.header_icon} cube-font-icon`}
        ></div>
      </div>
      {hasHeader ? (
        <div className={styles.gallery_header}>
          <div
            className={`${styles.gallery_header_item} ${
              activeTab === "MAIN" && styles.gallery_header__active_item
            }`}
            onClick={() => setActiveSlide(0)}
          >
            رسمی
          </div>
          <div
            className={`${styles.gallery_header_item} ${
              activeTab === "COMMENTS" && styles.gallery_header__active_item
            }`}
            onClick={() => setActiveSlide(totalMainItemsLength)}
          >
            خریداران
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="d-flex" aria-hidden="false" onClick={() => closeModal()}>
        <svg className={styles.header_icon}>
          <use href="#close"></use>
        </svg>
      </div>
    </div>
  );
}

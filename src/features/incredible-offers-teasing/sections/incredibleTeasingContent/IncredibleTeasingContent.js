"use client";

import { useEffect } from "react";

import Categories from "@/features/incredible/sections/categories/Categories";
import AllFreshIncredibleOffers from "@/features/incredible/sections/allFreshIncredibleOffers/AllFreshIncredibleOffers";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";
import Timer from "@/components/modules/timer/Timer";

import { useGetUniversal } from "@/hooks/useGetUniversal";
import { useGetIncredibleOffers } from "@/features/incredible/hooks/useIncredibleOffers";
import useGetIncredibleTeasing from "@/features/incredible-offers-teasing/hooks/useGetIncredibleTeasing";

import styles from "./incredibleTeasingContent.module.css";

export default function IncredibleTeasingContent({
  categoryId,
  isIncredibleTeasing,
}) {
  const { data, isLoading } = useGetIncredibleOffers({ categoryId });

  const { data: incredibleTeasing } = useGetIncredibleTeasing();
  const { data: topMegaMenuBanners } = useGetUniversal();

  if (isLoading) {
    return (
      <div className="cart_overlay">
        <div className="page_loading_container">
          <LoadingModal />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      style={{ paddingTop: topMegaMenuBanners ? 168 : 108 }}
    >
      <div id="base_layout_desktop_static_header" className="w-100">
        <div>
          <div className={styles.teasing_header}>
            <div className={styles.teasing_header_content}>
              <div
                role="img"
                aria-hidden="false"
                aria-label="فردای شگفت‌انگیز"
                className={styles.teasing_header_img_container}
              >
                <img
                  className={styles.teasing_header_img}
                  src="/statics/img/svg/typography/teasing.svg"
                  alt="فردای شگفت‌انگیز"
                  title=""
                />
              </div>
              <span className={styles.teasing_header_title}>
                تخفیف‌های فردا رو از دست نده!
              </span>
              {incredibleTeasing?.timer && (
                <div className={styles.timer_container}>
                  <Timer
                    seconds={incredibleTeasing?.timer}
                    hasBg
                    gap="4px"
                    width="28px"
                    height="28px"
                    borderRadius="4px"
                    padding="0px"
                    seperator
                    seperatorColor="#23254e"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <main
        className={`${styles.layout_Desktop__container} ${styles.layout_Desktop__content_full_width}`}
      >
        {data?.main_categories?.length ? (
          <div className={styles.categories_container}>
            <Categories
              categories={
                isIncredibleTeasing
                  ? incredibleTeasing?.main_categories
                  : data?.main_categories
              }
              isIncredibleTeasing={isIncredibleTeasing}
            />
          </div>
        ) : (
          ""
        )}

        {/* همه‌ی شگفت‌انگیزها */}
        {data?.incredible_products_list ? (
          <AllFreshIncredibleOffers isIncredibleTeasing />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

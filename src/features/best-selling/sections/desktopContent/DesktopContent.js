"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import Link from "next/link";

import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";
import Categories from "@/features/best-selling/sections/categories/Categories";

import { useBestSellingPage } from "@/features/best-selling/hooks/useBestSellingPage";
import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./desktopContent.module.css";
import "@/styles/productList.css";

export default function DesktopContent() {
  const searchParams = useSearchParams();
  const { data, isLoading } = useBestSellingPage();
  const { data: topMegaMenuBanners } = useGetUniversal();

  const [ranges, setRanges] = useState([]);

  const activeRange = searchParams.get("last_days") || "week";
  const activeCategoryId = searchParams.get("category_id");

  useEffect(() => {
    setRanges([
      {
        name: "۷ روز گذشته",
        id: "week",
      },
      {
        name: "۳۰ روز گذشته",
        id: "month",
      },
    ]);
  }, []);

  return (
    <div
      className={styles.container}
      style={{ paddingTop: topMegaMenuBanners ? 168 : 108 }}
    >
      <div
        id="base_layout_desktop_static_header"
        className={styles.base_layout_desktop_static_header}
      >
        <div>
          <div className={styles.best_selling_title_container}>
            <h1 className={styles.best_selling_title}>پرفروش‌ترین‌ها</h1>
          </div>
          <div className={styles.best_selling_range_container}>
            <span className={styles.side_pane}></span>
            <div className={styles.best_selling_date_container}>
              {ranges?.map((range, index) => (
                <Link
                  key={index}
                  id="best-selling-date"
                  className={styles.best_selling_date}
                  href={
                    activeCategoryId
                      ? `/best-selling?category_id=${activeCategoryId}&last_days=${range.id}`
                      : `/best-selling?last_days=${range.id}`
                  }
                >
                  <div
                    className={`${styles.range} ${
                      activeRange === range.id ? styles.range__active : ""
                    }`}
                  >
                    {range.name}
                  </div>
                </Link>
              ))}
            </div>
            <span
              className={`${styles.side_pane} ${styles.side_pane_left}`}
            ></span>
          </div>
          <Categories
            activeCategoryId={activeCategoryId}
            activeRange={activeRange}
            categories={data?.categories}
          />
        </div>
      </div>
      <div className={styles.base_layout_Desktop_content}>
        <div className={styles.product_list_wrapper}>
          <div id="ProductListPagesWrapper" className={styles.product_list}>
            <section className="w-100 flex-grow-1 position-relative">
              <div className="product_list__pages_container product_list__pages_container_without_sidebar">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={styles.skeleton_card_wrapper}>
                        <VerticalProductCard key={i} isSkeleton />
                      </div>
                    ))
                  : data?.products?.map((product, index) => (
                      <VerticalProductCard
                        key={index}
                        index={index}
                        product={product}
                        imgContainerClassName={styles.product_img_container}
                        linkClassName={styles.product_link}
                        isVertical
                        hasProductBadge
                        hasPromotionTimeline
                      />
                    ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import FilterableProduct from "./filterableProduct/FilterableProduct";

import styles from "./filterableProducts.module.css";

const PRODUCTS_PER_ROW = 4;
const ESTIMATED_ROW_HEIGHT = 458;

export default function FilterableProducts({ data }) {
  const feedRef = useRef(null);
  const [scrollMargin, setScrollMargin] = useState(0);

  const products = data?.products ?? [];

  // تقسیم محصولات به ردیف‌های چهارتایی
  const rows = useMemo(() => {
    const result = [];

    for (let i = 0; i < products.length; i += PRODUCTS_PER_ROW) {
      result.push(products.slice(i, i + PRODUCTS_PER_ROW));
    }

    return result;
  }, [products]);

  // محاسبه موقعیت لیست در صفحه
  useLayoutEffect(() => {
    const updateScrollMargin = () => {
      if (!feedRef.current) return;

      const top = feedRef.current.getBoundingClientRect().top + window.scrollY;

      setScrollMargin(top);
    };

    updateScrollMargin();

    window.addEventListener("resize", updateScrollMargin);

    return () => {
      window.removeEventListener("resize", updateScrollMargin);
    };
  }, []);

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: () => ESTIMATED_ROW_HEIGHT,
    overscan: 3,
    scrollMargin,
    getItemKey: (index) => rows[index]?.[0]?.id ?? index,
  });

  const virtualRows = virtualizer.getVirtualItems();

  return (
    <div dir="rtl" className={styles.section_container}>
      <div className={styles.section_title_container}>
        <h2 className={styles.section_title}>{data?.title}</h2>
      </div>

      <div
        ref={feedRef}
        className="product-list-virtual-feed"
        style={{
          position: "relative",
          width: "100%",
          height: `${virtualizer.getTotalSize()}px`,
        }}
      >
        {virtualRows.map((virtualRow) => {
          const rowProducts = rows[virtualRow.index];

          return (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: "absolute",
                top: 0,
                insetInlineStart: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start - scrollMargin}px)`,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  columnGap: 0,
                }}
              >
                {rowProducts.map((product) => (
                  <FilterableProduct key={product.id} product={product} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.see_more_btn}>
        <Link
          href={
            data?.see_more?.url?.replace("https://www.digikala.com", "") || "#"
          }
          className={styles.see_more_link}
        >
          <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
            <p className={styles.see_more_title}>مشاهده همه محصولات</p>

            <div className="d-flex">
              <svg className={styles.chevron_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

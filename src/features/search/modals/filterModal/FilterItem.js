"use client";
import { usePathname, useSearchParams } from "next/navigation";

import { useListing } from "@/contexts/ListingContext";

import useScreenStatus from "@/hooks/useScreenStatus";
import FilterContent from "@/features/incredible/sections/product-list/productListSidebar/filterContent/FilterContent";

import styles from "./filterItem.module.css";

export default function FilterItem({ filter, filterKey, onClick, isLast }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { isSmallScreen } = useScreenStatus();
  const { params, filterExtra } = useListing();

  const getFilterCaption = (filter, params) => {
    if (filter.key === "price") {
      let currentMin = params?.price?.min?.toString();
      let currentMax =
        params?.price?.max?.toString() ?? filter.options.max.toString();

      if (filter.key === "price") {
        let currentMin = params?.price?.min?.toString();
        let currentMax =
          params?.price?.max?.toString() ?? filter.options.max.toString();

        // 1. از facet url
        if (!currentMin) {
          const match = pathname.match(/from-(\d+)-up-to-(\d+)/);

          if (match) {
            currentMin = match[1];
            currentMax = match[2];
          }
        }

        // 2. از query string
        if (!currentMin) {
          currentMin = searchParams.get("price[min]") || "0";
          currentMax =
            searchParams.get("price[max]") || filter.options.max.toString();
        }

        if (
          currentMin !== "0" ||
          currentMax !== filter.options.max.toString()
        ) {
          return `از ${Math.floor(Number(currentMin) / 10).toLocaleString(
            "fa-IR",
          )} تا ${Math.floor(Number(currentMax) / 10).toLocaleString("fa-IR")}`;
        }
      }

      if (currentMin && currentMin !== "0") {
        return `از ${Math.floor(Number(currentMin) / 10).toLocaleString(
          "fa-IR",
        )} تا ${Math.floor(Number(currentMax) / 10).toLocaleString("fa-IR")}`;
      }
    }

    if (filter.key !== "price" && params[filter.key]) {
      const selectedTitles = filter.options
        .filter((option) => params[filter.key]?.includes(String(option.id)))
        .map((option) => option.title || option.title_fa);

      if (selectedTitles.length > 0) {
        return selectedTitles.join("، ");
      }
    }

    return null;
  };
  const caption = getFilterCaption(filter, params);

  const isOpen =
    !isLast && filterExtra.isOpen && filterExtra.filterKey === filter.key;

  return (
    <div
      className={`${styles.filter_item_container} ${isOpen ? styles.filter_item_open : ""}`}
    >
      <div className="w-100 d-flex align-items-center justify-content-start">
        <div className={styles.filter_item}>
          <div
            data-cro-id="plp-filter-drop-down"
            className={`${
              !isOpen
                ? styles.filter_modal_sortItem_bb
                : styles.filter_modal_sortItem
            }`}
            onClick={onClick}
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              {filter.icon ? (
                <div className={styles.filter_modal_sort_title}>
                  <span>{filter?.title}</span>
                  <div className={styles.filter_icon_container}>
                    <div className={styles.filter_icon}>
                      <div className="d-flex" aria-hidden="false">
                        <div
                          className={`${styles.icon} cube-font-icon`}
                          data-icon-name="cube-shipping-today"
                          data-icon=""
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.filter_modal_sort_title}>
                  {filter?.title}
                  {caption && (
                    <span
                      className={styles.filter_expandable__child_active}
                    ></span>
                  )}
                </div>
              )}

              <div className="d-flex" aria-hidden="false">
                {isSmallScreen ? (
                  <svg className={styles.filter_modal_arrow}>
                    <use href="#chevronLeft"></use>
                  </svg>
                ) : (
                  <svg className={styles.filter_modal_arrow}>
                    <use href="#expandMore"></use>
                  </svg>
                )}
              </div>
            </div>
            {!filterExtra?.isOpen && (
              <div className={styles.filter_modal_switch_caption}>
                {caption}
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className={styles.filter_expandable_filter__child}>
          <FilterContent />
        </div>
      )}
    </div>
  );
}

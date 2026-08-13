"use client";

import { useListing } from "@/contexts/ListingContext";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./sort.module.css";

function Sort() {
  const {
    data,
    totalItems,
    sortDefault,
    sortDefaultChangeHandler,
    params,
    isLoading,
  } = useListing();

  const { isSmallScreen } = useScreenStatus();

  if (isSmallScreen && isLoading) return;

  return (
    <div className={styles.sort_container}>
      <div className={styles.sort_content}>
        <div className={styles.sort_list_container}>
          <div className={styles.sort_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <div className={styles.sort_icon_container}>
                <svg className={styles.sort_icon}>
                  <use href="#sort"></use>
                </svg>
              </div>
              <p className={styles.sort_title}>
                <span className="position-relative">مرتب سازی:</span>
              </p>
            </div>
          </div>
          <div className={styles.sort_list}>
            {data?.sort_options?.map((sortOption) => (
              <span
                key={sortOption.id}
                className={`${styles.sort_item} ${
                  params?.sort == sortOption.id ||
                  sortDefault?.id === sortOption.id
                    ? styles.sort_item_active
                    : ""
                }`}
                onClick={() => sortDefaultChangeHandler(sortOption)}
              >
                {sortOption.title_fa}
              </span>
            ))}
          </div>
          <div className="me-auto d-block">
            <span className={styles.products_count}>
              {totalItems?.toLocaleString("fa-IR")} کالا
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sort;

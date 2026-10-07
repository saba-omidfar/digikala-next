"use client";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./pagination.module.css";

export default function Pagination({
  totalItems,
  currentPage,
  onPageChange,
  itemsPerPage = 20,
  className,
}) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const getVisiblePages = () => {
    if (pageCount <= 3)
      return Array.from({ length: pageCount }, (_, i) => i + 1);

    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= pageCount - 1)
      return [pageCount - 2, pageCount - 1, pageCount];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  // if (pageCount < 1) return null;

  return (
    pageCount > 1 && (
      <div className={`${styles.pagination_container} ${className}`}>
        <div
          className={styles.prev_page_btn_container}
          style={{ visibility: currentPage === 1 ? "hidden" : "visible" }}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <span className={styles.prev_page_btn_text}>قبلی</span>
          <div className="d-flex ms-2">
            <svg className={styles.prev_page_icon}>
              <use href="#chevronRight"></use>
            </svg>
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-center">
          {visiblePages[0] > 1 && (
            <>
              <span
                className={styles.page_number_btn}
                onClick={() => onPageChange(1)}
              >
                {toPersianDigits(1)}
              </span>
              {visiblePages[0] > 2 && "..."}
            </>
          )}

          {visiblePages.map((number) => (
            <span
              key={number}
              className={`${styles.page_number_btn} ${
                currentPage === number ? styles.page_number_btn__active : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              <span>{toPersianDigits(number)}</span>
            </span>
          ))}

          {visiblePages[visiblePages.length - 1] < pageCount && (
            <>
              {visiblePages[visiblePages.length - 1] < pageCount - 1 && "..."}
              <span
                className={styles.page_number_btn}
                onClick={() => onPageChange(pageCount)}
              >
                {toPersianDigits(pageCount)}
              </span>
            </>
          )}
        </div>

        <div
          className={styles.next_page_btn_container}
          style={{
            visibility: currentPage === pageCount ? "hidden" : "visible",
          }}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <div className="d-flex ms-2">
            <svg className={styles.next_page_icon}>
              <use href="#chevronLeft"></use>
            </svg>
          </div>
          <span className={styles.next_page_btn_text}>بعدی</span>
        </div>
      </div>
    )
  );
}

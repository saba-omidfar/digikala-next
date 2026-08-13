// "use client";

// import React, { useState, useEffect } from "react";
// import toPersianDigits from "@/utils/toPersianDigits";
// import styles from "./pagination.module.css";

// function Pagination({
//   itemsArray,
//   itemsArrayLength,
//   currentPage,
//   setCurrentPage,
//   setPaginatedItems,
// }) {
//   const [pageCount, setPageCount] = useState(null);
//   const [itemsPerPage, setItemsPerPage] = useState(20);

//   useEffect(() => {
//     let endIndex = currentPage * itemsPerPage;
//     let startIndex = endIndex - itemsPerPage;

//     let paginatedComments = itemsArray.slice(startIndex, endIndex);
//     setPaginatedItems(paginatedComments);

//     let pagesNumber = Math.ceil(itemsArrayLength / itemsPerPage);

//     setPageCount(pagesNumber);
//   }, [currentPage, itemsPerPage]);

//   const paginate = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const pageNumbers = [];
//   for (let i = 1; i <= pageCount; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     pageCount > 1 && (
//       <div className={styles.pagination_container}>
//         <div
//           className={styles.prev_page_btn_container}
//           style={{ visibility: currentPage === 1 ? "hidden" : "visible" }}
//           onClick={() => paginate(currentPage - 1)}
//         >
//           <span className={styles.prev_page_btn_text}>قبلی</span>
//           <div className="d-flex ms-2">
//             <div
//               data-icon-name="cube-value-chevron"
//               data-icon="&#xE9C1;"
//               className={`${styles.prev_page_icon} cube-font-icon`}
//             ></div>
//           </div>
//         </div>

//         <div className="d-flex align-items-center justify-content-center">
//           {pageNumbers.map((number) => (
//             <span
//               key={number}
//               className={`${styles.page_number_btn} ${
//                 currentPage === number ? styles.page_number_btn__active : ""
//               }`}
//               onClick={() => paginate(number)}
//             >
//               <span>{toPersianDigits(number)}</span>
//             </span>
//           ))}
//         </div>

//         <div
//           className={styles.next_page_btn_container}
//           style={{
//             visibility: currentPage === pageCount ? "hidden" : "visible",
//           }}
//           onClick={() => paginate(currentPage + 1)}
//         >
//           <div className="d-flex ms-2">
//             <div
//               data-icon-name="cube-value-chevron"
//               data-icon="&#xE9C2;"
//               className={`${styles.next_page_icon} cube-font-icon`}
//             ></div>
//           </div>
//           <span className={styles.next_page_btn_text}>بعدی</span>
//         </div>
//       </div>
//     )
//   );
// }

// export default Pagination;
"use client";

import toPersianDigits from "@/utils/toPersianDigits";
import styles from "./pagination.module.css";

function Pagination({
  totalItems,
  itemsArray,
  itemsArrayLength,
  currentPage,
  setCurrentPage,
  setPaginatedItems,
  onPageChange,
}) {
  // const itemsPerPage = 20;
  // const [pageCount, setPageCount] = useState(0);

  const itemsPerPage = 20;
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // useEffect(() => {
  //   if (!itemsArray) return;

  //   const endIndex = currentPage * itemsPerPage;
  //   const startIndex = endIndex - itemsPerPage;

  //   const paginatedItems = itemsArray.slice(startIndex, endIndex);
  //   setPaginatedItems(paginatedItems);

  //   const pagesNumber = Math.ceil(itemsArrayLength / itemsPerPage);
  //   setPageCount(pagesNumber);
  // }, [currentPage, itemsArray, itemsArrayLength]);

  // const paginate = (number) => {
  //   setCurrentPage(number);
  // };

  // اینجا پنجره صفحه‌ها رو محاسبه میکنیم
  const getVisiblePages = () => {
    if (pageCount <= 3)
      return Array.from({ length: pageCount }, (_, i) => i + 1);

    if (currentPage <= 2) return [1, 2, 3];
    if (currentPage >= pageCount - 1)
      return [pageCount - 2, pageCount - 1, pageCount];
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  const visiblePages = getVisiblePages();

  if (pageCount < 1) return null;

  return (
    pageCount > 1 && (
      <div className={styles.pagination_container}>
        {/* دکمه قبلی */}
        <div
          className={styles.prev_page_btn_container}
          style={{ visibility: currentPage === 1 ? "hidden" : "visible" }}
          // onClick={() => paginate(currentPage - 1)}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <span className={styles.prev_page_btn_text}>قبلی</span>
          <div className="d-flex ms-2">
            <svg className={styles.prev_page_icon}>
              <use href="#chevronRight"></use>
            </svg>
          </div>
        </div>

        {/* اعداد صفحات با ... */}
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
              // onClick={() => paginate(number)}

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
                // onClick={() => paginate(pageCount)}
                onClick={() => onPageChange(pageCount)}
              >
                {toPersianDigits(pageCount)}
              </span>
            </>
          )}
        </div>

        {/* دکمه بعدی */}
        <div
          className={styles.next_page_btn_container}
          style={{
            visibility: currentPage === pageCount ? "hidden" : "visible",
          }}
          // onClick={() => paginate(currentPage + 1)}
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

export default Pagination;

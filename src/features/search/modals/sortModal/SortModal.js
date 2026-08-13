import React from "react";

import { useModal } from "@/contexts/modalContext";
import { useListing } from "@/contexts/ListingContext";

import styles from "./sortModal.module.css";

function SortModal() {
  const { closeModal } = useModal();
  const { data, params, sortDefault, sortDefaultChangeHandler } = useListing();

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div className="d-flex align-items-center">
          <div className={styles.modal_header__title}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_header__title_text}>
                <span className="position-relative">مرتب‌سازی بر اساس</span>
              </p>
            </div>
          </div>
          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-icon-name="cube-close"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.content_wrapper}>
        <div className={styles.content}>
          <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
            <div>
              {data?.sort_options?.map((sortOption) => (
                <div
                  key={sortOption.id}
                  className="w-100"
                  onClick={() => {
                    sortDefaultChangeHandler(sortOption);
                    closeModal();
                  }}
                >
                  <div className="w-100 d-flex align-items-center justify-content-start">
                    <div className="flex-grow-1">
                      <div className={styles.modal_content_title_container}>
                        <div className={styles.modal_content_title}>
                          {sortOption.title_fa}
                        </div>
                        {params?.sort == sortOption.id ||
                        sortDefault?.id === sortOption.id ? (
                          <div className="d-flex">
                            <div
                              data-icon-name="cube-check"
                              data-icon="&#xE90F;"
                              className={`${styles.modal_sort_icon} cube-font-icon`}
                            ></div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortModal;

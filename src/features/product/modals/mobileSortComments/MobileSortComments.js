import { useState } from "react";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { useModal } from "@/contexts/modalContext";

import styles from "./mobileSortComments.module.css";

export default function MobileSortComments({ sortItems }) {
  const [selectedSort, setSelectedSort] = useState("جدیدترین");

  const { closeMobileModal } = useModal();

  const handleDismiss = () => {
    closeMobileModal();
  };

  const handleSortClick = (item) => {
    setSelectedSort(item);
    closeMobileModal();
  };

  return (
    <BottomSheet
      open
      onDismiss={handleDismiss}
      blocking
      snapPoints={({ maxHeight }) => [0.6 * maxHeight, maxHeight]}
      header={
        <div className={styles.header}>
          <span className={styles.header_title}> مرتب سازی بر اساس</span>
          <div className="d-flex" onClick={handleDismiss}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.close_icon} cube-font-icon`}
            ></div>
          </div>
        </div>
      }
    >
      <div>
        <div className={styles.content}>
          {sortItems?.map((item) => (
            <div
              key={item}
              className="w-100"
              data-cro-id="pdp-comment-sort"
              onClick={() => handleSortClick(item)}
            >
              <div className="w-100 d-flex align-items-center justify-content-start">
                <div className="flex-grow-1">
                  <div className={styles.sort_item_container}>
                    <div className={styles.sort_title}>{item}</div>
                    {selectedSort === item && (
                      <div className="d-flex">
                        <div
                          className={`${styles.check_icon} cube-font-icon`}
                          data-icon-name="cube-content-check"
                          data-icon="&#xE90F;"
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
}

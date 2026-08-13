"use client";

import React from "react";
import styles from "./filterChildren.module.css";

function FilterChildren({
  category,
  isLast,
  onClick,
  activeCategory,
  setActiveCategory,
}) {
  const hasChildren =
    category.categoryChilds &&
    Object.values(category.categoryChilds).flat().length > 0;

  const handleClick = () => {
    setActiveCategory(category);
    onClick(category);
  };

  return (
    <div
      className={`${styles.category_item} ${
        activeCategory?.title_fa === category.title_fa
          ? styles.active
          : ""
      }`}
      style={{ borderBottom: isLast ? "none" : "1px solid #f0f0f1" }}
      onClick={handleClick}
    >
      <div className="w-100">
        <div className="d-flex align-items-center justify-content-between">
          <div className={styles.category_icon_container}>
            {hasChildren && (
              <div
                data-icon-name="cube-arrow"
                data-icon={
                  activeCategory?.title_fa === category.title_fa
                    ? "\uE9BF"
                    : "\uE9C2"
                }
                className={`${styles.category_icon} cube-font-icon`}
              ></div>
            )}
          </div>
          <div className="flex-grow-1">
            <div className={styles.category_title}>
              <p>{category.title_fa}</p>
            </div>
          </div>

          <div className="d-flex align-items-center">
            {activeCategory?.title_fa === category.title_fa && (
              <div
                data-icon-name="cube-check"
                data-icon="&#xE90F;"
                className={`${styles.check_icon} cube-font-icon`}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterChildren;

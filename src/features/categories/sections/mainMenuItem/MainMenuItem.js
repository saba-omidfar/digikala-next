"use client";

import React, { memo } from "react";

import styles from "./mainMenuItem.module.css";

function MainMenuItem({ category, isActive, onClick }) {
  return (
    <div
      className={`${styles.main_menu_item} ${
        isActive ? styles.main_menu_item__active : ""
      }`}
      id="MegaMenu-category"
      onClick={onClick}
    >
      <div className={styles.item_icon_container}>
        <div
          className={`${category.icon} ${styles.item_icon} cube-font-icon`}
          data-icon-name={category.icon}
        ></div>
      </div>

      <span className={styles.main_menu_item_title}>{category.title}</span>
    </div>
  );
}

export default memo(MainMenuItem);

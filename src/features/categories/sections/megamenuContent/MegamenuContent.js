"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import SubCategoryList from "../subCategoryList/SubCategoryList";

import styles from "./megamenuContent.module.css";

function MegamenuContent({ activeCategory, expandedItems, onToggleAccordion }) {
  const groups = useMemo(() => {
    return Object.values(activeCategory?.children ?? {});
  }, [activeCategory]);

  if (!activeCategory) return;

  return (
    <div className={styles.main_menu_content_container}>
      <div className={styles.mega_menu_all_cat_container}>
        <Link
          className={styles.mega_menu_all_cat_link}
          id="mega-menu-all-cat"
          href={activeCategory.plp_url.uri || "#"}
        >
          <div className={styles.mega_menu_all_cat_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.mega_menu_all_cat_title}>
                <span className="position-relative">
                  {`همه محصولات ${activeCategory.title}`}
                </span>
              </p>

              <div className={styles.arrow_icon_container} aria-hidden="false">
                <svg className={styles.arrow_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </div>
          </div>
        </Link>

        {groups.map((subCategory) => {
          const isExpanded = expandedItems?.[subCategory.id];

          return (
            <SubCategoryList
              key={subCategory.id}
              subCategory={subCategory}
              isExpanded={isExpanded}
              onToggle={() => onToggleAccordion(subCategory.id)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(MegamenuContent);

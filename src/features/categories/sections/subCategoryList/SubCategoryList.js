"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./subCategoryList.module.css";

function SubCategoryList({ subCategory, isExpanded, onToggle }) {
  const hasChildren = subCategory?.children?.length > 0;

  const isLink = !hasChildren;

  const handleToggle = useCallback(() => {
    if (!hasChildren) return;

    onToggle?.();
  }, [hasChildren, onToggle]);

  const Wrapper = isLink ? Link : "div";

  console.log(subCategory);

  return (
    <Wrapper
      {...(isLink
        ? { href: subCategory?.url?.uri || "#" }
        : { onClick: handleToggle })}
      className={styles.mega_menu_parent_container}
      id="mega-menu-parent"
    >
      <div className={styles.mega_menu_parent}>
        <div className="d-flex align-items-center flex-grow-1">
          <p className="flex-grow-1">
            <span className="position-relative">{subCategory?.title}</span>
          </p>

          {hasChildren && (
            <div className={styles.arrow_icon_container}>
              <div
                data-icon-name={
                  isExpanded ? "cube-arrow-up" : "cube-arrow-down"
                }
                data-icon={isExpanded ? "\uE9C0" : "\uE9BF"}
                className={`${styles.mega_menu_parent_icon} cube-font-icon`}
              />
            </div>
          )}
        </div>
      </div>

      {isExpanded && hasChildren && (
        <div className={styles.mega_menu_leaf_container}>
          <div className={styles.mega_menu_leaf}>
            {subCategory.children?.map((child) => (
              <Link
                key={child.id}
                id="mega_menu_leaf"
                className={styles.mega_menu_leaf__link}
                href={child?.url?.uri || "#"}
              >
                <div className={styles.category_item_img_bg}>
                  <div className={styles.mega_menu_leaf_img_container}>
                    <Image
                      className={styles.mega_menu_leaf_img}
                      src={child?.image || ""}
                      width={45}
                      height={45}
                      alt=""
                    />
                  </div>
                </div>

                {child?.title}
              </Link>
            ))}

            <Link
              className={styles.mega_menu_leaf__link}
              href={subCategory?.url?.uri || "#"}
            >
              <div className={styles.category_item_img_bg}>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.grid_layout_icon}>
                    <use href="#gridLayout"></use>
                  </svg>
                </div>
              </div>
              همه کالاها
            </Link>
          </div>
        </div>
      )}
    </Wrapper>
  );
}

export default React.memo(SubCategoryList);

"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import Link from "next/link";

import { useGetMegamenu } from "@/hooks/useMegamenu";

import styles from "./megamenu.module.css";

function Megamenu() {
  const contentRef = useRef(null);

  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [maxHeight, setMaxHeight] = useState("600px");

  const { data, isLoading: categoriesIsLoading } = useGetMegamenu();

  useEffect(() => {
    if (!data?.length) return;

    setActiveCategoryId((prev) => prev ?? data[0].id);
  }, [data]);

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = window.innerHeight - 205;
      setMaxHeight(`${newHeight}px`);
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  const categoriesMap = useMemo(() => {
    if (!data?.length) return new Map();

    return new Map(data.map((category) => [category.id, category]));
  }, [data]);

  const activeCategory = useMemo(() => {
    return categoriesMap.get(activeCategoryId);
  }, [categoriesMap, activeCategoryId]);

  useEffect(() => {
    contentRef.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [activeCategoryId]);

  const handleCategoryHover = useCallback((categoryId) => {
    setActiveCategoryId((prev) => (prev === categoryId ? prev : categoryId));
  }, []);

  const columns = useMemo(() => {
    if (!activeCategory?.children) return [];

    const grouped = {};

    activeCategory.children.forEach((item) => {
      const column = item.column_number ?? 1;

      if (!grouped[column]) {
        grouped[column] = [];
      }

      grouped[column].push(item);
    });

    Object.values(grouped).forEach((column) => {
      column.sort((a, b) => a.row_number - b.row_number);
    });

    return Object.values(grouped);
  }, [activeCategory]);

  if (categoriesIsLoading) {
    return (
      <div className={styles.mega_menu}>
        <div className="overlay" />
      </div>
    );
  }

  return (
    <div
      className={styles.mega_menu}
      style={{ width: "auto", height: maxHeight }}
    >
      <div className="d-flex w-100 h-100 position-relative">
        <div className={styles.main_categories}>
          {data?.map((category) => {
            const isActive = category.id === activeCategoryId;

            return (
              <Link
                key={category.id}
                href={category?.url?.uri || "#"}
                className={styles.category_title__link}
                onMouseEnter={() => handleCategoryHover(category.id)}
              >
                <span className="d-flex align-items-center h-100 w-100">
                  <div
                    className={styles.item_icon_container}
                    aria-hidden="false"
                  >
                    <div
                      className={`${category.icon} ${styles.item_icon} cube-font-icon`}
                      data-icon-name={category.icon}
                    ></div>
                  </div>

                  <p className={styles.category_name} data-active={isActive}>
                    {category.title}
                  </p>
                </span>
              </Link>
            );
          })}
        </div>

        <div ref={contentRef} className={styles.categories_content_section}>
          <div className={styles.categories_content_item}>
            <div className="d-flex flex-column h-100 flex-1 flex-grow-1">
              {activeCategory && (
                <>
                  <Link
                    className={styles.category_title}
                    href={activeCategory?.url?.uri || "#"}
                    id="mega-menu-all-cat"
                  >
                    {`همه محصولات ${activeCategory.title}`}

                    <div className="d-flex me-1" aria-hidden="false">
                      <svg className={styles.arrow_icon}>
                        <use href="#chevronLeft" />
                      </svg>
                    </div>
                  </Link>

                  <ul className={styles.categories_container}>
                    {columns.map((column, index) => (
                      <div key={index} className={styles.category_column}>
                        {column.map((subCategory) => (
                          <React.Fragment key={subCategory.id}>
                            <>
                              <Link
                                className={styles.subCategory_title__link}
                                href={subCategory?.url?.uri || "#"}
                              >
                                <span className={styles.subCategory_title}>
                                  {subCategory.title}
                                </span>

                                <svg
                                  className={
                                    styles.subCategory_title_arrow_icon
                                  }
                                >
                                  <use href="#chevronLeft" />
                                </svg>
                              </Link>

                              {subCategory?.children?.map((child) => (
                                <Link
                                  key={child.id}
                                  className={styles.subCategory_item__link}
                                  href={child?.url?.uri || "#"}
                                >
                                  <span
                                    className={styles.subCategory_item__text}
                                  >
                                    {child.title}
                                  </span>
                                </Link>
                              ))}
                            </>
                          </React.Fragment>
                        ))}
                      </div>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Megamenu);

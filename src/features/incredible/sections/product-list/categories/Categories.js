"use client";

import { useState } from "react";

import CategoryCard from "@/features/incredible/sections/product-list/categories/CategoryCard";

import { useListing } from "@/contexts/ListingContext";

import styles from "./categories.module.css";

export default function Categories() {
  const { data } = useListing();

  const [showAllCategories, setShowAllCategories] = useState(false);
  const subCategoriesLength = data?.sub_categories_best_selling?.length;

  if (!data?.sub_categories_best_selling?.length) return;

  return (
    <div className={styles.categories_container}>
      <div className={styles.categories}>
        {data?.sub_categories_best_selling
          ?.slice(0, showAllCategories ? subCategoriesLength : 7)
          ?.map((subCategory) => (
            <CategoryCard key={subCategory.id} subCategory={subCategory} />
          ))}
        {subCategoriesLength > 8 && !showAllCategories && (
          <span
            id="plp-shortcut-category"
            className={styles.category_card__more_btn}
            onClick={() => setShowAllCategories(true)}
          >
            <div className={styles.category_card__more_text}>مشاهده</div>
            <div className={styles.category_card__more_count}>
              {(subCategoriesLength - 7).toLocaleString("fa-IR")}
            </div>
            <div className={styles.category_card__more_text}>
              دسته‌بندی دیگر
            </div>
          </span>
        )}
      </div>
    </div>
  );
}

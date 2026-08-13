"use client";
import Link from "next/link";

import styles from "./categories.module.css";

function Categories({ categories }) {
  if (!categories?.length) return null;

  return (
    <div className={styles.categories_container}>
      <div className={styles.categories_title_container}>
        <h3 className={styles.categories_title}>خرید بر اساس دسته‌بندی</h3>
      </div>
      <div className={styles.categories_content}>
        {categories?.map((category) => (
          <span key={category?.id} id="categories-icons">
            <Link href={category?.url?.uri} className={styles.category_link}>
              <div
                className={styles.category_img_container}
                aria-hidden="false"
                aria-label={category?.title_fa}
              >
                <img
                  className={styles.category_img}
                  src={category?.top_product_image}
                  alt={category?.title_fa}
                />
              </div>
              <p className={styles.category_name}>{category?.title_fa}</p>
            </Link>
          </span>
        ))}
      </div>
    </div>
  );
}

export default Categories;

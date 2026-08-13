import Link from "next/link";

import styles from "./categories.module.css";

export default function Categories({
  activeRange,
  activeCategoryId,
  categories,
}) {
  return (
    <div className={styles.best_selling_categories_container}>
      <Link className={styles.best_selling_category_link} href="/best-selling/">
        <div
          className={`${styles.best_selling_category_chip} ${
            !activeCategoryId ? styles.best_selling_category_chip__active : ""
          }`}
        >
          <span>همه نوع کالا</span>
        </div>
      </Link>
      {categories?.map((category) => (
        <Link
          key={category?.id}
          className={styles.best_selling_category_link}
          href={
            activeRange === "week"
              ? `/best-selling?category_id=${category.id}`
              : `/best-selling?category_id=${category.id}&last_days=${activeRange}`
          }
        >
          <div
            className={`${styles.best_selling_category_chip} ${
              Number(activeCategoryId) === category.id
                ? styles.best_selling_category_chip__active
                : ""
            }`}
          >
            <span>{category.title_fa}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

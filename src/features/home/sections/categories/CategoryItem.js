import Link from "next/link";

import styles from "./categoryItem.module.css";

function CategoryItem({ category }) {
  return (
    <Link
      className="d-flex flex-column align-items-center user-select-none w-100"
      href={category?.link?.url || "#"}
    >
      <div className={styles.category_img_container}>
        <picture>
          <source type="image/webp" srcSet={category?.image?.url} />
          <source type="image/jpeg" srcSet={category?.image?.url} />
          <img
            className={styles.category_img}
            src={category?.image?.url}
            alt={category?.title}
          />
        </picture>
      </div>
      <p className={styles.category_name}>{category?.title}</p>
    </Link>
  );
}

export default CategoryItem;

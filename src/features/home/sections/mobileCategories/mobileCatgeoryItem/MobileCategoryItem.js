import Link from "next/link";

import styles from "./mobileCategoryItem.module.css";

export default function MobileCategoryItem({ groupedCategories }) {
  return (
    <>
      {groupedCategories?.map((category) => (
        <Link
          key={category?.title || category?.title_fa}
          className="d-flex flex-column align-items-center user-select-none w-100"
          href={category?.link?.url || category?.url?.uri}
        >
          <div className={styles.category_img_container}>
            <picture>
              <source type="image/webp" srcSet={category?.image?.url} />
              <source type="image/jpeg" srcSet={category?.image?.url} />
              <img
                className={styles.category_img}
                src={category?.image?.url}
                alt={category?.title || category?.title_fa}
              />
            </picture>
          </div>
          <p className={styles.category_name}>
            {category?.title || category?.title_fa}
          </p>
        </Link>
      ))}
    </>
  );
}

import MobileCategoryItem from "./mobileCatgeoryItem/MobileCategoryItem";

import chunkArray from "@/utils/chunkArray";

import styles from "./mobileCategories.module.css";

export default function MobileCategories({ categories }) {
  const items = categories?.items || [];

  const columns = chunkArray(items, 2);

  return (
    <div className="lazyload-wrapper">
      <div className="d-flex w-100 flex-column align-items-center">
        <div className="w-100">
          <div className={styles.categories_title_container}>
            <div className="d-flex align-items-center">
              <h5 className={styles.categories_title}>{categories?.title}</h5>
            </div>
          </div>

          <div className={styles.categories_container}>
            <div></div>
            {columns.map((groupedCategories, index) => (
              <div className={styles.categories_column} key={index}>
                <MobileCategoryItem groupedCategories={groupedCategories} />
              </div>
            ))}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

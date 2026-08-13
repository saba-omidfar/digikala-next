import styles from "./categoryItem.module.css";

export default function CategoryItem({ item, navigateToCategory }) {
  return (
    <div className={styles.category_item}>
      <div
        className={styles.tree_item_container}
        onClick={() => navigateToCategory(item)}
      >
        <div className="w-100 d-flex align-items-center justify-content-start">
          {item?.children?.length ? (
            <div className={styles.tree_item}>
              <svg className={styles.chevron_icon}>
                <use href="#chevronLeft" />
              </svg>
            </div>
          ) : (
            <div className={styles.empty_icon_container}>
              <span className={styles.empty_icon}></span>
            </div>
          )}

          <div className={styles.categories_title_container}>
            <div className={styles.categories_title}>{item.title_fa}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

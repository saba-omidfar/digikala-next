import CategoryItem from "./CategoryItem";

import styles from "./categories.module.css";

export default function Categories({ categories }) {
  const rowsCount = categories?.number_of_rows || 1;
  const items = categories?.items || [];

  const itemsPerRow = Math.ceil(items.length / rowsCount);

  const rows = Array.from({ length: rowsCount }, (_, rowIndex) =>
    items.slice(rowIndex * itemsPerRow, (rowIndex + 1) * itemsPerRow),
  );

  return (
    <div className={styles.content}>
      <div className={styles.section_title_container}>
        <h1 className={styles.section_title}>{categories?.title}</h1>
      </div>
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.categories_container}>
            {row.map((category, index) => (
              <CategoryItem key={category.title || index} category={category} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

import styles from "./emptyContainer.module.css";

function EmptyContainer() {
  return (
    <div className="lazyload-wrapper w-100">
      <div className="w-100">
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.empty_space}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyContainer;

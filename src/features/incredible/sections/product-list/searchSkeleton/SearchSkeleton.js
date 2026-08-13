import styles from "./searchSkeleton.module.css";

function SearchSkeleton() {
  return (
    <div className={styles.skeleton_container}>
      <div className={styles.skeleton_icon_container}>
        <div className={styles.skeleton_icon}></div>
      </div>
      <div className={styles.skeleton_title_container}>
        <div className={styles.skeleton_title}></div>
      </div>
      <div className={styles.skeleton_subtitle_container}>
        <div className={styles.skeleton_subtitle}></div>
      </div>
    </div>
  );
}
export default SearchSkeleton;

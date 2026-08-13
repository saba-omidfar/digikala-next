import styles from "./productContentTitle.module.css";

function ProductContentTitle({ title, description, isSlider }) {
  return (
    <div
      className={`${styles.content_title_container} ${
        isSlider ? styles.content_title_padding : ""
      }`}
    >
      <div className="d-flex align-items-center flex-grow-1">
        <h2 className={styles.content_title}>
          <span className="position-relative">{title}</span>
        </h2>
      </div>
      {description ? (
        <div className={styles.content_title_description}>{description}</div>
      ) : (
        ""
      )}
      <div className={styles.content_title_line}></div>
    </div>
  );
}
export default ProductContentTitle;

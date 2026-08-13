import InfoRow from "../infoRow/InfoRow";

import styles from "./infoSection.module.css";

function InfoSection({
  id,
  title,
  items,
  isTrustedBadge,
  children,
  btnTitle,
  btnIcon,
  openModal,
}) {
  return (
    <>
      <div
        className={`${styles.content_container} ${id === "rules" ? styles.rules_content_container : ""} ${
          id === "review" ? styles.review_content_container : ""
        } ${id === "comment" ? styles.comment_content_container : ""} ${
          id === "question" ? styles.question_content_container : ""
        }`}
      >
        <div
          className={`${styles.content} ${id === "review" ? styles.review_content : ""} ${id === "comment" ? styles.comment_content : ""} ${
            id === "question" ? styles.question_content : ""
          }`}
        >
          <div className={styles.header}>
            <span className="d-flex">
              <div className="d-flex flex-column justify-content-center align-items-start gap-1">
                <div className="d-flex align-items-center gap-1 flex-wrap">
                  <div className={styles.title_container}>
                    <span className={styles.title}>{title}</span>
                  </div>
                </div>
              </div>
            </span>

            {btnTitle && (id === "comment" || id === "question") && (
              <button className={styles.btn} onClick={openModal}>
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <span className={styles.btn_title}>
                    {btnTitle}
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.btn_icon}>
                        <use href="#chevronLeft"></use>
                      </svg>
                    </div>
                  </span>
                </div>
              </button>
            )}
          </div>
        </div>

        {items &&
          items.length > 0 &&
          items.map((item, index) => (
            <InfoRow
              key={index}
              {...item}
              isLast={index === items.length - 1}
              isTrustedBadge={isTrustedBadge}
            />
          ))}
        {children && children}
      </div>
    </>
  );
}

export default InfoSection;

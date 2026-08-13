import styles from "./rule.module.css";

function Rule({
  title,
  icon,
  chevronIcon,
  iconName,
  description,
  contentBox,
  clickHandler,
  isLast,
}) {
  return (
    <div className={styles.rule_item_container} onClick={clickHandler}>
      <div className={styles.rule_icon_container}>
        <div className={styles.rule_icon_bg} aria-hidden="false">
          <div
            className={`${styles.rule_icon} cube-font-icon`}
            data-icon-name={iconName}
            data-icon={String.fromCharCode(parseInt(icon, 16))}
          ></div>
        </div>
      </div>
      <div
        className={`${styles.rule_title_container} ${!isLast ? styles.border_bottom : ""}`}
      >
        <div className="d-flex justify-content-between align-items-center">
          <span className={styles.rule_title}>{title}</span>
          {icon && !chevronIcon ? (
            <div className="d-flex" aria-hidden="false">
              <div
                className={`${styles.chevron_icon} cube-font-icon`}
                data-icon-name="cube-nav-chevron-left"
                data-icon=""
              ></div>
            </div>
          ) : (
            ""
          )}
        </div>
        {description && (
          <p className={styles.rule_description}>{description}</p>
        )}
        {contentBox && <p className={styles.content_box}>{contentBox}</p>}
      </div>
    </div>
  );
}

export default Rule;

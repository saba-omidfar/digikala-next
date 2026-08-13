import styles from "./digiplusBenefitItem.module.css";

export default function DigiplusBenefitItem({ benefit }) {
  return (
    <div>
      <div className="d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div
            className="position-relative d-flex align-items-center justify-conetnt-center"
            style={{ width: "24px" }}
          >
            <div className="d-flex">
              <div
                data-icon-name="cube-variation-color"
                data-icon="&#xEAF3;"
                className={`${styles.variation_color_icon} cube-font-icon`}
              ></div>
            </div>
            <span
              className={styles.line}
              style={{ height: `calc(50% - 5px)`, top: "0" }}
            ></span>
            <span
              className={styles.line}
              style={{ height: `calc(50% - 5px)`, bottom: "0" }}
            ></span>
          </div>
          <h3 className={styles.digiplus_benefit_item_3_text}>
            {benefit.serviceTitle}
          </h3>
          {benefit.serviceBadge.badgeTitle && (
            <div className={styles.digiplus_benefit_titleBg}>
              <div className="d-flex">
                <div
                  data-icon-name="cube-badge-new-seller"
                  data-icon="&#xEA96;"
                  className={`${styles.digiplus_benefit_titleBg_icon} cube-font-icon`}
                ></div>
              </div>
              <div className={styles.digiplus_benefit_titleBg_text}>
                {benefit.serviceBadge.badgeTitle}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

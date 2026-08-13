import Link from "next/link";

import hexToRgb from "@/utils/hexToRgb";
import { getScoreClass } from "@/utils/getScoreClass";
import toPersianDigits from "@/utils/toPersianDigits";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./sellerInfos.module.css";

function SellerInfos() {
  const { activeVariant } = useProductContext();

  const isTrusted = activeVariant?.seller?.properties?.is_trusted;
  const isOfficial = activeVariant?.seller?.properties?.is_official;

  return (
    <Link
      className={styles.seller_link}
      href={activeVariant?.seller?.url || "#"}
    >
      {/* Header */}
      <div className="position-relative">
        {activeVariant?.seller?.title === "دیجی‌کالا" ? (
          <div className={styles.digikala_badge_icon_container}>
            <div
              className={`${styles.digikala_badge_icon} cube-font-icon`}
              data-icon-name="cube-badge-dk-smile"
              data-icon=""
            ></div>
          </div>
        ) : (
          <>
            <div className={styles.seller_icon_container} aria-hidden="false">
              <div
                className={`${styles.seller_icon} cube-font-icon`}
                data-icon-name="cube-shop-seller"
                data-icon=""
              ></div>
            </div>
            <div
              className={`${styles.seller_badge_icon_container} ${isTrusted ? styles.seller_trusted_badge_icon : styles.seller_official_badge_icon}`}
              aria-hidden="false"
            >
              <div
                className={`${styles.seller_badge_icon} cube-font-icon`}
                data-icon-name="cube-badge-verified"
                data-icon=""
              ></div>
            </div>
          </>
        )}
      </div>

      {/* infos */}
      <div className={styles.seller_infos}>
        <div className="d-flex justify-content-start align-items-center w-100">
          <span className={styles.seller_title}>
            {activeVariant?.seller?.title}
          </span>
          <div className="d-flex" aria-hidden="false">
            <div
              className={`${styles.chevron_icon} cube-font-icon`}
              data-icon-name="cube-nav-chevron-left"
              data-icon=""
            ></div>
          </div>
          {isOfficial ? (
            <span
              className={`${styles.seller_badge_text} ${styles.seller_official_badge_text}`}
            >
              رسمی
            </span>
          ) : (
            ""
          )}

          {isTrusted ? (
            <span
              className={`${styles.seller_badge_text} ${styles.seller_trusted_badge_text}`}
            >
              منتخب
            </span>
          ) : (
            ""
          )}
        </div>
        <div className={styles.seller_grade_container}>
          {activeVariant?.statistics ? (
            <div className={styles.seller_statistics_container}>
              رضایت از کالا
              <span
                className={styles.seller_statistics}
                style={{
                  backgroundColor: activeVariant?.statistics.total_rate
                    ? `var(--${getScoreClass(Math.round(activeVariant?.statistics.total_rate / 10))})`
                    : "",
                }}
              >
                {toPersianDigits(activeVariant?.statistics?.total_rate)}٪
              </span>
            </div>
          ) : (
            ""
          )}
          {activeVariant?.seller?.grade ? (
            <div className={styles.seller_grade_label_container}>
              عملکرد
              <span
                className={styles.seller_grade_label}
                style={{
                  backgroundColor: activeVariant?.seller?.grade
                    ? `rgb(${hexToRgb(activeVariant?.seller?.grade?.color)})`
                    : "",
                }}
              >
                {activeVariant?.seller?.grade?.label}
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </Link>
  );
}

export default SellerInfos;

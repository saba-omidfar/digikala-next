import Link from "next/link";

import { getScoreClass, getScoreLabel } from "@/utils/getScoreClass";
import toPersianDigits from "@/utils/toPersianDigits";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./sellerBox.module.css";

export default function SellerBox({
  setReferenceElement,
  setIsOpenSellerPopper,
}) {
  const { activeVariant } = useProductContext();

  const isTrusted = activeVariant?.seller?.properties?.is_trusted;
  const isOfficial = activeVariant?.seller?.properties?.is_official;

  return (
    <div>
      <Link
        href="#"
        target="_blank"
        ref={setReferenceElement}
        className={styles.seller_link}
        onMouseEnter={() => setIsOpenSellerPopper(true)}
        onMouseLeave={() => setIsOpenSellerPopper(false)}
      >
        <div className="d-flex w-100 px-3">
          <div className="py-3 d-flex flex-grow-1 pt-0 pb-3">
            <div style={{ marginLeft: "16px" }}>
              <div className="position-relative">
                {activeVariant?.seller?.title === "دیجی‌کالا" ? (
                  <div className={styles.digikala_icon_container}>
                    <div className="d-flex">
                      <div
                        data-icon-name="cube-dk"
                        data-icon="&#xE9E3;"
                        className={`${styles.digikala_icon_badge} cube-font-icon`}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div
                    data-icon-name="cube-seller"
                    data-icon="&#xE920;"
                    className={`${styles.seller_icon} cube-font-icon`}
                  ></div>
                )}

                {activeVariant?.seller?.properties?.is_official && (
                  <div
                    className={`${styles.seller_icon_badge_container} ${activeVariant?.seller?.properties?.is_official ? styles.is_official_badge : ""} ${activeVariant?.seller?.properties?.is_trusted ? styles.is_trusted_badge : ""}`}
                    aria-hidden="false"
                  >
                    <svg
                      className={`${activeVariant?.seller?.properties?.is_official ? styles.is_official_icon : ""} ${activeVariant?.seller?.properties?.is_trusted ? styles.is_trusted_icon : ""}`}
                    >
                      <use href="#verifiedUser"></use>
                    </svg>
                  </div>
                )}

                {activeVariant?.seller?.properties?.is_trusted && (
                  <div
                    className={`${styles.seller_icon_badge_container} ${activeVariant?.seller?.properties?.is_official ? styles.is_official_badge : ""} ${activeVariant?.seller?.properties?.is_trusted ? styles.is_trusted_badge : ""}`}
                    aria-hidden="false"
                  >
                    <svg
                      className={`${activeVariant?.seller?.properties?.is_official ? styles.is_official_icon : ""} ${activeVariant?.seller?.properties?.is_trusted ? styles.is_trusted_icon : ""}`}
                    >
                      <use href="#verifiedUser"></use>
                    </svg>
                  </div>
                )}
              </div>
            </div>
            <div className="d-flex w-100">
              <div>
                <div
                  className="d-flex align-items-center"
                  style={{ marginBottom: "4px" }}
                >
                  <span className={styles.seller_name}>
                    {activeVariant?.seller?.title}
                  </span>

                  {/* Is_Official */}
                  {isOfficial && (
                    <div
                      className={`${styles.seller_badge_properties} ${
                        isOfficial ? styles.seller_badge_is_official : ""
                      }`}
                    >
                      <div className={styles.seller_badge}>
                        <p className={styles.seller_badge_text}>رسمی</p>
                      </div>
                    </div>
                  )}

                  {/* Is_Trusted */}
                  {isTrusted && (
                    <div
                      className={`${styles.seller_badge_properties} ${
                        isTrusted ? styles.seller_badge_is_trusted : ""
                      }`}
                    >
                      <div className={styles.seller_badge}>
                        <p className={styles.seller_badge_text}>منتخب</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className={styles.seller_performance}>
                  {activeVariant?.statistics?.total_rate && (
                    <div className={styles.divider}>
                      <p
                        className={`${styles.seller_performance_percent} ${getScoreClass(
                          activeVariant?.statistics?.total_rate / 10,
                        )}`}
                      >
                        {toPersianDigits(activeVariant?.statistics?.total_rate)}
                        ٪
                      </p>
                      <p className={styles.seller_performance_text}>
                        رضایت از کالا
                      </p>
                    </div>
                  )}
                  <div className="pe-2 d-flex align-items-center">
                    <p className={styles.seller_performance_text}>عملکرد</p>
                    <p
                      className={`${styles.seller_performance_percent} ${getScoreLabel(
                        activeVariant?.seller?.grade?.label,
                      )}`}
                    >
                      {activeVariant?.seller?.grade?.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

import toPersianDigits from "@/utils/toPersianDigits";
import { getScoreClass, getScoreLabel } from "@/utils/getScoreClass";

import styles from "./sellerPopper.module.css";

export default function SellerPopper({
  seller,
  isOpenSellerPopper,
  isSellerSection = false,
  setPopperElement,
  popperStyles,
  attributes,
}) {
  const mainSeller = seller?.seller ?? seller;

  return (
    <div
      ref={setPopperElement}
      style={popperStyles?.popper}
      {...attributes?.popper}
      className={`${
        isSellerSection
          ? styles.seller_popper__seller_section
          : styles.seller_popper
      } ${isOpenSellerPopper ? styles.popper__animated_active : styles.popper__animated_inactive}`}
    >
      <div className={styles.seller_popper_content}>
        <div className={styles.seller_popper_content_header}>
          فروشگاه {mainSeller?.title}
        </div>
        <p className={styles.seller_popper_content_membership}>
          عضو از{" "}
          {toPersianDigits(
            mainSeller?.seller
              ? mainSeller?.seller?.registration_date
              : mainSeller?.registration_date,
          )}
        </p>
        {mainSeller?.statistics ? (
          <>
            <div style={{ marginTop: "16px", textAlign: "center" }}>
              <p
                className={`${
                  styles.seller_popper_content_score
                } ${getScoreClass(mainSeller?.statistics?.total_rate / 10)}`}
              >
                {mainSeller?.statistics?.total_rate
                  ?.toLocaleString("fa-IR")
                  .replace("٫", ".")}
                %
              </p>
              <p className={styles.seller_popper_content_customer_satisfaction}>
                رضایت خریداران از کیفیت کالاها
              </p>
              <p className={styles.seller_popper_content_customer_score}>
                {mainSeller?.statistics?.total_count?.toLocaleString("fa-IR")}{" "}
                نفر امتیاز داده‌اند
              </p>
            </div>
            <div className={styles.seller_popper_successBar}>
              <div
                className={styles.seller_info_details__successBar}
                style={{
                  width: `${mainSeller?.statistics?.totally_satisfied?.rate}%`,
                  backgroundColor: "#00a049",
                }}
              ></div>
              <div
                className={styles.seller_info_details__successBar}
                style={{
                  width: `${mainSeller?.statistics?.satisfied?.rate}%`,
                  backgroundColor: "#65aa57",
                }}
              ></div>
              <div
                className={styles.seller_info_details__successBar}
                style={{
                  width: `${mainSeller?.statistics?.neutral?.rate}%`,
                  backgroundColor: "#b1b64d",
                }}
              ></div>
              <div
                className={styles.seller_info_details__successBar}
                style={{
                  width: `${mainSeller?.statistics?.dissatisfied?.rate}%`,
                  backgroundColor: "#f9bc00",
                }}
              ></div>
              <div
                className={styles.seller_info_details__successBar_hint}
                style={{
                  width: `${mainSeller?.statistics?.totally_dissatisfied?.rate}%`,
                  backgroundColor: "#f9a825",
                }}
              ></div>
            </div>
            <div className={styles.seller_popper_successBar_caption}>
              <span>کاملا راضی</span>
              <span>کاملا ناراضی</span>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="text-center my-2">
          <p
            className={`${styles.seller_popper_performance} ${getScoreLabel(
              mainSeller?.grade?.label,
            )}`}
          >
            {mainSeller?.grade?.label}
          </p>
          <p className={styles.seller_popper_performance_caption}>
            عملکرد کلی فروشنده
          </p>
        </div>
        <div className="d-flex align-content-center mt-2 justify-content-between">
          <div className="text-center">
            <p className={styles.seller_popper_footer_text}>
              {toPersianDigits(
                mainSeller?.seller
                  ? mainSeller?.seller?.rating?.on_time_shipping
                  : mainSeller?.rating?.on_time_shipping,
              )?.replace("٫", ".")}
              %
            </p>
            <p className={styles.seller_popper_footer_caption}>تامین به موقع</p>
          </div>
          <div className="text-center">
            <p className={styles.seller_popper_footer_text}>
              {toPersianDigits(
                mainSeller?.seller
                  ? mainSeller?.seller?.rating?.commitment
                  : mainSeller?.rating?.commitment,
              )?.replace("٫", ".")}
              %
            </p>
            <p className={styles.seller_popper_footer_caption}>تعهد ارسال</p>
          </div>
          <div className="text-center">
            <p className={styles.seller_popper_footer_text}>
              {toPersianDigits(
                mainSeller?.seller
                  ? mainSeller?.seller?.rating?.no_return
                  : mainSeller?.rating?.no_return,
              )?.replace("٫", ".")}
              %
            </p>
            <p className={styles.seller_popper_footer_caption}>بدون مرجوعی</p>
          </div>
        </div>
      </div>
    </div>
  );
}

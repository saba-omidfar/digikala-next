"use client";

import { BottomSheet } from "@percivel/react-spring-bottom-sheet";
import "@percivel/react-spring-bottom-sheet/dist/style.css";

import { useCartContext } from "@/contexts/CartContext";
import toPersianDigits from "@/utils/toPersianDigits";
import { useModal } from "@/contexts/modalContext";

import styles from "./cartBillBoxModal.module.css";

export default function CartBillBoxModal() {
  const { cart } = useCartContext();
  const { closeMobileModal } = useModal();

  const handleDismiss = () => {
    closeMobileModal();
  };

  const hasCartInsurance = cart?.packages?.flatMap((item) =>
    item.cart_items?.some((cartItem) => cartItem.has_insurance),
  )[0];

  return (
    <BottomSheet
      open
      onDismiss={handleDismiss}
      blocking
      expandOnContentDrag
      skipInitialTransition={false}
      snapPoints={({ maxHeight }) => [maxHeight * 0.8]}
      defaultSnap={({ maxHeight }) => maxHeight}
      className={styles.sheet}
      header={
        <div className={styles.header_container}>
          <div className={styles.header}>
            <button
              type="button"
              className={styles.close_icon_container}
              aria-label="بستن"
              onClick={handleDismiss}
            >
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.close_icon} cube-font-icon`}
                  data-icon-name="cube-nav-close"
                  data-icon="&#xE907;"
                />
              </div>
            </button>
            <span className={styles.header_title}>جزئیات پرداخت</span>
          </div>
        </div>
      }
    >
      <div>
        <div className={styles.content_container}>
          <div className={styles.content}>
            <div className="d-flex flex-column gap-2">
              <div className={styles.content_header_container}>
                <div className={styles.content_header}>
                  <div className="d-flex align-items-start gap-2">
                    <div
                      className={styles.info_icon_container}
                      aria-hidden="false"
                    >
                      <div
                        className={`${styles.info_icon} cube-font-icon`}
                        data-icon-name="cube-alert-info-outline"
                        data-icon=""
                      ></div>
                    </div>
                    <span className={styles.content_header_text}>
                      مبلغ سفارش پرداخت نشده‌ و در صورت اتمام موجودی، کالاها از
                      سبد حذف می‌شوند.
                    </span>
                  </div>
                </div>
              </div>

              {/* مجموع قیمت کالاها */}
              <div className={styles.checkout_sidebar_row}>
                <div className="d-flex align-items-center">
                  <div className={styles.row_title}>
                    <div className="d-flex align-items-center gap-2">
                      <span className={styles.row_text}>
                        {" "}
                        مجموع قیمت کالاها ({toPersianDigits(
                          cart?.items_count,
                        )}{" "}
                        کالا)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center me-auto">
                  <div className="d-flex align-items-center flex-wrap justify-content-end gap-2">
                    <div className={styles.row_value_text}>
                      <span className={styles.row_value}>
                        {(cart?.rrp_price / 10).toLocaleString("fa-IR")}
                      </span>
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.price_icon}>
                          <use href="#toman"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* مجموع قیمت بیمه‌ها */}
              {hasCartInsurance ? (
                <div className={styles.checkout_sidebar_row}>
                  <div className="d-flex align-items-center">
                    <div className={styles.row_title}>
                      <div className="d-flex align-items-center gap-2">
                        <span className={styles.row_text}>
                          مجموع قیمت بیمه‌ها
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center me-auto">
                    <div className="d-flex align-items-center flex-wrap justify-content-end gap-2">
                      <div className={styles.old_price}>
                        <span className={styles.old_price_text}>
                          {(cart?.insurance?.rrp_price / 10)?.toLocaleString(
                            "fa-IR",
                          )}
                        </span>
                      </div>
                      <div className={styles.row_value_text}>
                        <span className={styles.row_value}>
                          {(cart?.insurance?.amount / 10).toLocaleString(
                            "fa-IR",
                          )}
                        </span>
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.price_icon}>
                            <use href="#toman"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* سود شما از خرید */}
              <div
                className={styles.checkout_sidebar_row}
                style={{ backgroundColor: "rgba(61, 170, 88, 0.12)" }}
              >
                <div className="d-flex align-items-center">
                  <div className={styles.row_title}>
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex" aria-hidden="false">
                        <div
                          className={`${styles.confetti_icon} cube-font-icon`}
                          data-icon-name="cube-action-confetti"
                          data-icon=""
                        ></div>
                      </div>
                      <span
                        className={styles.row_text}
                        style={{
                          color: "rgb(46, 123, 50)",
                        }}
                      >
                        سود شما از خرید
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center me-auto">
                  <div className="d-flex align-items-center flex-wrap justify-content-end gap-2">
                    <div className={styles.row_value_text}>
                      <span
                        className={styles.row_value}
                        style={{
                          fontSize: "14px",
                          lineHeight: "25.2px",
                          color: "rgb(46, 123, 50)",
                        }}
                      >
                        {`${(cart?.total_discount / 10)?.toLocaleString(
                          "fa-IR",
                        )}`}
                      </span>
                      <div className="d-flex" aria-hidden="false">
                        <svg
                          className={styles.price_icon}
                          style={{ fill: "rgb(46, 123, 50)" }}
                        >
                          <use href="#toman"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* مجموع سبد خرید */}
              <div className={styles.checkout_sidebar_row}>
                <div className="d-flex align-items-center">
                  <div className={styles.row_title}>
                    <div className="d-flex align-items-center gap-2">
                      <span
                        className={styles.row_text}
                        style={{ color: "rgb(31, 31, 31)" }}
                      >
                        مجموع سبد خرید
                      </span>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center me-auto">
                  <div className="d-flex align-items-center flex-wrap justify-content-end gap-2">
                    <div className={styles.old_price}>
                      <span className={styles.old_price_text}>
                        {(cart?.rrp_price / 10).toLocaleString("fa-IR")}
                      </span>
                    </div>
                    <div className={styles.row_value_text}>
                      <span
                        className={styles.row_value}
                        style={{
                          fontSize: "14px",
                          lineHeight: "25.2px",
                          color: "rgb(31, 31, 31)",
                        }}
                      >
                        {(cart?.payable_price / 10).toLocaleString("fa-IR")}
                      </span>
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.price_icon}>
                          <use href="#toman"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.footer_btn} onClick={handleDismiss}>
                <span className={styles.footer_btn_text}>متوجه شدم</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}

import { useRouter } from "nextjs-toploader/app";
import { useQueryClient } from "react-query";

import toPersianDigits from "@/utils/toPersianDigits";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "./paymentSidebar.module.css";

export default function PaymentSidebar({
  cart,
  itemsCount,
  activePlan,
  isPaymentPage,
}) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { showSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (!isPaymentPage) {
      router.push("/checkout/payment/");
      return;
    }

    try {
      const res = await fetch("/api/profile/orders/create", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        showSnackbar(data.message || "ثبت سفارش انجام نشد");
        return;
      }

      queryClient.invalidateQueries({
        queryKey: ["UserCart"],
      });

      router.push(`/checkout/payment/success/?order=${data.order.order_code}`);
    } catch (error) {
      console.error("CREATE ORDER ERROR:", error);

      showSnackbar("ثبت سفارش انجام نشد");
    }
  };

  return (
    <aside className={styles.content_aside}>
      <div className={styles.sticky_checkout}>
        <div className={styles.checkout_container}>
          <div className={styles.checkout_content}>
            {/* قیمت کالاها */}
            <div className={styles.checkout_price}>
              <div className="d-flex align-items-center">
                <div className={styles.checkout_price_orders_title}>
                  <span>قیمت کالاها ({toPersianDigits(itemsCount)})</span>
                </div>
              </div>
              <div className="d-flex align-items-center me-auto">
                <div className="d-flex align-items-center flex-wrap justify-content-end">
                  <div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="d-flex justify-content-start align-items-center gap-1">
                        <span className={styles.checkout_price_orders}>
                          {(cart?.rrp_price / 10).toLocaleString("fa-IR")}
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="d-flex" aria-hidden="false">
                            <svg className={styles.checkout_price_icon}>
                              <use href="#toman"></use>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* قیمت اشتراک پلاس */}
            {activePlan && (
              <div className={styles.checkout_price}>
                <div className="d-flex align-items-center">
                  <div className={styles.checkout_price_orders_title}>
                    <span>قیمت اشتراک پلاس</span>
                  </div>
                </div>
                <div className="d-flex align-items-center me-auto">
                  <div className="d-flex align-items-center flex-wrap justify-content-end">
                    <div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="d-flex justify-content-start align-items-center gap-1">
                          <span className={styles.checkout_price_orders}>
                            {(
                              cart?.temporary_plus_subscription?.payable_price /
                              10
                            ).toLocaleString("fa-IR")}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="d-flex" aria-hidden="false">
                              <svg className={styles.checkout_price_icon}>
                                <use href="#toman"></use>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart Infos */}
            <div className={styles.cart_infos_container}>
              {/* مجموع قیمت کالاها */}
              <div className={styles.cart_info_row}>
                <div className={styles.cart_info_title}>
                  <p>هزینه ارسال</p>
                </div>
                <div className={styles.cart_info_value}>
                  <p>
                    <div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="d-flex justify-content-start align-items-center gap-1">
                          {activePlan ? (
                            <span className={styles.cart_info_value_discount}>
                              ۱۹۹,۰۰۰
                            </span>
                          ) : (
                            ""
                          )}
                        </div>

                        {!activePlan ? (
                          <div className="d-flex align-items-center me-auto">
                            <div className="d-flex align-items-center flex-wrap justify-content-end">
                              <div>
                                <div className="d-flex align-items-center justify-content-start">
                                  <div className="d-flex justify-content-start align-items-center gap-1">
                                    <span
                                      className={styles.checkout_price_orders}
                                    >
                                      ۱۹۹,۰۰۰
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="d-flex" aria-hidden="false">
                              <svg
                                className={`${activePlan ? styles.checkout_price_icon_hidden : styles.checkout_price_icon}`}
                              >
                                <use href="#toman"></use>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {activePlan ? (
                      <div className="d-flex align-items-center">
                        <div
                          className={styles.plan_icon_container}
                          aria-hidden="false"
                        >
                          <div
                            className={`${styles.plan_icon} cube-font-icon`}
                            data-icon-name="cube-badge-plus"
                            data-icon=""
                          ></div>
                        </div>
                        <span className={styles.digiplus_title}>
                          رایگان پلاس
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* تخفیف کالاها */}
            {isPaymentPage ? (
              <div className="border-complete-b-200 pb-3">
                <div className="d-flex align-items-center justify-content-between pt-3 position-relative flex-wrap">
                  <div className="d-flex align-items-center">
                    <div className="d-flex" aria-hidden="false">
                      <svg className={styles.discount_icon}>
                        <use href="#discount"></use>
                      </svg>
                    </div>
                    <div className={styles.orders_discount_title}>
                      <span className={styles.orders_discount}>
                        تخفیف کالاها
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center me-auto">
                    <div className="d-flex align-items-center flex-wrap justify-content-end">
                      <div>
                        <div className="d-flex align-items-center justify-content-start">
                          <div className="d-flex justify-content-start align-items-center gap-1">
                            <span className={styles.orders_discount}>
                              ۱۶۸,۳۰۰
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex align-items-center">
                              <div className="d-flex" aria-hidden="false">
                                <svg className={styles.checkout_price_icon}>
                                  <use href="#toman"></use>
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* سود شما از خرید */}
            <div className={styles.checkout_purchase_profit}>
              <div className="d-flex align-items-center">
                <div className={styles.checkout_purchase_profit_title}>
                  <span>سود شما از خرید</span>
                </div>
              </div>

              <div className="d-flex align-items-center me-auto">
                <span className={styles.checkout_purchase_profit_discount}>
                  ( {`${(cart?.total_discount / 10)?.toLocaleString("fa-IR")}`}
                  ٪)
                </span>
                <div className="d-flex align-items-center flex-wrap justify-contnt-end">
                  <div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="flex justify-start items-center gap-1">
                        <span
                          className={styles.checkout_purchase_profit_discount}
                        >
                          {`${(cart?.total_discount / 10)?.toLocaleString(
                            "fa-IR",
                          )}`}
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="d-flex" aria-hidden="false">
                            <svg
                              className={styles.checkout_purchase_profit_icon}
                            >
                              <use href="#toman"></use>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* مبلغ قابل پرداخا */}
            <div className={styles.checkout_price}>
              <div className="d-flex align-items-center">
                <div className={styles.checkout_price_total_title}>
                  <span className={styles.checkout_price_total}>
                    مبلغ قابل پرداخت
                  </span>
                </div>
              </div>
              <div className="d-flex align-items-center me-auto">
                <div className="d-flex align-items-center flex-wrap justify-content-end">
                  <span className={styles.checkout_rrp_price_title}>
                    <div>
                      <div className="d-flex align-items-center justify-content-start">
                        <div className="flex justify-start items-center gap-1">
                          <span className={styles.checkout_rrp_price}>
                            {(cart?.rrp_price_total / 10).toLocaleString(
                              "fa-IR",
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </span>
                  <div>
                    <div className="d-flex align-items-center justify-content-start">
                      <div className="d-flex justify-content-start align-items-center gap-1">
                        <span className={styles.checkout_price_total}>
                          {(cart?.payable_price / 10).toLocaleString("fa-IR")}
                        </span>
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <div className="d-flex" aria-hidden="false">
                            <svg className={styles.checkout_price_icon}>
                              <use href="#toman"></use>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className={styles.shipping_btn_container}>
              <button
                className={styles.shipping_btn}
                data-cro-id="shipping-continue"
                onClick={handleSubmit}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  {isPaymentPage ? "پرداخت" : "ثبت سفارش"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

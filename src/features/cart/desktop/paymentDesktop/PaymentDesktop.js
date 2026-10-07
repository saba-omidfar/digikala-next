import { useState } from "react";

import { useCartContext } from "@/contexts/CartContext";
import { usePlans } from "@/hooks/usePlan";

import recalcCartPrices from "@/utils/recalcCartPrices";
import toPersianDigits from "@/utils/toPersianDigits";

import PaymentSidebar from "../../sections/paymentSidebar/PaymentSidebar";
import Orders from "../../sections/orders/Orders";

import styles from "./paymentDesktop.module.css";

export default function PaymentDesktop() {
  const { data: plans } = usePlans();
  const { userCart } = useCartContext();

  const [seeDetailsopen, setSeeDetailsOpen] = useState(false);

  const { cart } = recalcCartPrices(userCart?.cart);

  const activePlan = plans?.plans?.find(
    (plan) =>
      plan.title === userCart?.cart?.temporary_plus_subscription?.title || null,
  );

  return (
    <div className="h-100 d-flex flex-column align-items-center bg-white">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header_container}>
            <div className={styles.header}>
              <div>
                <div
                  role="img"
                  aria-hidden="false"
                  aria-label="digikala - دیجی کالا"
                  className={styles.header_logo_container}
                >
                  <img
                    className={styles.header_logo}
                    height="20"
                    alt="digikala - دیجی کالا"
                    title=""
                    src="https://www.digikala.com/statics/img/svg/digikala-header.svg"
                  />
                </div>
              </div>
              <a className={styles.cart_link} href="/checkout/shipping/">
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.back_icon}>
                    <use href="#arrowRight"></use>
                  </svg>
                </div>
                <div className={styles.header_title}>پرداخت</div>
              </a>
            </div>
          </div>

          <div className={styles.content_container}>
            <section className={styles.content_section}>
              <div className={styles.content_header}>
                <div className={styles.content_header_title_container}>
                  <div className="d-flex align-items-center flex-grow-1">
                    <p className={styles.content_header_title}>
                      <span className="position-relative">
                        انتخاب روش پرداخت
                      </span>
                    </p>
                  </div>
                </div>

                <div className={styles.payment_container}>
                  <div className="d-flex flex-column">
                    <label className={styles.payment_item_container}>
                      <label className={styles.payment_item_label}>
                        <input
                          className={styles.payment_item_input}
                          type="radio"
                          value="304"
                          name="paymentOption"
                        />
                        <span>
                          <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z"
                              fill="#1672dd"
                            ></path>
                            <path
                              d="M12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12C17 9.2 14.8 7 12 7Z"
                              fill="white"
                            ></path>
                          </svg>
                        </span>
                      </label>
                      <div className={styles.payment_item_detail_box}>
                        <div
                          className={styles.payment_icon_container}
                          aria-hidden="false"
                        >
                          <svg className={styles.payment_icon}>
                            <use href="#cardCredit"></use>
                          </svg>
                        </div>
                        <div>
                          <div>
                            <p className={styles.payment_title}>
                              پرداخت اینترنتی
                            </p>
                            <p className={styles.payment_subtitle}>
                              پرداخت آنلاین با تمامی کارت‌های بانکی
                            </p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className={styles.order_summary_container}>
                <div className={styles.order_summary_title_container}>
                  <div className="d-flex align-items-center flex-grow-1">
                    <p className={styles.order_summary_title}>
                      <span className="position-relative">خلاصه سفارش</span>
                    </p>
                  </div>
                </div>

                <div className={styles.order_summary_content}>
                  <div
                    className={
                      "d-flex align-items-center justify-content-between"
                    }
                  >
                    <div className="flex-grow-1">
                      <div className="d-flex align-items-center flex-wrap gap-3">
                        <div
                          role="img"
                          aria-hidden="false"
                          aria-label="ارسال عادی"
                          className={styles.shipping_icon_container}
                        >
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="https://dkstatics-public.digikala.com/delivery-submit-type/16060530.png?x-oss-process=image/format,webp"
                            />
                            <source
                              type="image/jpeg"
                              srcSet="https://dkstatics-public.digikala.com/delivery-submit-type/16060530.png"
                            />
                            <img
                              className={styles.shipping_icon}
                              width="24"
                              height="24"
                              alt="ارسال عادی"
                              title=""
                              src="https://dkstatics-public.digikala.com/delivery-submit-type/16060530.png"
                            />
                          </picture>
                        </div>
                        <span className={styles.order_summary_items_count}>
                          {toPersianDigits(cart?.items_count)} کالا
                        </span>
                      </div>

                      <div className={styles.shipping_price}>
                        <span>هزینه ارسال: ۱۹۹,۰۰۰</span>
                      </div>
                    </div>

                    <div
                      className={styles.order_summary_see_details_btn}
                      onClick={() => setSeeDetailsOpen((prev) => !prev)}
                    >
                      <p className={styles.order_summary_see_details}>
                        {seeDetailsopen ? "بستن" : "جزئیات مرسوله"}
                      </p>
                      <span className={styles.order_summary_expand_btn}>
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.order_summary_expand_icon}>
                            <use
                              href={`#${seeDetailsopen ? "expandLess" : "expandMore"}`}
                            ></use>
                          </svg>
                        </div>
                      </span>
                    </div>
                  </div>

                  {seeDetailsopen ? (
                    <>
                      <Orders />
                      <div className={styles.oredrs_price_container}>
                        مبلغ مرسوله :
                        <div className={styles.oredrs_price}>
                          <div className={styles.oredrs_price_value}>
                            ۲,۰۹۷,۰۹۰
                          </div>
                          <div className={styles.price_icon_container}>
                            <div className="d-flex" aria-hidden="false">
                              <svg className={styles.price_icon}>
                                <use href="#toman"></use>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* <div className={styles.get_invoice_container}>
                <div className={styles.get_invoice}>
                  <div className="d-flex">
                    <div
                      className={styles.info_icon_container}
                      aria-hidden="false"
                    >
                      <svg className={styles.info_icon}>
                        <use href="#infoOutline"></use>
                      </svg>
                    </div>
                    <span className={styles.get_invoice_title}>
                      برای دریافت فاکتور، بعد از دریافت سفارش به حساب کاربری و
                      صفحه جزئیات سفارش سر بزنید
                    </span>
                  </div>
                </div>
              </div> */}
            </section>
            <PaymentSidebar
              cart={cart}
              itemsCount={userCart?.cart?.items_count}
              activePlan={activePlan}
              isPaymentPage
            />
          </div>
        </div>
      </div>
    </div>
  );
}

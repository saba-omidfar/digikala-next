"use client";
import { useState, useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";
import Link from "next/link";

import Loading from "@/components/modules/loading/Loading";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import useScreenStatus from "@/hooks/useScreenStatus";
import toPersianDigits from "@/utils/toPersianDigits";
import recalcCartPrices from "@/utils/recalcCartPrices";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./checkoutSidebar.module.css";

function CheckoutSidebar() {
  const router = useRouter();
  const { isSmallScreen } = useScreenStatus();
  const { user, userIsLoading } = useUserContext();
  const { userCart, isLoadingAddToCart } = useCartContext();

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cart, basket } = recalcCartPrices(userCart?.cart);

  const hasCartInsurance = cart?.packages?.flatMap((item) =>
    item.cart_items?.some((cartItem) => cartItem.has_insurance),
  )[0];

  useEffect(() => {
    setLastScrollY(window.scrollY);

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll < 105) {
        setIsScrolled(false);
      } else {
        if (currentScroll > lastScrollY) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
        setLastScrollY(currentScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  if (isLoadingAddToCart) {
    return (
      <div className="cart_overlay">
        <div className="page_loading_container">
          <LoadingModal />
        </div>
      </div>
    );
  }

  return (
    <aside className="position-relative">
      <div
        className={styles.checkout_sidebar}
        style={{
          top: !isSmallScreen ? (isScrolled ? "92px" : "128px") : undefined,
        }}
      >
        {userIsLoading ? (
          <Loading isSmall={true} />
        ) : (
          <>
            {/* When User Is Not Logged In. */}
            {basket.length !== 0 ? (
              // <Link
              //   href="/users/login/"
              //   className={styles.checkout_sideBar_link}
              // >
              //   <div className={styles.content_container}>
              //     <div className="d-flex align-items-center flex-grow-1">
              //       <div className={styles.content_signIn_icon_container}>
              //         <div
              //           data-icon-name="cube-registeration-signin"
              //           data-icon="&#xE92A;"
              //           className={`${styles.content_signIn_icon} cube-font-icon`}
              //         ></div>
              //       </div>
              //       <p className={styles.content_signIn_title}>
              //         <span className="position-relative">
              //           ورود به حساب کاربری
              //         </span>
              //       </p>
              //       <div className="d-flex flex-shrink-0 me-2">
              //         <div
              //           data-icon-name="cube-value-chevron"
              //           data-icon="&#xE9C2;"
              //           className={`${styles.chevron_icon} cube-font-icon`}
              //         ></div>
              //       </div>
              //     </div>
              //     <div className={styles.content_signIn_text}>
              //       برای مشاهده محصولاتی که پیش‌تر به سبد خرید خود اضافه
              //       کرده‌اید وارد شوید.
              //     </div>
              //   </div>
              // </Link>

              <div className={styles.checkout_sidebar_container}>
                <div className={styles.checkout_sidebar}>
                  <div className={styles.checkout_sidebar_bg}>
                    <div className="d-flex flex-column gap-1">
                      <div className={styles.checkout_sidebar_header_container}>
                        <div className={styles.checkout_sidebar_header}>
                          <div className="d-flex align-items-center justify-content-between">
                            <span
                              className={styles.checkout_sidebar_header_text}
                            >
                              جزئیات پرداخت
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
                                مجموع قیمت کالاها (
                                {toPersianDigits(
                                  userCart?.cart?.items_count,
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
                                  {(
                                    cart?.insurance?.rrp_price / 10
                                  )?.toLocaleString("fa-IR")}
                                </span>
                              </div>
                              <div className={styles.row_value_text}>
                                <span className={styles.row_value}>
                                  {(
                                    cart?.insurance?.amount / 10
                                  ).toLocaleString("fa-IR")}
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
                                className={styles.row_value_bold}
                                style={{
                                  color: "rgb(46, 123, 50)",
                                }}
                              >
                                {`${(cart.total_discount / 10)?.toLocaleString(
                                  "fa-IR",
                                )}`}
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
                                {(cart?.rrp_price_total / 10).toLocaleString(
                                  "fa-IR",
                                )}
                              </span>
                            </div>
                            <div className={styles.row_value_text}>
                              <span
                                className={styles.row_value_bold}
                                style={{
                                  color: "rgb(31, 31, 31)",
                                }}
                              >
                                {(cart?.payable_price / 10).toLocaleString(
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

                      {/* دکمه ثبت سفارش */}
                      <div className={styles.shipping_btn_container}>
                        <Link
                          className={styles.shipping_btn_link}
                          data-cro-id="cart-continue-shopping"
                          href="/checkout/shipping/"
                        >
                          <span className={styles.shipping_btn_text}>
                            ثبت سفارش
                          </span>
                        </Link>
                      </div>

                      <div className={styles.pending_payment_warning}>
                        <div
                          className={styles.alert_icon_container}
                          aria-hidden="false"
                        >
                          <div
                            className={`${styles.alert_icon} cube-font-icon`}
                            data-icon-name="cube-alert-info-outline"
                            data-icon=""
                          ></div>
                        </div>
                        <span className={styles.pending_payment_warning_text}>
                          مبلغ سفارش هنوز پرداخت نشده و‌ در صورت اتمام موجودی،
                          کالاها از سبد حذف می‌شوند.
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* <span className={styles.add_to_cart_from_list_title}>
                      {toPersianDigits(nextPurchaseBasket.length)} کالا
                    </span> */}
                </div>
                {/* <button
                    className={styles.add_to_cart_from_list_btn}
                    onClick={moveAllProuctsToBasket}
                  >
                    {isLoadingAddToCart ? (
                      <Loading isSmall={true} />
                    ) : (
                      <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                        <div
                          className={
                            styles.add_to_cart_from_list_btn_icon_container
                          }
                        >
                          <div
                            data-icon-name="cube-move-to-cart"
                            data-icon="&#xE919;"
                            className={`${styles.add_to_cart_from_list_btn_icon} cube-font-icon`}
                          ></div>
                        </div>
                        <span className={styles.add_to_cart_from_list_btn_text}>
                          انتقال همه به سبد خرید
                        </span>
                      </div>
                    )}
                  </button> */}
              </div>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </aside>
  );
}

export default CheckoutSidebar;

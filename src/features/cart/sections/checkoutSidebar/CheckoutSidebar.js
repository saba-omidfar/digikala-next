"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

import Loading from "@/components/modules/loading/Loading";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";
import PlusModal from "@/features/product/modals/plusModal/PlusModal";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useGetProfile } from "@/hooks/useUser";
import { usePlans } from "@/hooks/usePlan";

import toPersianDigits from "@/utils/toPersianDigits";
import recalcCartPrices from "@/utils/recalcCartPrices";

import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./checkoutSidebar.module.css";

export default function CheckoutSidebar() {
  const { isSmallScreen } = useScreenStatus();
  const { openModal } = useModal();

  const { user, userIsLoading, guestCartId } = useUserContext();
  const { userCart, isLoadingAddToCart, removePlan, isLoadingRemovePlan } =
    useCartContext();
  const { data: plans } = usePlans();
  const { data: profile } = useGetProfile();

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { cart, basket } = recalcCartPrices(userCart?.cart);

  const hasCartInsurance = cart?.packages?.flatMap((item) =>
    item.cart_items?.some((cartItem) => cartItem.has_insurance),
  )[0];

  const activePlan = plans?.plans?.find(
    (plan) =>
      plan.title === userCart?.cart?.temporary_plus_subscription?.title || null,
  );

  const removePlanHandler = () => {
    removePlan({
      guestCartId,
    });
  };

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
          <div className={styles.checkout_sidebar_container}>
            {basket.length !== 0 ? (
              <div className={styles.checkout_sidebar}>
                <div className={styles.checkout_sidebar_bg}>
                  <div className="d-flex flex-column gap-1">
                    <div className={styles.checkout_sidebar_header_container}>
                      <div className={styles.checkout_sidebar_header}>
                        <div className="d-flex align-items-center justify-content-between">
                          <span className={styles.checkout_sidebar_header_text}>
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
                        href={
                          user?.is_logged_in
                            ? profile?.is_verified
                              ? "/checkout/shipping"
                              : "/profile/personal"
                            : "/users/login"
                        }
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
              </div>
            ) : (
              ""
            )}

            <div data-dds-theme="plus" className={styles.digiplus_container}>
              <div className={styles.digiplus}>
                <div className={styles.digiplus_content}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className={styles.digiplus_title_container}>
                      <div className="d-flex flex-shrink-0" aria-hidden="false">
                        <div
                          className={`${styles.plus_icon} cube-font-icon`}
                          data-icon-name="cube-badge-plus"
                          data-icon=""
                        ></div>
                      </div>
                      <dds-text variant="label-2" color="content/1">
                        {activePlan
                          ? `${activePlan?.title} پلاس افزوده شد!`
                          : "هر ماه ۱۰ ارسال رایگان با ‌پلاس!"}
                      </dds-text>
                    </div>
                    <div className="d-flex align-items-center justify-content-end flex-shrink-0 whitespace-nowrap">
                      {activePlan ? (
                        <button
                          className={styles.remove_plan_btn}
                          onClick={removePlanHandler}
                        >
                          {isLoadingRemovePlan && (
                            <div className={styles.loading_active}>
                              <Loading isSmall />
                            </div>
                          )}

                          <div
                            className={`${
                              isLoadingRemovePlan
                                ? styles.btn_content_loading
                                : ""
                            } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
                          >
                            <div
                              className={styles.delete_icon_container}
                              aria-hidden="false"
                            >
                              <svg className={styles.delete_icon}>
                                <use href="#delete"></use>
                              </svg>
                            </div>
                          </div>
                        </button>
                      ) : (
                        <div
                          className={styles.digiplus_btn}
                          onClick={() =>
                            openModal(<PlusModal />, {
                              name: "plus",
                              className: "modal__plus rounded-medium",
                            })
                          }
                        >
                          <dds-text variant="label-xs">افزودن</dds-text>
                          <div className="d-flex" aria-hidden="false">
                            <div
                              className={`${styles.digiplus_chevron_icon} cube-font-icon`}
                              data-icon-name="cube-nav-chevron-left"
                              data-icon=""
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  {activePlan ? (
                    <div className={styles.active_plan_text}>
                      هزینه ارسال سفارش‌های دارای شرایط پلاس رایگان می‌شود
                    </div>
                  ) : (
                    <div className={styles.plan_text}>
                      ۴ ارسال دیجی‌کالا | ۲ ارسال هایپرمارکت | ۴ ارسال سوپرمارکت
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

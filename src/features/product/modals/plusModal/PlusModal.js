import React, { useEffect, useState } from "react";

import { useModal } from "@/contexts/modalContext";
import { useCartContext } from "@/contexts/CartContext";
import { usePlans } from "@/hooks/usePlan";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./plusModal.module.css";

export default function PlusModal() {
  const { closeModal } = useModal();
  const { guestCartId } = useUserContext();
  const { data, isLoading } = usePlans();
  const { addPlan, isLoadingActivePlan } = useCartContext();

  const [selectedPlan, setSelectedPlan] = useState(null);
  const skeletonCount = Math.max(data?.plans?.length || 0, 3);

  useEffect(() => {
    if (data?.plans) {
      const selected = data?.plans?.find((p) => p.selected);
      setSelectedPlan(selected || data?.plans[0]);
    }
  }, [data]);

  const addPlanToCart = () => {
    if (!selectedPlan) return;

    addPlan(
      {
        guestCartId,
        plan: selectedPlan,
      },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div className="d-flex align-items-center">
          <div className="flex-grow-1">
            <div className={styles.modal_header_bg}>
              <div className="flex-grow-1">
                <div className={styles.logo_img_container}>
                  <img
                    src="/images/svg/digiplus/logotype/fa.svg"
                    className={styles.logo_img}
                    alt=""
                  />
                </div>
                <div className={styles.modal_title}>
                  با<span className={styles.modal_subtitle}> پلاس </span>هزینه
                  ارسالت رو رایگان کن!
                </div>
              </div>
              <div
                className="d-flex"
                aria-hidden="false"
                onClick={() => closeModal()}
              >
                <svg className={styles.modal_close_btn}>
                  <use href="#close"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.modal_content}>
        <div className={styles.modal_content_container}>
          {isLoading ? (
            <>
              {[...Array(skeletonCount)].map((_, index) => (
                <div key={index} className={styles.container__no_animation}>
                  <div className={styles.no_animation}></div>
                </div>
              ))}
            </>
          ) : (
            <>
              {data?.plans?.map((plan) => (
                <div
                  className={styles.modal_content_plan_item_container}
                  key={plan?.id}
                >
                  <div
                    className={styles.modal_content_plan_item}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    <div
                      id={plan?.cro_id}
                      className={`${styles.modal_content_plan} ${
                        selectedPlan?.id === plan?.id
                          ? styles.modal_content_plan_selected
                          : ""
                      }`}
                    >
                      {plan?.selected && (
                        <div className={styles.plan_recommended}>
                          اشتراک پیشنهادی
                        </div>
                      )}
                      <div
                        className={`${styles.modal_content_radio_container} ${
                          selectedPlan?.id === plan?.id
                            ? styles.modal_content_radio_selected
                            : styles.modal_content_radio
                        }`}
                      ></div>
                      <div className="d-flex justify-content-between align-items-center w-100">
                        <div style={{ whiteSpace: "nowrap" }}>
                          <div className="d-flex flex-column">
                            <div className="d-flex align-items-center">
                              <span
                                className={styles.modal_content_plan_item_title}
                              >
                                {plan?.title}
                              </span>
                              {/* <div className={styles.modal_badge_bg}>
                            <div className="d-flex">
                              <div
                                data-icon-name="cube-badge-new-seller"
                                data-icon="&#xEA96;"
                                className={`${styles.modal_badge_icon} cube-font-icon`}
                              ></div>
                            </div>
                            <div className={styles.modal_badge_text}>
                              ۲ ارسال بیشتر
                            </div>
                          </div> */}
                            </div>
                            {/* <span
                          className={styles.modal_content_plan_item_caption}
                        >
                          {plan?.plansubtitle}
                        </span> */}
                          </div>
                        </div>
                        <div className="d-flex position-relative">
                          <div
                            className={
                              styles.modal_content_plan_price_container
                            }
                            style={{
                              visibility:
                                plan?.discount_percent !== 0
                                  ? "visible"
                                  : "hidden",
                            }}
                          >
                            <div
                              className={
                                styles.modal_content_plan_discount_badge
                              }
                              style={{
                                backgroundColor: "#d32f2f",
                                color: "#fff",
                              }}
                            >
                              <span className="ps-1">%</span>
                              {plan?.discount_percent?.toLocaleString("fa-IR")}
                            </div>
                            <span className={styles.modal_content_plan_price}>
                              {(plan?.price / 10)?.toLocaleString("fa-IR")}
                            </span>
                          </div>
                          <div className="d-flex align-items-center">
                            <span
                              className={
                                styles.modal_content_plan_discount_price
                              }
                            >
                              {(plan?.total_payable_price / 10).toLocaleString(
                                "fa-IR",
                              )}
                            </span>
                            <div className="d-flex">
                              <div
                                className={`${styles.modal_price_toman} cube-font-icon`}
                                data-icon-name="cube-value-toman"
                                data-icon="&#xE953;"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}

          <div className={styles.modal_plan_benefits_header}>
            <div className="d-flex">
              <div
                className={`${styles.modal_brand_digiplus_logo} cube-font-icon`}
                data-icon-name="cube-brand-digiplus-logo"
                data-icon="&#xE9B4;"
              ></div>
            </div>
            <span className={styles.modal_plan_benefits_title}>
              مزایای اشتراک پلاس در هر ماه
            </span>
          </div>
          <div className={styles.modal_plan_benefits_container}>
            {isLoading ? (
              <div className={styles.loading_benefits_container}>
                {[...Array(skeletonCount)].map((_, index) => (
                  <div key={index} className="w-100 d-flex align-items-center">
                    <svg
                      aria-labelledby="0279cha-aria"
                      role="img"
                      viewBox="0 0 360 50"
                      className="m-auto w-full h-full"
                    >
                      <title id="0279cha-aria">Loading...</title>
                      <rect
                        role="presentation"
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        clipPath="url(#0279cha-diff)"
                        style={{ fill: `url("#0279cha-animated-diff")` }}
                      ></rect>
                      <defs>
                        <clipPath id="0279cha-diff">
                          <rect
                            x="300"
                            y="0"
                            rx="2"
                            ry="2"
                            width="40"
                            height="40"
                          ></rect>
                          <rect
                            x="110"
                            y="8"
                            rx="2"
                            ry="2"
                            width="180"
                            height="24"
                          ></rect>
                        </clipPath>
                        <linearGradient id="0279cha-animated-diff">
                          <stop
                            offset="0%"
                            stopColor="#f3f3f3"
                            stopOpacity="1"
                          ></stop>
                          <stop
                            offset="50%"
                            stopColor="#ecebeb"
                            stopOpacity="1"
                          ></stop>
                          <stop
                            offset="100%"
                            stopColor="#f3f3f3"
                            stopOpacity="1"
                          ></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                ))}
              </div>
            ) : (
              data?.services?.map((service, index) => (
                <div key={index + service?.title} className="w-100 d-flex">
                  <div className="d-flex ms-1">
                    <div
                      className={`${styles.modal_content_check_icon} cube-font-icon`}
                      data-icon-name="cube-content-check"
                      data-icon="&#xE90F;"
                    ></div>
                  </div>
                  <div className={styles.modal_plan_benefit_text}>
                    {service?.title}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <div className={styles.modal_footer}>
        <div className="w-100 user-select-none">
          <div className="d-flex align-items-center justify-content-between">
            <button
              className={`${isLoadingActivePlan && styles.disabled_btn} ${
                styles.modal_plan_addToCart_btn
              }`}
              id="plus-on-checkout-modal-add-to-cart"
              onClick={addPlanToCart}
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                افزودن به سبد خرید
              </div>
            </button>
            <div className="d-flex flex-column align-items-end">
              <p className={styles.modal_final_price_title}>قابل پرداخت</p>
              <div className={styles.modal_final_price_text}>
                <span className={styles.modal_final_price_tax}>
                  ۱۰% مالیات +
                </span>
                {(selectedPlan?.total_payable_price / 10).toLocaleString(
                  "fa-IR",
                )}
                <div className="d-flex me-1">
                  <div
                    className={`${styles.modal_price_toman} cube-font-icon`}
                    data-icon-name="cube-value-toman"
                    data-icon="&#xE953;"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

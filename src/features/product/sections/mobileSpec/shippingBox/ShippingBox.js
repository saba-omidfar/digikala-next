import React from "react";

import PlusModal from "@/features/product/modals/plusModal/PlusModal";
import Loading from "@/components/modules/loading/Loading";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import { usePlans } from "@/hooks/usePlan";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./shippingBox.module.css";

export default function ShippingBox() {
  const { openModal } = useModal();
  const { guestCartId } = useUserContext();
  const { productDetails } = useProductContext();
  const { data } = usePlans();
  const { userCart, removePlan, isLoadingRemovePlan } = useCartContext();

  const activePlan = data?.plans?.find(
    (plan) =>
      plan.title === userCart?.cart?.temporary_plus_subscription?.title || null,
  );

  const removePlanHandler = () => {
    removePlan({
      guestCartId,
    });
  };

  return (
    <div className={styles.shipping_container}>
      <span className={styles.shipping_title}>خدمات پرداخت و ارسال</span>
      <div className={styles.content_container}>
        <span className={styles.padding_right}></span>
        {activePlan ? (
          <div className={styles.active_plan_container}>
            <div className={styles.active_plan}>
              <div className="position-relative d-flex">
                <div
                  className={styles.active_plan_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.active_plan_icon}>
                    <use href={`#${activePlan?.icon}`} />
                  </svg>
                </div>
                <div
                  className={styles.active_plan_done_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.active_plan_done_icon}>
                    <use href="#done"></use>
                  </svg>
                </div>
              </div>
              <div className={styles.active_plan_content}>
                <div className="d-flex align-items-center flex-grow-1">
                  <p className={styles.active_plan_title}>
                    <span className="position-relative">
                      {activePlan.title} پلاس
                    </span>
                  </p>
                </div>

                <div className={styles.active_plan_price}>
                  هزینه اشتراک:{" "}
                  {(
                    (activePlan?.price + activePlan?.price * 0.1) /
                    10
                  ).toLocaleString("fa-IR")}{" "}
                  تومان
                </div>
              </div>
              <button
                className={styles.remove_plan__btn}
                id="plus-checkbox"
                onClick={removePlanHandler}
              >
                {isLoadingRemovePlan ? (
                  <div className={styles.loading_active}>
                    <Loading isSmall bgColor="rgb(166, 52, 137)" />
                  </div>
                ) : (
                  ""
                )}
                <div
                  className={`${
                    isLoadingRemovePlan ? styles.btn_content_loading : ""
                  } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
                >
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.delete_icon}>
                      <use href="#delete"></use>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.content} target="_blank">
            <div className={styles.plus_icon_bg}>
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.plus_icon} cube-font-icon`}
                  data-icon-name="cube-badge-plus"
                  data-icon=""
                ></div>
              </div>
            </div>
            <div className={styles.plus_content_container}>
              <div className={styles.plus_content}>
                <div className="w-100 d-flex justify-content-between align-items-center">
                  <div className={styles.plus_content_title}>
                    ارسال رایگان سفارش‌ها برای اعضای پلاس
                  </div>
                </div>
                <div className={styles.plus_content_subtitle}>
                  {productDetails?.digiplus?.service_list?.map(
                    (service, index) => (
                      <React.Fragment key={index}>
                        {service.title}
                        <br />
                      </React.Fragment>
                    ),
                  )}
                </div>
              </div>
              <div
                className={styles.plus_btn}
                onClick={() =>
                  openModal(<PlusModal />, {
                    name: "plus",
                    className: "modal__plus rounded-medium",
                  })
                }
              >
                خرید اشتراک ‌پلاس
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.chevron_icon}>
                    <use href="#chevronLeft"></use>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        <span className={styles.padding_right}></span>
      </div>
    </div>
  );
}

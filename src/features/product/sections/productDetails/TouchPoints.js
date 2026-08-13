import PlusModal from "@/features/product/modals/plusModal/PlusModal";
import Loading from "@/components/modules/loading/Loading";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import { usePlans } from "@/hooks/usePlan";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";

import styles from "./touchPoints.module.css";

function TouchPoints() {
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
    <div className={styles.touch_points}>
      <div className={styles.touch_points_container}>
        <div className={styles.touch_points_content}>
          <div className={styles.touch_points_header}>
            <div className={styles.touch_points_icon_container}>
              <div
                className={`${styles.touch_points_icon} cube-font-icon`}
                data-icon-name="cube-badge-plus"
                data-icon="&#xE9B4;"
              ></div>
            </div>
            <span className={styles.touch_points_text}>
              ارسال <b>رایگان</b> سفارش‌ها برای اعضای پلاس
            </span>
          </div>
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
                <div className={styles.active_plan_container}>
                  <div className="d-flex align-items-center flex-grow-1">
                    <p className={styles.active_plan_title}>
                      <span className="position-relative">پلاس</span>
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
            <div>
              {productDetails?.digiplus?.service_list?.map((service, index) => (
                <div key={`${index}-${service?.title}`}>
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <div className={styles.touch_points_item}>
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.touch_points_dot_icon}>
                            <use href="#variationColor"></use>
                          </svg>
                        </div>
                        <div
                          className={`${styles.touch_points_dot_hr} ${styles.touch_points_top_hr}`}
                          style={{ height: "calc(50% - 5px)" }}
                        ></div>
                        <div
                          className={`${styles.touch_points_dot_hr} ${styles.touch_points_bottom_hr}`}
                          style={{ height: "calc(50% - 5px)" }}
                        ></div>
                      </div>
                      <h3 className={styles.touch_points_item_text}>
                        {service?.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
              <span
                className={styles.touch_points_link}
                onClick={() =>
                  openModal(<PlusModal />, {
                    name: "plus",
                    className: "modal__plus rounded-medium",
                  })
                }
              >
                خرید اشتراک
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.touch_points_link_icon}>
                    <use href="#chevronLeft"></use>
                  </svg>
                </div>
              </span>
              <div className={styles.touch_points_freeDelivery_icon}>
                <img
                  src="/images/svg/free-delivery.svg"
                  className={styles.touch_points_freeDelivery_img}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TouchPoints;

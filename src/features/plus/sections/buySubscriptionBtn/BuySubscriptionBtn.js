import PlusModal from "@/features/product/modals/plusModal/PlusModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./buySubscriptionBtn.module.css";

export default function BuySubscriptionBtn({ isFixed }) {
  const { openModal } = useModal();

  return (
    <div
      className={
        isFixed
          ? styles.buy_subscription_fixed_btn
          : styles.buy_subscription_btn
      }
    >
      <button
        className={`${styles.purchase_plan_btn} ${isFixed ? styles.purchase_plan_fixed_btn : ""}`}
        style={{ width: isFixed ? "100%" : "" }}
        onClick={() =>
          openModal(<PlusModal />, {
            name: "plus",
            className: "modal__plus rounded-medium",
          })
        }
      >
        <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
          خرید اشتراک
          <div className={styles.chevron_icon_container} aria-hidden="false">
            <svg className={styles.chevron_icon}>
              <use href="#chevronLeft"></use>
            </svg>
          </div>
        </div>
      </button>
    </div>
  );
}

import PriceFeedbackDesktopModal from "@/features/product/modals/priceFeedbackDesktopModal/PriceFeedbackDesktopModal";

import { useModal } from "@/contexts/modalContext";

import styles from "./priceFeedbackBox.module.css";

export default function PriceFeedbackBox() {
  const { openModal } = useModal();
  return (
    <div
      className={styles.better_price_container}
      onClick={() =>
        openModal(<PriceFeedbackDesktopModal />, {
          name: "price-feedback",
          className: "modal__price-feedback rounded-medium",
        })
      }
    >
      <div className={styles.better_price} data-cro-id="pdp-another-price">
        <p className={styles.better_price_text}>قیمت بهتری سراغ دارید؟</p>
        <div className={styles.price_tag_icon_container} aria-hidden="false">
          <svg className={styles.price_tag_icon}>
            <use href="#priceTag"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}

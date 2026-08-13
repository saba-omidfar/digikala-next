import GiftModal from "@/features/product/modals/giftModal/GiftModal";

import toPersianDigits from "@/utils/toPersianDigits";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./giftBox.module.css";

export default function GiftBox() {
  const { openModal } = useModal();

  const { activeVariant } = useProductContext();

  if (!activeVariant?.gifts) return;

  return (
    <div
      className="w-100 px-3 d-flex align-items-center"
      onClick={() =>
        openModal(<GiftModal />, {
          name: "gift",
          className: "modal__gift rounded-medium",
        })
      }
    >
      <div className={styles.gift_container}>
        <div className={styles.gift_icon_container}>
          <div className="d-flex" aria-hidden="false">
            <svg className={styles.gift_icon}>
              <use href="#gift"></use>
            </svg>
          </div>
        </div>
        <div className="d-flex w-100">
          <p className={styles.gift_text}>
            {toPersianDigits(activeVariant?.gifts?.length)} هدیه
          </p>
          <div className="d-flex me-auto" aria-hidden="false">
            <svg className={styles.chevron_left_icon}>
              <use href="#chevronLeft"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

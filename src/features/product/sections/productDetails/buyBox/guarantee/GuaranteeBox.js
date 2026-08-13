import toPersianDigits from "@/utils/toPersianDigits";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./guaranteeBox.module.css";

export default function GuaranteeBox() {
  const { activeVariant } = useProductContext();

  return (
    <div className="w-100 px-3 d-flex align-items-center">
      <div className="py-3 d-flex flex-grow-1 align-items-center">
        <div className="ms-3">
          <div className="d-flex">
            <div
              className={`${styles.guarantee_icon} cube-font-icon`}
              data-icon-name="cube-value-guarantee"
              data-icon="&#xE918;"
            ></div>
          </div>
        </div>
        <div className="d-flex w-100">
          <p className={styles.guarantee_text}>
            {toPersianDigits(activeVariant?.warranty?.title_fa)}
          </p>
        </div>
      </div>
    </div>
  );
}

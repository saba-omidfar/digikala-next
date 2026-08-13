import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { useModal } from "@/contexts/modalContext";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";

import styles from "./saveToListMobileSheet.module.css";

function SaveToListMobileSheet({
  isDisabled,
  colorTitle,
  variantTitle,
  isNextCartSelected,
  isWishlistSelected,
  setIsNextCartSelected,
  setIsWishlistSelected,
  moveToList,
}) {
  const { closeMobileModal } = useModal();

  const handleDismiss = () => {
    closeMobileModal();
  };

  return (
    <BottomSheet
      open
      onDismiss={closeMobileModal}
      blocking
      expandOnContentDrag
      skipInitialTransition={false}
      defaultSnap={({ minHeight }) => minHeight}
      snapPoints={({ minHeight }) => [minHeight]}
      className={styles.sheet}
      header={
        <div className={styles.header}>
          <div className={styles.close_btn_container}>
            <button
              type="button"
              className={styles.close_btn}
              aria-label="بستن"
              onClick={handleDismiss}
            >
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.close_icon} cube-font-icon`}
                  data-icon-name="cube-nav-close"
                  data-icon=""
                ></div>
              </div>
            </button>
            <span className={styles.header_title}>ذخیره کالا در</span>
          </div>
        </div>
      }
    >
      <div>
        <div className={styles.content}>
          <div className="d-flex flex-column">
            <div className={styles.item_container}>
              <div>
                <CustomCheckBox
                  checked={isNextCartSelected}
                  changeHandler={setIsNextCartSelected}
                  titleClassName={styles.checkbox_title}
                  color="#0d4485"
                />
              </div>
              <div className={styles.item}>
                <span className={styles.item_title}>لیست سبد خرید بعدی</span>
                <div className="d-flex align-items-center">
                  <span className={styles.item_subtitle}>{variantTitle}</span>
                  <div className="d-flex" aria-hidden="false">
                    <div
                      className={`${styles.dot_icon} cube-font-icon`}
                      data-icon-name="cube-content-dot"
                      data-icon=""
                    ></div>
                  </div>
                  <span className={styles.item_subtitle}>رنگ {colorTitle}</span>
                </div>
              </div>
            </div>
            <div className={styles.divider_container}>
              <div className={styles.divider}>
                <div className={styles.divider_line}></div>
              </div>
            </div>
            <div className={styles.item_container}>
              <div>
                <CustomCheckBox
                  checked={isWishlistSelected}
                  changeHandler={setIsWishlistSelected}
                  titleClassName={styles.checkbox_title}
                  color="#0d4485"
                  customStyle={{
                    marginLeft: "0",
                  }}
                />
              </div>
              <div className={styles.item}>
                <span className={styles.item_title}>لیست علاقه‌مندی‌ها</span>
                <div className="d-flex align-items-center">
                  <span className={styles.item_subtitle}>
                    محصول در لیست علاقه مندی‌های شما ذخیره می‌شود.
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <div
                className={`${styles.footer_btn} ${isDisabled ? styles.disabled_btn : ""}`}
                onClick={() => {
                  moveToList();
                  handleDismiss();
                }}
              >
                <span className={styles.footer_btn_text}>ذخیره</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}

export default SaveToListMobileSheet;

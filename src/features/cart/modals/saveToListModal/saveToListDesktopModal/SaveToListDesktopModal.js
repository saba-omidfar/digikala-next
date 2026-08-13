import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";

import { useModal } from "@/contexts/modalContext";

import styles from "./saveToListDesktopModal.module.css";

function SaveToListDesktopModal({
  isDisabled,
  colorTitle,
  variantTitle,
  isNextCartSelected,
  isWishlistSelected,
  setIsNextCartSelected,
  setIsWishlistSelected,
  moveToList,
}) {
  const { closeModal } = useModal();
  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className="d-flex align-items-center">
          <div className={styles.header}>
            <div className={styles.close_btn_container}>
              <button
                type="button"
                className={styles.close_btn}
                aria-label="بستن"
                onClick={() => closeModal()}
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
        </div>
      </div>
      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
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
                onClick={moveToList}
              >
                <span className={styles.footer_btn_text}>ذخیره</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaveToListDesktopModal;

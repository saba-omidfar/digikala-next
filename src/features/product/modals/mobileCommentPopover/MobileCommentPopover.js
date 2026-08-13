import { useReportComment } from "@/hooks/useReportComment";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./mobileCommentPopover.module.css";

export default function MobileCommentPopover({ commentId }) {
  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const { mutate, isLoading } = useReportComment();

  const reportHandler = () => {
    mutate(
      { commentId },
      {
        onSuccess() {
          showSnackbar("گزارش این دیدگاه با موفقیت ثبت شد");
          closeModal();
        },

        onError(err) {
          showSnackbar(err?.response?.data?.message || "خطا در ثبت گزارش");
          closeModal();
        },
      },
    );
  };

  return (
    <div className={styles.layout}>
      <div>
        <div id="selector-menu-comment">
          <button
            type="button"
            className={styles.selector_menu_item}
            onClick={reportHandler}
          >
            <div className={styles.selector_menu}>
              <div className={styles.flag_icon_container} aria-hidden="false">
                <svg className={styles.flag_icon}>
                  <use href="#flag"></use>
                </svg>
              </div>
              <p className={styles.selector_menu_item_text}>گزارش این دیدگاه</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Popover } from "@mui/material";

import { useUserContext } from "@/contexts/UserContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import { useReportComment } from "@/hooks/useReportComment";
import usePopoverPosition from "@/hooks/usePopoverPosition";

import styles from "./commentPopover.module.css";

export default function CommentPopover({
  commentId,
  anchorRef,
  open,
  onClose,
}) {
  const position = usePopoverPosition(anchorRef, open, 72);

  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const { mutate, isLoading } = useReportComment();

  const reportHandler = () => {
    if (!user) {
      showSnackbar("ابتدا وارد شوید.");
      onClose();
      return;
    }

    mutate(
      { commentId },
      {
        onSuccess() {
          showSnackbar("گزارش این دیدگاه با موفقیت ثبت شد");

          onClose();
        },

        onError(err) {
          showSnackbar(err?.response?.data?.message || "خطا در ثبت گزارش");
        },
      },
    );
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={position}
      disableScrollLock
      PaperProps={{
        sx: {
          transform: "translateX(-50%)",
        },
      }}
    >
      <div className={styles.trigger_btn_container}>
        <button
          type="button"
          disabled={isLoading}
          className={styles.trigger_btn}
          onClick={reportHandler}
        >
          <div className={styles.trigger_text_container}>
            <div className={styles.icon_container}>
              <svg className={styles.icon}>
                <use href="#flag" />
              </svg>
            </div>

            <p className={styles.trigger_text}>گزارش این دیدگاه</p>
          </div>
        </button>
      </div>
    </Popover>
  );
}

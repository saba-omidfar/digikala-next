"use client";

import { Popover } from "@mui/material";

import { useUserContext } from "@/contexts/UserContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import { useRemoveComment } from "@/hooks/useProduct";
import usePopoverPosition from "@/hooks/usePopoverPosition";
import { useModal } from "@/contexts/modalContext";

import AddCommentModal from "@/features/product/modals/addCommentModal/AddCommentModal";

import styles from "./commentPopover.module.css";

export default function CommentPopover({
  productId,
  commentId,
  commentBody,
  anchorRef,
  open,
  refetch,
  onClose,
}) {
  const position = usePopoverPosition(anchorRef, open, 72);

  const { openModal } = useModal();
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const { mutate: removeComment, isLoading: isRemovingComment } =
    useRemoveComment(productId);

  const removeCommentHandler = () => {
    if (!user?.is_logged_in) {
      showSnackbar("ابتدا وارد شوید.");
      onClose();
      return;
    }

    removeComment(commentId, {
      onSuccess() {
        showSnackbar("دیدگاه با موفقیت حذف شد");
        onClose();
        refetch();
      },

      onError(err) {
        showSnackbar(err?.response?.data?.message || "خطا در حذف دیدگاه");
      },
    });
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
      <div className={styles.popover_content}>
        <ul className={styles.menu_btns_container}>
          <li
            className={styles.menu_btn}
            onClick={() => {
              onClose();

              openModal(
                <AddCommentModal
                  commentId={commentId}
                  commentBody={commentBody}
                  productId={productId}
                  refetch={refetch}
                />,
                {
                  name: "add-comment",
                  className: "modal__add_comment rounded-medium",
                },
              );
            }}
          >
            <span data-cro-id="profile-edit-comment">
              <div className={styles.menu_btn_content}>
                <div className={styles.icon_container}>
                  <svg className={styles.icon}>
                    <use href="#edit"></use>
                  </svg>
                </div>

                <p className={styles.menu_title}>ویرایش دیدگاه</p>
              </div>
            </span>
          </li>

          <li className={styles.menu_btn} onClick={removeCommentHandler}>
            <span data-cro-id="profile-edit-comment">
              <div className={styles.menu_btn_content}>
                <div className={styles.icon_container}>
                  <svg className={styles.delete_icon}>
                    <use href="#delete"></use>
                  </svg>
                </div>

                <p className={styles.menu_title}>
                  {isRemovingComment ? "در حال حذف..." : "حذف دیدگاه"}
                </p>
              </div>
            </span>
          </li>
        </ul>
      </div>
    </Popover>
  );
}

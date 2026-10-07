"use client";
import { useRouter } from "nextjs-toploader/app";

import { useRemoveWishlist } from "@/features/profile/hooks/useLists";
import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import styles from "./removeListModal.module.css";

export default function RemoveListModal({ wishlist }) {
  const router = useRouter();
  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const { removeWishlist, isRemoving } = useRemoveWishlist();

  const removeWishlistHandler = () => {
    if (!wishlist?.code) {
      showSnackbar("اطلاعات لیست پیدا نشد.");
      return;
    }

    removeWishlist(wishlist.code, {
      onSuccess: () => {
        closeModal("remove-wishlist");
        router.push("/profile/lists/?activeTab=public");
      },
      onError: (error) => {
        showSnackbar(error?.message || "خطا در حذف لیست");
      },
    });
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title}>حذف لیست</div>

          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("remove-wishlist")}
          >
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.close_icon}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content}>
          <div>
            <p className={styles.content_description}>
              حذف لیست به معنای از بین بردن آن است. در صورت حذف، دیگر برای ما و
              سایرین قابل مشاهده نیست. لیست را حذف می‌کنید؟
            </p>

            <div className={styles.content_btns_container}>
              <button
                type="button"
                className={styles.cancle_btn}
                onClick={() => closeModal("remove-wishlist")}
                disabled={isRemoving}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  بازگشت
                </div>
              </button>

              <button
                type="button"
                className={styles.remove_btn}
                onClick={removeWishlistHandler}
                disabled={isRemoving}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  {isRemoving ? "در حال حذف..." : "حذف"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useRouter } from "nextjs-toploader/app";

import { useModal } from "@/contexts/modalContext";
import { useDeleteAccount } from "@/hooks/useUser";

import Spinner from "@/utils/Spinner";

import styles from "./deleteAccountModal.module.css";

export default function DeleteAccountModal() {
  const router = useRouter();
  const { closeModal } = useModal();

  const deleteAccountMutation = useDeleteAccount();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccountMutation.mutateAsync();
      closeModal("delete-account");
      router.push("/");
    } catch (error) {
      console.error("Delete account error:", error);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title}>حذف حساب کاربری</div>

          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("delete-account")}
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
          <div className={styles.content_description_container}>
            <div
              className={`${styles.content_info_icon} cube-font-icon`}
              data-icon-name="alert-info-outline"
              data-icon=""
            />
            <p className={styles.content_description}>
              با حذف حساب، داده‌های مرتبط با فعالیت‌تان در دیجی‌کالا پاک می‌شود
              و دیگر در دسترس نخواهد بود. لطفاً قبل از ادامه مطمئن شوید که
              تصمیم‌تان نهایی است.
            </p>
          </div>
          <div className={styles.content_btns_container}>
            <button
              type="button"
              className={styles.confirm_btn}
              onClick={handleDeleteAccount}
              disabled={deleteAccountMutation.isLoading}
            >
              <div className={styles.confirm_btn__enabled} />

              <div className={styles.confirm_btn__content}>
                {deleteAccountMutation.isLoading ? (
                  <div className={styles.loading}>
                    <Spinner color="rgb(228, 1, 56)" size={16} />
                  </div>
                ) : (
                  <div className={styles.confirm_btn__text}>
                    حذف حساب کاربری
                  </div>
                )}
              </div>
            </button>

            <button
              type="button"
              className={styles.cancle_btn}
              onClick={() => closeModal("delete-account")}
            >
              <div className={styles.cancle_btn__text}>انصراف</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

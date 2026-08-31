import { useRouter } from "nextjs-toploader/app";

import AmazingNotifModal from "@/features/product/modals/amazingNotifModal/AmazingNotifModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./outOfStockBox.module.css";

function outOfStockBox() {
  const router = useRouter();
  const { openModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { redirectToLogin } = useLoginRedirect();

  const { productDetails, removeIncredibleNotification, incredibleStatus } =
    useProductContext();
  const { user } = useUserContext();

  const toggleAmazingNotifHandler = () => {
    if (!user) {
      redirectToLogin();
      return;
    }

    if (!incredibleStatus?.is_active) {
      return openModal(
        <AmazingNotifModal productId={productDetails?.id} title="موجود" />,
        {
          name: "amazing-notification",
          className: "rounded-medium",
        },
      );
    }

    removeIncredibleNotification(
      {
        productId: productDetails?.id,
      },
      {
        onSuccess: () => {
          showSnackbar("حذف اطلاع‌رسانی با موفقیت انجام شد");
        },
      },
    );
  };

  return (
    <div className={styles.out_of_stock_grid}>
      <div className={styles.out_of_stock_container}>
        <div
          className="position-relative d-flex flex-column align-items-center"
          id="buy-box"
        >
          <div className={styles.out_of_stock}>
            <p className={styles.out_of_stock_title}>
              این کالا فعلا موجود نیست اما می‌توانید زنگوله را بزنید تا به محض
              موجود شدن، به شما خبر دهیم.
            </p>
            <div className={styles.not_found_btn_container}>
              <button
                className={styles.not_found_btn}
                id="pdp-not-found-cta"
                onClick={toggleAmazingNotifHandler}
              >
                <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                  <div
                    className={styles.notification_icon_container}
                    aria-hidden="false"
                  >
                    <div
                      data-icon-name="cube-notification-activeOutline"
                      data-icon="&#xE93D;"
                      className={`${styles.notification_icon} cube-font-icon`}
                    ></div>
                  </div>
                  {incredibleStatus?.is_active
                    ? "دیگر لازم نیست خبرم کنید"
                    : "موجود شد خبرم کنید"}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default outOfStockBox;

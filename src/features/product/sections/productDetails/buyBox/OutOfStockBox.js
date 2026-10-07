"use client";

import AmazingNotifModal from "@/features/product/modals/amazingNotifModal/AmazingNotifModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useRemoveObservedProduct } from "@/features/profile/hooks/useLists";
import { useSnackbar } from "@/contexts/SnackbarContext";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./outOfStockBox.module.css";

function outOfStockBox() {
  const { openModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { redirectToLogin } = useLoginRedirect();

  const { productDetails } = useProductContext();
  const { user } = useUserContext();

  const {
    mutate: removeObservedProduct,
    isLoading: isLoadingRemoveObservedProduct,
  } = useRemoveObservedProduct();

  const isObserved = user?.observed_products?.some(
    (item) => String(item.productId) === String(productDetails?.id),
  );

  const notifeMeHandler = () => {
    if (isLoadingRemoveObservedProduct) return;

    if (!user?.is_logged_in) {
      redirectToLogin();
      return;
    }

    if (!isObserved) {
      return openModal(
        <AmazingNotifModal title="موجود" productId={productDetails?.id} />,
        {
          name: "amazing-notification",
          className: "rounded-medium",
        },
      );
    }

    removeObservedProduct(
      {
        productId: productDetails?.id,
      },
      {
        onSuccess: ({ success }) => {
          if (!success) return;

          showSnackbar("اطلاع‌رسانی برای موجود شدن غیرفعال شد.");
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
                onClick={notifeMeHandler}
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
                  {isObserved
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

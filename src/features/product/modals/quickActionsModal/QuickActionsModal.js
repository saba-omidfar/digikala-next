"use client";

import { useRouter } from "nextjs-toploader/app";

import AmazingNotifModal from "@/features/product/modals/amazingNotifModal/AmazingNotifModal";
import AddToListModal from "@/features/product/modals/addToListModal/AddToListModal";
import CustomSwitch from "@/components/modules/customSwitch/CustomSwitch";
import Loading from "@/components/modules/loading/Loading";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useProductContext } from "@/contexts/ProductContext";
import { useUserContext } from "@/contexts/UserContext";
import { useModal } from "@/contexts/modalContext";

import { useRemoveObservedProduct } from "@/features/profile/hooks/useLists";

import useLoginRedirect from "@/hooks/useLoginRedirect";

import styles from "./quickActionsModal.module.css";

export default function QuickActionsModal() {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const { redirectToLogin } = useLoginRedirect();

  const { user } = useUserContext();
  const { productDetails } = useProductContext();

  const {
    mutate: removeObservedProduct,
    isLoading: isLoadingRemoveObservedProduct,
  } = useRemoveObservedProduct();

  const isObserved = user?.observed_products?.some(
    (item) => String(item.productId) === String(productDetails?.id),
  );

  const notifeMeHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isLoadingRemoveObservedProduct) return;

    if (!user?.is_logged_in) {
      redirectToLogin();
      return;
    }

    if (!isObserved) {
      return openModal(<AmazingNotifModal productId={productDetails?.id} />, {
        name: "amazing-notification",
        className: "rounded-medium",
      });
    }

    removeObservedProduct(
      {
        productId: productDetails?.id,
      },
      {
        onSuccess: ({ success }) => {
          if (!success) return;

          showSnackbar("حذف اطلاع‌رسانی با موفقیت انجام شد");
        },
      },
    );
  };

  const addToListModalHandler = () => {
    if (!user?.is_logged_in) {
      redirectToLogin();
      return;
    }

    openModal(<AddToListModal />, {
      name: "add-to-list",
      className: "modal__add_to_list rounded-medium",
      size: "md",
    });
  };

  const goToComparePage = () => {
    closeModal("quick-actions");
    router.push(`/compare/dkp-${productDetails?.id}`);
  };

  return (
    <div className="flex-grow-1">
      <div className={styles.modal_layout}>
        <div className={styles.modal_header}>
          <div
            className="d-flex align-items-center"
            style={{ borderBottom: "1px solid #e0e0e2", padding: "16px 0" }}
          >
            <div className="flex-grow-1"></div>
            <div
              className="d-flex"
              aria-hidden="false"
              onClick={() => closeModal()}
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
          <div className={styles.modal_content}>
            <div
              id="compare"
              className={styles.modal_content_item}
              onClick={goToComparePage}
            >
              <div className={styles.list_icon_container} aria-hidden="false">
                <svg className={styles.list_icon}>
                  <use href="#compare"></use>
                </svg>
              </div>

              <span className={styles.modal_content_item_title}>
                مقایسه کالا
              </span>
            </div>
            <div
              id="wishlist"
              className={styles.modal_content_item}
              onClick={addToListModalHandler}
            >
              <div className={styles.list_icon_container} aria-hidden="false">
                <svg className={styles.list_icon}>
                  <use href="#list"></use>
                </svg>
              </div>

              <span className={styles.modal_content_item_title}>
                افزودن به لیست{" "}
              </span>
            </div>
            <div
              id="amazing-notification"
              className={styles.modal_content_item}
              onClick={notifeMeHandler}
            >
              <div className={styles.list_icon_container} aria-hidden="false">
                <svg
                  className={`${styles.notification_icon}
                    ${
                      isObserved
                        ? styles.notification_active
                        : styles.notification_inactive
                    }
                  `}
                >
                  <use href="#notificationActiveOutline"></use>
                </svg>
              </div>

              <span className={styles.modal_content_item_title}>
                اطلاع‌رسانی شگفت‌انگیز
              </span>
              <label
                htmlFor="notifSwitch"
                className={styles.filter_modal_switch}
              >
                <CustomSwitch
                  name="notifSwitch"
                  checked={
                    isLoadingRemoveObservedProduct ? (
                      <Loading isSmall={true} />
                    ) : (
                      isObserved
                    )
                  }
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

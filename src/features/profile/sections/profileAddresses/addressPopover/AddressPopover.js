"use client";

import { Popover } from "@mui/material";

import { useUserContext } from "@/contexts/UserContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import { useRemoveAddress } from "@/features/profile/hooks/useAddress";
import { useModal } from "@/contexts/modalContext";
import usePopoverPosition from "@/hooks/usePopoverPosition";

import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";
import RemoveAddressModal from "@/features/profile/modals/removeAddressModal/RemoveAddressModal";

import styles from "./addressPopover.module.css";

export default function AddressPopover({
  address,
  anchorRef,
  open,
  onClose,
  manualAddress,
  setManualAddress,
}) {
  const position = usePopoverPosition(anchorRef, open, 72);

  const { openModal, closeModal } = useModal();
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const { mutate: removeAddress, isLoading: isRemovingAddress } =
    useRemoveAddress();

  const removeAddressHandler = () => {
    if (!user?.is_logged_in) {
      showSnackbar("ابتدا وارد شوید.");
      onClose();
      return;
    }

    removeAddress(address, {
      onSuccess() {
        closeModal("remove-address");
        showSnackbar("آدرس با موفقیت حذف شد");
        onClose();
      },

      onError(err) {
        showSnackbar(err?.response?.data?.message || "خطا در حذف آدرس");
      },
    });
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      className={styles.popover}
      anchorReference="anchorPosition"
      anchorPosition={position}
      disableScrollLock
      PaperProps={{
        sx: {
          transform: "translateX(-50%)",
        },
      }}
    >
      <div className={styles.menu_btns_container}>
        <button
          className={styles.menu_btn}
          onClick={() => {
            onClose();

            openModal(
              <SelectLocationModal
                manualAddress={manualAddress}
                setManualAddress={setManualAddress}
                address={address}
                isProfilePage
              />,
              {
                name: "select-location",
                className: "modal__select_location rounded-large",
              },
            );
          }}
        >
          <div className={styles.icon_container} aria-hidden="false">
            <svg className={styles.icon}>
              <use href="#edit"></use>
            </svg>
          </div>
          <span className={styles.menu_title}>ویرایش</span>
        </button>

        <button
          className={styles.menu_btn}
          onClick={() => {
            onClose();
            openModal(<RemoveAddressModal onRemove={removeAddressHandler} />, {
              name: "remove-address",
              className: "modal__remove_address rounded-medium",
            });
          }}
        >
          <div className={styles.icon_container} aria-hidden="false">
            <svg className={styles.delete_icon}>
              <use href="#delete"></use>
            </svg>
          </div>
          <span className={styles.menu_title}>حذف</span>
        </button>
      </div>
    </Popover>
  );
}

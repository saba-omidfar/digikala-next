import { useUserContext } from "@/contexts/UserContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import { useRemoveAddress } from "@/features/profile/hooks/useAddress";
import { useModal } from "@/contexts/modalContext";

import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";
import RemoveAddressModal from "@/features/profile/modals/removeAddressModal/RemoveAddressModal";

import styles from "./addressSettingModal.module.css";

export default function AddressSettingModal({
  address,
  manualAddress,
  setManualAddress,
}) {
  const { openModal, closeModal } = useModal();
  const { user } = useUserContext();
  const { showSnackbar } = useSnackbar();

  const { mutate: removeAddress, isLoading: isRemovingAddress } =
    useRemoveAddress();

  const removeAddressHandler = () => {
    if (!user?.is_logged_in) {
      showSnackbar("ابتدا وارد شوید.");
      closeModal("address-setting");
      return;
    }

    removeAddress(address, {
      onSuccess() {
        closeModal("remove-address");
        showSnackbar("آدرس با موفقیت حذف شد");
        closeModal("address-setting");
      },

      onError(err) {
        showSnackbar(err?.response?.data?.message || "خطا در حذف آدرس");
      },
    });
  };

  return (
    <div>
      <div>
        <span className={styles.modal_title}>تنظیمات آدرس</span>
        <button
          type="button"
          className={styles.modal_btn}
          onClick={() => {
            closeModal("address-setting");

            openModal(
              <SelectLocationModal
                title="ویرایش آدرس"
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
            <svg className={styles.edit_icon}>
              <use href="#edit"></use>
            </svg>
          </div>
          <span className={styles.modal_btn_text}>ویرایش</span>
        </button>
        <button
          type="button"
          className={styles.modal_btn}
          onClick={() => {
            openModal(<RemoveAddressModal onRemove={removeAddressHandler} />, {
              name: "remove-address",
              className: "modal__remove_address rounded-medium",
            });
          }}
        >
          <div className={styles.icon_container} aria-hidden="false">
            <svg className={styles.remove_icon}>
              <use href="#delete"></use>
            </svg>
          </div>
          <span className={styles.modal_btn_text}>حذف</span>
        </button>
      </div>
    </div>
  );
}

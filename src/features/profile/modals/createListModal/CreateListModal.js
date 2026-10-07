import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import Loading from "@/components/modules/loading/Loading";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useModal } from "@/contexts/modalContext";

import {
  useCreateWishlist,
  useUpdateWishlist,
} from "@/features/profile/hooks/useLists";

import RemoveListModal from "../removeListModal/RemoveListModal";

import styles from "./createListModal.module.css";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان لیست الزامی است")
    .max(50, "حداکثر ۵۰ کاراکتر مجاز است"),
  description: yup.string().max(200, "حداکثر ۲۰۰ کاراکتر مجاز است").nullable(),
  color_or_size: yup.string().nullable(),
});

export default function CreateListModal({ isEdit = false, wishlist = null }) {
  const { openModal, closeModal } = useModal();

  const { showSnackbar } = useSnackbar();
  const { updateWishlist, isUpdating } = useUpdateWishlist();
  const { createWishlist } = useCreateWishlist();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: wishlist?.title || "",
      description: wishlist?.description || "",
      color_or_size: wishlist?.color_or_size || "",
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    if (data.title.trim().length < 4) {
      showSnackbar("عنوان لیست لازم است حداقل ۴ کاراکتر باشد.");
      return;
    }

    const payload = {
      title: data.title,
      description: data.description,
      color_or_size: data.color_or_size,
    };

    if (isEdit) {
      updateWishlist(
        {
          wishlistCode: wishlist.code,
          ...payload,
        },
        {
          onSuccess: () => {
            closeModal("create-list");
            showSnackbar("لیست با موفقیت ویرایش شد.");
          },
          onError: (error) => {
            showSnackbar(error?.message || "خطا در ویرایش لیست");
          },
        },
      );

      return;
    }

    createWishlist(payload, {
      onSuccess: () => {
        closeModal("create-list");
        showSnackbar("لیست با موفقیت ساخته شد.");
      },
      onError: (error) => {
        showSnackbar(error?.message || "خطا در ساخت لیست");
      },
    });
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header} style={{ height: "58px" }}>
        <div
          className="d-flex align-items-center h-100"
          style={{ borderBottom: "1px solid #e0e0e2" }}
        >
          <div className={styles.modal_header_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_header_title}>
                <span className="position-relative">
                  {isEdit ? "ویرایش لیست" : "ساختن لیست"}
                </span>
              </p>
            </div>
          </div>

          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("create-list")}
          >
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.header_icon}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.modal_content_container}>
          <div className={styles.modal_content}>
            <form>
              <label className="w-100 d-inline-block">
                <p className={styles.list_title}>
                  عنوان لیست<span>*</span>
                </p>

                <div className={styles.list_input_container}>
                  <input
                    className={styles.list_input}
                    type="text"
                    {...register("title", {
                      required: "اینجا را خالی نگذارید",
                    })}
                  />
                </div>

                {errors.title ? (
                  <p className={styles.field_error_text}>
                    {errors.title.message}
                  </p>
                ) : (
                  ""
                )}
              </label>

              <label
                className="w-100 d-inline-block"
                style={{ marginTop: "16px" }}
              >
                <p className={styles.list_title}>توضیحات</p>

                <div className={styles.list_input_description_container}>
                  <textarea
                    className={styles.list_textarea}
                    rows="4"
                    {...register("description")}
                  />
                </div>
              </label>
            </form>

            <div
              className="d-flex align-items-center justify-content-between"
              style={{ marginTop: "16px" }}
            >
              {isEdit ? (
                <button
                  className={styles.remove_list_btn}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    openModal(<RemoveListModal wishlist={wishlist} />, {
                      name: "remove-list",
                      className: "modal__remove_list rounded-medium",
                    });
                  }}
                >
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    <div
                      className={styles.trash_icon_container}
                      aria-hidden="false"
                    >
                      <svg className={styles.trash_icon}>
                        <use href="#trash"></use>
                      </svg>
                    </div>
                    <p className={styles.remove_list_btn_text}>حذف لیست</p>
                  </div>
                </button>
              ) : (
                ""
              )}
              <div className={styles.list_btns_container}>
                <button
                  type="button"
                  className={styles.list_btn}
                  onClick={() => closeModal("create-list")}
                >
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    انصراف
                  </div>
                </button>

                <button
                  type="button"
                  className={`${styles.list_btn} ${styles.list_confirm_btn}`}
                  onClick={handleSubmit(onSubmit)}
                >
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    {isSubmitting || isUpdating ? (
                      <Loading isSmall={true} bgColor="rgb(255,255,255)" />
                    ) : (
                      "تایید"
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

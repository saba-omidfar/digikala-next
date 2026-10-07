"use client";

import { useEffect, useState } from "react";
import { useRouter } from "nextjs-toploader/app";
import Image from "next/image";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import IdeaBox from "./IdeaBox";
import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import Loading from "@/components/modules/loading/Loading";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import {
  useCreateWishlist,
  useAddProductToWishlist,
  useRemoveWishlistProduct,
  useGetUserWishlists,
} from "@/features/profile/hooks/useLists";

import styles from "./addToListModal.module.css";
import { useUserContext } from "@/contexts/UserContext";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان لیست الزامی است")
    .max(50, "حداکثر ۵۰ کاراکتر مجاز است"),
  description: yup.string().max(200, "حداکثر ۲۰۰ کاراکتر مجاز است").nullable(),
  color_or_size: yup.string().nullable(),
});

export default function AddToListModal() {
  const router = useRouter();
  const { closeModal } = useModal();

  const [step, setStep] = useState(1);
  const [creatingNewList, setCreatingNewList] = useState(false);
  const [checkedLists, setCheckedLists] = useState();
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const { showSnackbar } = useSnackbar();
  const { productDetails } = useProductContext();
  const { user } = useUserContext();

  const { createWishlist, isCreating } = useCreateWishlist();
  const { addProductToWishlist, isAdding } = useAddProductToWishlist();
  const { userLists, userListsIsLoading } = useGetUserWishlists();
  const { removeWishlistProduct, isRemoving } = useRemoveWishlistProduct();

  useEffect(() => {
    if (userLists?.length) {
      const initial = {};

      userLists.forEach((list) => {
        const hasProduct = list.item_product?.some(
          (item) => Number(item?.productId) === Number(productDetails?.id),
        );

        initial[list._id] = {
          id: list._id,
          title: list.title,
          code: list.code,
          checked: hasProduct,
          initiallyChecked: hasProduct,
        };
      });

      setCheckedLists(initial);
      setStep(2);
    } else {
      setStep(1);
    }
  }, [userLists, userListsIsLoading, productDetails?.id]);

  const toggleList = (id) => {
    setCheckedLists((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        checked: !prev[id]?.checked,
      },
    }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      color_or_size: "",
    },
    mode: "onBlur",
  });

  const handleConfirm = async () => {
    if (!productDetails?.id) {
      showSnackbar("اطلاعات کالا پیدا نشد.");
      return;
    }

    const lists = Object.values(checkedLists);

    const listsToAdd = lists.filter(
      (list) => list.checked && !list.initiallyChecked,
    );

    const listsToRemove = lists.filter(
      (list) => !list.checked && list.initiallyChecked,
    );

    const imageUrl = productDetails?.images?.main?.url?.[0];

    try {
      setIsAddingProduct(true);

      await Promise.all([
        ...listsToAdd.map((list) =>
          addProductToWishlist({
            wishlistId: list.id,
            productId: productDetails.id,
            imageUrl,
          }),
        ),

        ...listsToRemove.map((list) =>
          removeWishlistProduct({
            wishlistId: list.id,
            productId: productDetails.id,
          }),
        ),
      ]);

      console.log("listsToAdd=>", listsToAdd);

      if (listsToAdd.length > 0) {
        if (listsToAdd.length > 1) {
          showSnackbar("کالا در لیست‌های انتخاب شده ذخیره شد.", 5000);
        } else {
          const title = listsToAdd[0]?.title;
          const code = listsToAdd[0]?.code;

          showSnackbar(`کالا در لیست "${title}" ذخیره شد.`, 5000, {
            text: "مشاهده لیست",
            onClick: () => router.push(`/profile/lists/${code}`),
          });
        }
      }

      closeModal("add-to-list");
    } catch (error) {
      console.error("UPDATE WISHLIST PRODUCT ERROR:", error);

      showSnackbar(error?.message || "خطا در بروزرسانی لیست‌های محصول");
    } finally {
      setIsAddingProduct(false);
    }
  };

  const onSubmit = (data) => {
    if (data.title.trim().length < 4) {
      showSnackbar("عنوان لیست لازم است حداقل ۴ کاراکتر باشد.");
      return;
    }

    createWishlist(
      {
        title: data.title.trim(),
        description: data.description?.trim() || null,
        color_or_size: data.color_or_size || null,
      },
      {
        onSuccess: (response) => {
          const newList = response?.data;

          if (!newList?._id) {
            showSnackbar("لیست ساخته شد اما اطلاعات آن دریافت نشد.");
            return;
          }

          setCheckedLists((prev) => ({
            ...prev,
            [newList._id]: {
              title: newList.title,
              code: newList.code,
              checked: false,
            },
          }));

          setCreatingNewList(false);
          setStep(2);
        },

        onError: (error) => {
          console.error("CREATE LIST ERROR:", error);

          showSnackbar(error?.message || "خطا در ساخت لیست");
        },
      },
    );
  };

  const renderContent = () => {
    if (userListsIsLoading) {
      return (
        <div className={styles.loading_container}>
          <Loading isSmall={true} />
        </div>
      );
    }

    if (step === 1) {
      return (
        <div style={{ padding: "0 20px" }}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div
              style={{
                width: "160px",
                height: "120px",
                lineHeight: "0px",
              }}
            >
              <Image
                className="w-100 d-inline-block"
                src="/images/svg/wish-list.svg"
                width={160}
                height={120}
                alt="لیست عمومی"
                style={{ objectFit: "contain" }}
              />
            </div>

            <p className={styles.wishlist_title}>هنوز لیست نساخته‌اید</p>

            <p className={styles.wishlist_subtitle}>
              می‌توانید از پیشنهادهای زیر استفاده کنید یا لیست جدید بسازید
            </p>
          </div>

          <div className={styles.wishlists_container}>
            <IdeaBox
              imgSrc="/images/svg/wish-list-wedding.svg"
              title="پیشنهاد به دوستان"
            />

            <IdeaBox
              imgSrc="/images/svg/wish-list-birthday.svg"
              title="هدیه‌ها"
            />

            <IdeaBox
              imgSrc="/images/svg/wish-list-home.svg"
              title="خرید ماهانه منزل"
            />

            <IdeaBox imgSrc="/images/svg/wish-list-birth.svg" title="آرزوها" />
          </div>

          <div
            className={styles.addtolist_btn_container}
            onClick={() => setStep(2)}
          >
            <button
              className={styles.addtolist_btn}
              id="add-new-list"
              type="button"
            >
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                افزودن به لیست جدید
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (step === 2) {
      if (creatingNewList || !user?.is_logged_inLists?.length) {
        return (
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="w-100 d-inline-block">
                <p className={styles.list_title}>
                  عنوان لیست<span>*</span>
                </p>

                <div
                  className={styles.list_input_container}
                  style={{ height: "48px" }}
                >
                  <input
                    className={styles.list_input}
                    type="text"
                    {...register("title")}
                  />
                </div>

                {errors.title && (
                  <p className={styles.error}>{errors.title.message}</p>
                )}
              </label>

              <label
                className="w-100 d-inline-block"
                style={{ marginTop: "16px" }}
              >
                <p className={styles.list_title}>توضیحات</p>

                <div className={styles.list_input_container}>
                  <textarea
                    className={styles.list_textarea}
                    rows="4"
                    {...register("description")}
                  />
                </div>

                {errors.description && (
                  <p className={styles.error}>{errors.description.message}</p>
                )}
              </label>
            </form>

            <div
              className="d-flex align-items-center justify-content-between"
              style={{ marginTop: "16px" }}
            >
              <div className={styles.list_btns_container}>
                <button
                  type="button"
                  className={styles.list_btn}
                  onClick={() => closeModal("add-to-list")}
                >
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    انصراف
                  </div>
                </button>

                <button
                  type="button"
                  className={`${styles.list_btn} ${styles.list_confirm_btn}`}
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting || isCreating}
                >
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    {isSubmitting || isCreating ? (
                      <Loading isSmall={true} bgColor="rgb(255,255,255)" />
                    ) : (
                      "تایید"
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
        );
      }

      return (
        <>
          <p className={styles.list_created_title}>
            کالا را به کدام لیست اضافه می‌کنید؟
          </p>

          <div
            className={styles.new_list_container}
            onClick={() => setCreatingNewList(true)}
          >
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.add_icon}>
                <use href="#addSimple"></use>
              </svg>
            </div>

            <p className={styles.new_list_title}>لیست جدید</p>
          </div>

          <form>
            {Object.values(checkedLists)
              ?.reverse()
              ?.map((list) => (
                <div key={list.id} className={styles.other_list_container}>
                  <CustomCheckBox
                    id={list.id}
                    checked={checkedLists[list.id]?.checked || false}
                    label={list?.title}
                    titleClassName={styles.prev_list_title}
                    isList
                    changeHandler={() => toggleList(list.id)}
                    customStyle={{
                      border: "none",
                      padding: "0",
                      marginLeft: "0",
                      gap: "20px",
                    }}
                    color="#0d4485"
                  />
                </div>
              ))}
          </form>
        </>
      );
    }
  };

  return (
    <div
      className={styles.modal_layout}
      style={{
        paddingBottom: userLists?.length ? "72px" : "0px",
      }}
    >
      <div className={styles.modal_header} style={{ height: "58px" }}>
        <div
          className="d-flex align-items-center h-100"
          style={{
            borderBottom: "1px solid #e0e0e2",
          }}
        >
          <div className={styles.modal_header_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_header_title}>
                <span className="position-relative">افزودن به لیست</span>
              </p>
            </div>
          </div>

          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("add-to-list")}
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
        <div className={styles.modal_content}>{renderContent()}</div>
      </div>

      {!creatingNewList && userLists?.length > 0 && (
        <div className={styles.modal_footer}>
          <div className={styles.list_btns_container}>
            <button
              type="button"
              className={styles.list_btn}
              onClick={() => closeModal("add-to-list")}
            >
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                انصراف
              </div>
            </button>

            <button
              type="button"
              className={`${styles.list_btn} ${styles.list_confirm_btn}`}
              onClick={handleConfirm}
              disabled={isAddingProduct}
            >
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                {isAddingProduct ? (
                  <Loading isSmall={true} bgColor="rgb(255,255,255)" />
                ) : (
                  "تایید"
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

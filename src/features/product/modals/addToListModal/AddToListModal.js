import { useEffect, useState } from "react";
import Image from "next/image";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import IdeaBox from "./IdeaBox";
import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import Loading from "@/components/modules/loading/Loading";

import { useSnackbar } from "@/contexts/SnackbarContext";
import { useModal } from "@/contexts/modalContext";
import { useUserContext } from "@/contexts/UserContext";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./addToListModal.module.css";

const schema = yup.object().shape({
  title: yup
    .string()
    .required("عنوان لیست الزامی است")
    .max(50, "حداکثر ۵۰ کاراکتر مجاز است"),
  description: yup.string().max(200, "حداکثر ۲۰۰ کاراکتر مجاز است").nullable(),
  color_or_size: yup.string().nullable(),
});

export default function AddToListModal() {
  const { closeModal } = useModal();
  const [step, setStep] = useState(1);
  const [creatingNewList, setCreatingNewList] = useState(false);
  const [checkedLists, setCheckedLists] = useState({});

  const { showSnackbar } = useSnackbar();
  const { productDetails } = useProductContext();
  const {
    createWishlist,
    addProductToWishlist,
    userLists,
    userListsIsLoading,
  } = useUserContext();

  useEffect(() => {
    if (userLists?.length) {
      const initial = {};
      userLists.forEach((list) => {
        initial[list._id] = { title: list.title, checked: true };
      });
      setCheckedLists(initial);
      setStep(2);
    }
  }, [userLists]);

  const toggleList = (id) => {
    setCheckedLists((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        checked: !prev[id].checked,
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

  const handleConfirm = () => {
    const selectedLists = Object.keys(checkedLists).filter(
      (listId) => checkedLists[listId].checked,
    );

    if (!selectedLists.length) {
      showSnackbar("لطفاً حداقل یک لیست را انتخاب کنید.");
      return;
    }

    // اضافه کردن همه محصولات به لیست‌ها
    Promise.all(
      selectedLists.map((listId) =>
        addProductToWishlist({
          wishlistId: listId,
          productId: productDetails?.id,
        }),
      ),
    )
      .then(() => {
        // بعد از اضافه شدن همه، فقط یک توست نمایش می‌دیم
        if (selectedLists.length > 1) {
          showSnackbar(`کالا در لیست‌های انتخاب شده ذخیره شد.`);
        } else {
          const title = checkedLists[selectedLists[0]].title;
          showSnackbar(`کالا در لیست "${title}" ذخیره شد.`);
        }
        closeModal();
      })
      .catch((error) => {
        showSnackbar(error.message);
      });
  };

  const onSubmit = (data) => {
    if (data.title.trim().length < 4) {
      showSnackbar("عنوان لیست لازم است حداقل ۴ کاراکتر باشد.");
      return;
    }

    createWishlist(
      {
        title: data.title,
        description: data.description,
      },
      {
        onSuccess: () => {
          setCreatingNewList(false);
        },
        onError: () => {
          showSnackbar("خطا در شبکه");
        },
      },
    );
  };

  const renderContent = () => {
    if (userListsIsLoading) return <Loading isSmall={true} />;

    if (step === 1) {
      return (
        <div style={{ padding: "0 20px" }}>
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div style={{ width: "160px", height: "120px", lineHeight: "0px" }}>
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
            <button className={styles.addtolist_btn} id="add-new-list">
              <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                افزودن به لیست جدید
              </div>
            </button>
          </div>
        </div>
      );
    }

    if (step === 2) {
      if (creatingNewList || !userLists?.length) {
        return (
          <div>
            <form>
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
                  ></textarea>
                </div>
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
                  onClick={() => closeModal()}
                >
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    انصراف
                  </div>
                </button>
                <button
                  type="submit"
                  className={`${styles.list_btn} ${styles.list_confirm_btn}`}
                  onClick={handleSubmit(onSubmit)}
                >
                  <div className="d-flex align-items-center justify-content-center flex-grow-1">
                    {isSubmitting ? <Loading isSmall={true} /> : "تایید"}
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
            {userLists?.map((list) => (
              <div key={list._id} className={styles.other_list_container}>
                <CustomCheckBox
                  id={list._id}
                  checked={checkedLists[list._id]?.checked || false}
                  label={list?.title}
                  titleClassName={styles.prev_list_title}
                  isList
                  changeHandler={() => toggleList(list._id)}
                  customStyle={{
                    border: "none",
                    padding: "0",
                    marginLeft: "0",
                    gap: "20px",
                  }}
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
      style={{ paddingBottom: userLists?.length ? "72px" : "0px" }}
    >
      <div className={styles.modal_header} style={{ height: "58px" }}>
        <div
          className="d-flex align-items-center h-100"
          style={{ borderBottom: "1px solid #e0e0e2" }}
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
            onClick={() => closeModal()}
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
              onClick={() => closeModal()}
            >
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                انصراف
              </div>
            </button>
            <button
              type="submit"
              className={`${styles.list_btn} ${styles.list_confirm_btn}`}
              onClick={handleConfirm}
            >
              <div className="d-flex align-items-center justify-content-center flex-grow-1">
                {isSubmitting ? <Loading isSmall={true} /> : "تایید"}
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

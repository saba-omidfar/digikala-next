"use client";

import { useState, useEffect, useRef, useMemo } from "react";

import { BottomSheet } from "@percivel/react-spring-bottom-sheet";
import "@percivel/react-spring-bottom-sheet/dist/style.css";

import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";

import { useProductContext } from "@/contexts/ProductContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useReportPrice } from "@/hooks/useReportPrice";
import { useModal } from "@/contexts/modalContext";
import formatPrice from "@/utils/formatPrice";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import Loading from "@/components/modules/loading/Loading";

import styles from "./priceFeedbackMobileSheet.module.css";

function PriceFeedbackMobileSheet() {
  const dropdownRef = useRef(null);
  const { productDetails } = useProductContext();
  const { closeMobileModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const [showStates, setShowStates] = useState(false);
  const [stateSearch, setStateSearch] = useState("");

  const STATES = [
    { id: 1, name: "آذربایجان شرقی" },
    { id: 2, name: "آذربایجان غربی" },
    { id: 3, name: "اردبیل" },
    { id: 4, name: "اصفهان" },
    { id: 5, name: "البرز" },
    { id: 6, name: "ایلام" },
    { id: 7, name: "بوشهر" },
    { id: 8, name: "تهران" },
    { id: 9, name: "چهارمحال و بختیاری" },
    { id: 10, name: "خراسان جنوبی" },
    { id: 11, name: "خراسان رضوی" },
    { id: 12, name: "خراسان شمالی" },
    { id: 13, name: "خوزستان" },
    { id: 14, name: "زنجان" },
    { id: 15, name: "سمنان" },
    { id: 16, name: "سیستان و بلوچستان" },
    { id: 17, name: "فارس" },
    { id: 18, name: "قزوین" },
    { id: 19, name: "قم" },
    { id: 20, name: "کردستان" },
    { id: 21, name: "کرمان" },
    { id: 22, name: "کرمانشاه" },
    { id: 23, name: "کهگیلویه و بویراحمد" },
    { id: 24, name: "گلستان" },
    { id: 25, name: "گیلان" },
    { id: 26, name: "لرستان" },
    { id: 27, name: "مازندران" },
    { id: 28, name: "مرکزی" },
    { id: 29, name: "هرمزگان" },
    { id: 30, name: "همدان" },
    { id: 31, name: "یزد" },
  ];

  const { mutate: reportPriceMutation, isLoading } = useReportPrice();

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      competitorPrice: "",
      isOnlineStore: true,
      onlineStoreUrl: "",
      physicalStoreName: "",
      physicalStoreStateId: "",
    },
  });

  const isOnlineStore = watch("isOnlineStore");
  const selectedState = watch("physicalStoreStateId");

  const filteredStates = useMemo(() => {
    if (!stateSearch.trim()) return STATES;

    return STATES.filter((state) => state.name.includes(stateSearch.trim()));
  }, [stateSearch]);

  const handleSelectState = (state) => {
    setValue("physicalStoreStateId", state.name, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setStateSearch(state.name);
    setShowStates(false);
  };

  const values = watch();

  const disabled = useMemo(() => {
    const { competitorPrice, isOnlineStore } = values;

    const hasPrice = !!competitorPrice?.trim();

    return !hasPrice || isOnlineStore || isLoading;
  }, [values, isLoading]);

  const handleDismiss = () => closeMobileModal();

  const showError = (field) => {
    return (isSubmitted || touchedFields[field]) && errors[field];
  };

  const formSubmitting = (data) => {
    reportPriceMutation(
      {
        productId: productDetails?.id,
        ...data,
      },
      {
        onSuccess: (res) => {
          console.log("res", res);

          if (res?.message === "نظر شما قبلا در سیستم ثبت شده است") {
            showSnackbar(res.message);

            handleDismiss();
            return;
          }

          showSnackbar(
            "از شما ممنونیم. تیم قیمت‌گذاری ما بازخورد شما را با دقت بررسی خواهد کرد. در صورت تایید بازخوردتان، نتیجه را به شما اعلام می‌کنیم.",
          );

          handleDismiss();
        },

        onError: () => {
          showSnackbar("خطایی رخ داده است.");
        },
      },
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowStates(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowStates]);

  return (
    <BottomSheet
      open
      onDismiss={handleDismiss}
      blocking
      expandOnContentDrag
      skipInitialTransition={false}
      snapPoints={({ maxHeight }) => [maxHeight]}
      defaultSnap={({ maxHeight }) => maxHeight * 0.92}
      className={styles.sheet}
      header={
        <div className={styles.header}>
          <div className="d-flex flex-column justify-content-center align-items-start">
            <p className={styles.header_title}>گزارش قیمت مناسب‌تر</p>

            <p className={styles.product_title}>{productDetails?.title_fa}</p>
          </div>

          <div className="d-flex" aria-hidden="false" onClick={handleDismiss}>
            <div
              className={`${styles.close_icon} cube-font-icon`}
              data-icon-name="cube-nav-close"
              data-icon="&#xE907;"
            />
          </div>
        </div>
      }
      footer={
        <button
          form="price-feedback-form"
          type="submit"
          disabled={disabled}
          data-cro-id="pdp-submit-another-price"
          className={`${styles.footer_btn} ${
            !disabled ? styles.footer_btn_active : ""
          }`}
        >
          {isLoading && (
            <div className={styles.loading_active}>
              <Loading isSmall />
            </div>
          )}
          <div
            className={`${
              isLoading ? styles.btn_content_loading : ""
            } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
          >
            ارسال
          </div>
        </button>
      }
    >
      <div className={styles.content}>
        <h5 className={styles.content_title}>لطفا اطلاعات زیر را وارد کنید</h5>

        <form id="price-feedback-form" onSubmit={handleSubmit(formSubmitting)}>
          {/* PRICE */}
          <Controller
            control={control}
            type="number"
            inputMode="numeric"
            name="competitorPrice"
            rules={{
              required: "اینجا را خالی نگذارید",

              validate: {
                minLength: (value) => {
                  return value.length >= 4 || "قیمت معتبر نیست";
                },

                minPrice: (value) => {
                  return Number(value) > 1000 || "قیمت معتبر نیست";
                },
              },
            }}
            render={({ field }) => (
              <label className="d-inline-block w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <p className={styles.content_subtitle}>
                    این کالا را با چه قیمتی دیده‌اید؟
                  </p>
                </div>

                <div className={styles.input_container}>
                  <div className="flex-grow-1">
                    <input
                      ref={field.ref}
                      className={styles.input}
                      type="text"
                      inputMode="numeric"
                      placeholder="مثلا ۳۵۰۰۰"
                      autoComplete="off"
                      value={formatPrice(field.value)}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, "");

                        field.onChange(rawValue);
                      }}
                    />
                  </div>

                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.price_icon}>
                      <use href="#toman"></use>
                    </svg>
                  </div>
                </div>
                {showError("competitorPrice") && (
                  <div className={styles.error_text}>
                    {errors.competitorPrice.message}
                  </div>
                )}
              </label>
            )}
          />

          {/* CHECKBOX */}
          <label className={styles.checkbox_container}>
            <Controller
              control={control}
              name="isOnlineStore"
              render={({ field }) => (
                <CustomCheckBox
                  checked={field.value}
                  changeHandler={field.onChange}
                  label="در فروشگاه اینترنتی دیده‌ام"
                  titleClassName={styles.checkbox_title}
                  color="#0d4485"
                />
              )}
            />
          </label>

          {/* URL */}
          {isOnlineStore && (
            <label className="d-inline-block w-100">
              <div className="d-flex justify-content-between align-items-center">
                <p className={styles.content_subtitle}>وب‌سایت فروشگاه</p>
              </div>

              <div className={styles.input_container}>
                <div className="flex-grow-1">
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="www.example.com"
                    autoComplete="off"
                    {...register("onlineStoreUrl")}
                  />
                </div>
              </div>
            </label>
          )}

          {!isOnlineStore && (
            <>
              <label className="d-inline-block w-100">
                <div className="d-flex justify-content-between align-items-center">
                  <p className={styles.content_subtitle}>نام فروشگاه</p>
                </div>
                <div
                  className={`${styles.input_container} ${errors.physicalStoreName ? styles.input_error : ""}`}
                >
                  <div className="flex-grow-1">
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="نام فروشگاهی که کالا را با این قیمت در آن دیده‌اید"
                      autoComplete="off"
                      {...register("physicalStoreName", {
                        required: "اینجا را خالی نگذارید.",
                      })}
                    />
                  </div>
                </div>
                {showError("physicalStoreName") && (
                  <p className={styles.error_text}>
                    {errors.physicalStoreName.message}
                  </p>
                )}
              </label>

              <div
                className={styles.store_location_container}
                ref={dropdownRef}
              >
                <div className={styles.content_subtitle}>مکان فروشگاه</div>

                <div className="position-relative">
                  <input
                    className={`${styles.input_state} ${errors.physicalStoreStateId ? styles.input_state_error : ""}`}
                    type="text"
                    placeholder="انتخاب استان"
                    autoComplete="off"
                    value={stateSearch}
                    onFocus={() => setShowStates(true)}
                    onChange={(e) => {
                      setStateSearch(e.target.value);

                      setValue("physicalStoreStateId", e.target.value, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });

                      setShowStates(true);
                    }}
                  />

                  <input
                    type="hidden"
                    {...register("physicalStoreStateId", {
                      required: "اینجا را خالی نگذارید.",
                    })}
                    value={selectedState || ""}
                  />

                  <div
                    className={styles.chevron_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.chevron_icon}>
                      <use href="#dropdown"></use>
                    </svg>
                  </div>

                  {showStates && (
                    <ul className={styles.dropdown_list}>
                      {filteredStates.length ? (
                        filteredStates.map((state) => (
                          <li
                            key={state.id}
                            className={styles.dropdown_item}
                            onClick={() => handleSelectState(state)}
                          >
                            {state.name}
                          </li>
                        ))
                      ) : (
                        <li className={styles.dropdown_empty}>
                          موردی یافت نشد
                        </li>
                      )}
                    </ul>
                  )}
                </div>
                {showError("physicalStoreStateId") && (
                  <div className={styles.error_text}>
                    {errors.physicalStoreStateId.message}
                  </div>
                )}
              </div>
            </>
          )}
        </form>
      </div>
    </BottomSheet>
  );
}

export default PriceFeedbackMobileSheet;

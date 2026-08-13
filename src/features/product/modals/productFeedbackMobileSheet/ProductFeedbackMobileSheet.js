"use client";

import React, { useMemo, useEffect } from "react";

import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";

import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import { useReportProduct } from "@/hooks/useReportProduct";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import Loading from "@/components/modules/loading/Loading";

import styles from "./productFeedbackMobileSheet.module.css";

function ProductFeedbackMobileSheet() {
  const { closeMobileModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { productDetails, feedbackData, feedbackDataIsLoading } =
    useProductContext();

  const { mutate: reportProductMutation, isLoading } = useReportProduct();

  const defaultValues = useMemo(() => {
    const defaults = {};

    feedbackData?.forEach((item) => {
      const key = `question_${item.question_id}`;

      if (item.type === "boolean_checkbox") {
        defaults[key] = false;
      }

      if (item.type === "text") {
        defaults[key] = "";
      }

      item.related_questions?.forEach((related) => {
        defaults[`question_${item.question_id}_${related.question_id}`] = "";
      });
    });

    return defaults;
  }, [feedbackData]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { isDirty, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const disabled = useMemo(() => {
    return !(isDirty && isValid) || isLoading;
  }, [isDirty, isValid, isLoading]);

  const formSubmitting = (data) => {
    reportProductMutation(
      {
        productId: productDetails?.id,
        ...data,
      },
      {
        onSuccess: (res) => {
          if (res?.message === "نظر شما قبلا در سیستم ثبت شده است") {
            showSnackbar(
              "شما قبلا نظر خود را در مورد این کالا ثبت کرده‌اید، سپاسگزاریم",
            );

            handleDismiss();
            return;
          }

          showSnackbar("نظر شما با موفقیت ثبت شد.");

          handleDismiss();
        },

        onError: () => {
          showSnackbar("خطایی رخ داده است.");
        },
      },
    );
  };

  useEffect(() => {
    if (Object.keys(defaultValues).length) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleDismiss = () => {
    closeMobileModal();
  };

  if (feedbackDataIsLoading || !feedbackData?.length) {
    return null;
  }

  return (
    <BottomSheet
      open
      onDismiss={handleDismiss}
      blocking
      expandOnContentDrag
      skipInitialTransition={false}
      snapPoints={({ maxHeight }) => [maxHeight]}
      defaultSnap={({ maxHeight }) => maxHeight * 0.6}
      className={styles.sheet}
      header={
        <div className={styles.header}>
          <div className="d-flex flex-column justify-content-center align-items-start">
            <p className={styles.header_title}>
              گزارش مشخصات کالا یا موارد قانونی
            </p>

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
          form="product-feedback-form"
          type="submit"
          disabled={disabled}
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
        <h5 className={styles.content_title}>این کالا چه مشکلی دارد؟</h5>

        <form
          id="product-feedback-form"
          onSubmit={handleSubmit(formSubmitting)}
        >
          {feedbackData?.map((item, index) => {
            const fieldName = String(item.question_id);

            const checkBoxDataLength = feedbackData.filter(
              (f) => f.type === "boolean_checkbox",
            ).length;

            if (item.type === "boolean_checkbox") {
              return (
                <React.Fragment key={item.question_id}>
                  <label
                    className={`${styles.checkbox_container} ${checkBoxDataLength - 1 === index && "mb-0"}`}
                  >
                    <Controller
                      control={control}
                      name={fieldName}
                      render={({ field }) => (
                        <CustomCheckBox
                          checked={!!field.value}
                          changeHandler={field.onChange}
                          label={item.title}
                          titleClassName={styles.checkbox_title}
                          color="#0d4485"
                          customStyle={{
                            BorderBottom: "none",
                            padding: "0",
                          }}
                        />
                      )}
                    />
                  </label>
                  {item.related_questions && watch(fieldName) ? (
                    <label className={styles.item_checkbox_container}>
                      <div className={styles.input_container}>
                        <div className="flex-grow-1">
                          <input
                            className={styles.input}
                            type="text"
                            placeholder="کد کالای مشابه در دیجی‌کالا"
                            autoComplete="off"
                            {...register("physicalStoreName")}
                          />
                        </div>
                      </div>
                    </label>
                  ) : (
                    ""
                  )}
                </React.Fragment>
              );
            }

            if (item.type === "text") {
              return (
                <label key={item.question_id} className={styles.textarea_label}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className={styles.textarea_title}>{item.title}</p>
                  </div>
                  <div className={styles.textarea_container}>
                    <div className="flex-grow-1">
                      <textarea
                        className={styles.textarea}
                        placeholder="برای ما بنویسید..."
                        {...register(fieldName)}
                        autoComplete="off"
                      ></textarea>
                    </div>
                  </div>
                </label>
              );
            }

            return null;
          })}
        </form>
      </div>
    </BottomSheet>
  );
}

export default ProductFeedbackMobileSheet;

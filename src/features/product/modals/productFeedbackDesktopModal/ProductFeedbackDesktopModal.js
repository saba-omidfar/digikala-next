"use client";

import React, { useMemo, useEffect } from "react";

import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

import { useReportProduct } from "@/hooks/useReportProduct";
import { useProductContext } from "@/contexts/ProductContext";
import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import Loading from "@/components/modules/loading/Loading";

import styles from "./productFeedbackDesktopModal.module.css";

export default function ProductFeedbackDesktopModal() {
  const { closeModal } = useModal();
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

            closeModal();
            return;
          }

          showSnackbar("نظر شما با موفقیت ثبت شد.");

          closeModal();
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

  if (feedbackDataIsLoading || !feedbackData?.length) {
    return null;
  }

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className="d-flex align-items-center">
          <div className={styles.header}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.header_title}>
                <span className="position-relative">
                  گزارش مشخصات کالا یا موارد قانونی
                </span>
              </p>
            </div>
            <div className={styles.product_title}>
              {productDetails?.title_fa}
            </div>
          </div>
          <div className="flex-grow-1 text-h5"></div>
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
      <div className="w-100 flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content}>
          <div className="position-relative w-100 flex-grow-1">
            <h5 className={styles.content_title}>این کالا چه مشکلی دارد؟</h5>
            <div>
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
                      <label
                        key={item.question_id}
                        className={styles.textarea_label}
                      >
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
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className="w-100">
          <button
            form="product-feedback-form"
            type="submit"
            disabled={disabled}
            className={`${styles.footer_btn} ${
              !disabled ? styles.footer_btn_active : ""
            }`}
          >
            {isLoading ? (
              <div className={styles.loading_active}>
                <Loading isSmall />
              </div>
            ) : (
              ""
            )}
            <div
              className={`${
                isLoading ? styles.btn_content_loading : ""
              } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
            >
              ارسال
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

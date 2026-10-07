"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import { useUpdatePersonalInfo } from "@/hooks/useUser";

import toPersianDigits from "@/utils/toPersianDigits";

import ConfirmEditIdentityModal from "../confirmEditIdentityModal/ConfirmEditIdentityModal";

import styles from "./editIdentityModal.module.css";

export default function EditIdentityModal({ profile }) {
  const { closeModal } = useModal();
  const { showSnackbar } = useSnackbar();

  const [isOpenConfirmEditIdentityModal, setIsOpenConfirmEditIdentityModal] =
    useState(false);

  const updatePersonalInfo = useUpdatePersonalInfo();

  const {
    register,
    control,
    handleSubmit,
    getValues,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      nationalIdentityNumber: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
    },
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const nationalIdentityNumber = watch("nationalIdentityNumber");

  const birthDayError =
    errors.birthDay || errors.birthMonth || errors.birthYear;

  useEffect(() => {
    if (!profile) return;

    const [birthYear = "", birthMonth = "", birthDay = ""] =
      profile.birth_date?.split("-") || [];

    reset({
      firstName: profile.first_name || "",
      lastName: profile.last_name || "",
      nationalIdentityNumber: profile.national_identity_number || "",
      birthDay: birthDay ? Number(birthDay).toString() : "",
      birthMonth: birthMonth ? Number(birthMonth).toString() : "",
      birthYear: birthYear || "",
    });
  }, [profile, reset]);

  const handleFormSubmit = () => {
    setIsOpenConfirmEditIdentityModal(true);
  };

  const handleConfirmEdit = async () => {
    const data = getValues();

    const payload = {
      first_name: data.firstName.trim(),
      last_name: data.lastName.trim(),
      national_identity_number: data.nationalIdentityNumber,
      birth_date: `${data.birthYear}-${data.birthMonth.padStart(
        2,
        "0",
      )}-${data.birthDay.padStart(2, "0")}`,
    };

    try {
      await updatePersonalInfo.mutateAsync(payload);

      showSnackbar("اطلاعات شناسایی با موفقیت ویرایش شد");

      setIsOpenConfirmEditIdentityModal(false);
      closeModal("edit-identity");
    } catch (error) {
      console.error("Update identity info error:", error);
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <button
          type="button"
          className={styles.close_btn}
          title="Close"
          onClick={() => closeModal("edit-identity")}
        >
          <div
            className={`${styles.close_icon} cube-font-icon`}
            data-icon-name="nav-close"
            data-icon=""
          />
        </button>

        <h2 className={styles.header_title}>
          {profile?.is_verified ? "ویرایش" : "ثبت"} اطلاعات شناسایی
        </h2>
      </div>

      <div className={styles.content_container}>
        <div className={styles.content_text}>
          <div className={styles.content}>
            <div className={styles.content_title}>
              لطفا اطلاعات شناسایی خود را وارد کنید. نام و نام خانوادگی شما باید
              با اطلاعاتی که وارد می‌کنید، همخوانی داشته باشد.
            </div>

            <form
              className={styles.form}
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <div className={styles.fields_container}>
                <div className={styles.field_name}>
                  <div className={styles.field}>
                    <div className="position-relative">
                      <input
                        className={`${styles.field_input} ${
                          errors.firstName ? styles.field_input_error : ""
                        }`}
                        placeholder=""
                        maxLength={50}
                        {...register("firstName", {
                          required: "نام وارد نشده است",
                          minLength: {
                            value: 2,
                            message: "نام باید حداقل دو کارکتر باشد",
                          },
                        })}
                      />

                      <label
                        className={`${styles.field_label} ${
                          firstName ? styles.field_label_filled : ""
                        }`}
                      >
                        نام
                        <span className={styles.field_required}>*</span>
                      </label>
                    </div>

                    {errors.firstName && (
                      <div className={styles.field_error}>
                        <div className={styles.field_error_text}>
                          {errors.firstName.message}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className={styles.field}>
                    <div className="position-relative">
                      <input
                        className={`${styles.field_input} ${
                          errors.lastName ? styles.field_input_error : ""
                        }`}
                        placeholder=""
                        maxLength={50}
                        {...register("lastName", {
                          required: "نام خانوادگی وارد نشده است",
                          minLength: {
                            value: 3,
                            message: "نام خانوادگی باید حداقل سه کارکتر باشد",
                          },
                        })}
                      />

                      <label
                        className={`${styles.field_label} ${
                          lastName ? styles.field_label_filled : ""
                        }`}
                      >
                        نام خانوادگی
                        <span className={styles.field_required}>*</span>
                      </label>
                    </div>

                    {errors.lastName && (
                      <div className={styles.field_error}>
                        <div className={styles.field_error_text}>
                          {errors.lastName.message}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.field}>
                  <div className="position-relative">
                    <Controller
                      name="nationalIdentityNumber"
                      control={control}
                      rules={{
                        required: "کدملی وارد نشده است",
                        pattern: {
                          value: /^\d{10}$/,
                          message: "کدملی معتبر نیست",
                        },
                      }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className={`${styles.field_input} ${
                            errors.nationalIdentityNumber
                              ? styles.field_input_error
                              : ""
                          }`}
                          placeholder="کد ملی ۱۰ رقمی خود را وارد کنید"
                          inputMode="numeric"
                          maxLength={10}
                          value={toPersianDigits(field.value || "")}
                          onChange={(e) => {
                            const value = e.target.value
                              .replace(/[۰-۹]/g, (digit) =>
                                "۰۱۲۳۴۵۶۷۸۹".indexOf(digit),
                              )
                              .replace(/\D/g, "")
                              .slice(0, 10);

                            field.onChange(value);
                          }}
                        />
                      )}
                    />

                    <label
                      className={`${styles.field_label} ${
                        nationalIdentityNumber ? styles.field_label_filled : ""
                      }`}
                    >
                      کد ملی
                      <span className={styles.field_required}>*</span>
                    </label>
                  </div>

                  {errors.nationalIdentityNumber && (
                    <div className={styles.field_error}>
                      <div className={styles.field_error_text}>
                        {errors.nationalIdentityNumber.message}
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.birthday}>
                  <div className={styles.birthday_title}>تاریخ تولد</div>

                  <div className={styles.birthday_inputs_fields}>
                    <div className={styles.birthday_inputs_field}>
                      <Controller
                        name="birthDay"
                        control={control}
                        rules={{
                          required: "تاریخ تولد وارد نشده است",
                          pattern: {
                            value: /^(0?[1-9]|[12]\d|3[01])$/,
                            message: "تاریخ تولد معتبر نیست",
                          },
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            className={`${styles.field_input} ${
                              birthDayError ? styles.field_input_error : ""
                            }`}
                            placeholder="روز"
                            inputMode="numeric"
                            maxLength={2}
                            value={toPersianDigits(field.value || "")}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/[۰-۹]/g, (digit) =>
                                  "۰۱۲۳۴۵۶۷۸۹".indexOf(digit),
                                )
                                .replace(/\D/g, "")
                                .slice(0, 2);

                              field.onChange(value);
                            }}
                          />
                        )}
                      />
                    </div>

                    <div className={styles.birthday_inputs_field}>
                      <Controller
                        name="birthMonth"
                        control={control}
                        rules={{
                          required: "تاریخ تولد وارد نشده است",
                          pattern: {
                            value: /^(0?[1-9]|1[0-2])$/,
                            message: "تاریخ تولد وارد نشده است",
                          },
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            className={`${styles.field_input} ${
                              birthDayError ? styles.field_input_error : ""
                            }`}
                            placeholder="ماه"
                            inputMode="numeric"
                            maxLength={2}
                            value={toPersianDigits(field.value || "")}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/[۰-۹]/g, (digit) =>
                                  "۰۱۲۳۴۵۶۷۸۹".indexOf(digit),
                                )
                                .replace(/\D/g, "")
                                .slice(0, 2);

                              field.onChange(value);
                            }}
                          />
                        )}
                      />
                    </div>

                    <div className={styles.birthday_inputs_field}>
                      <Controller
                        name="birthYear"
                        control={control}
                        rules={{
                          required: "تاریخ تولد وارد نشده است",
                          pattern: {
                            value: /^\d{4}$/,
                            message: "تاریخ تولد وارد نشده است",
                          },
                        }}
                        render={({ field }) => (
                          <input
                            {...field}
                            className={`${styles.field_input} ${
                              birthDayError ? styles.field_input_error : ""
                            }`}
                            placeholder="سال"
                            inputMode="numeric"
                            maxLength={4}
                            value={toPersianDigits(field.value || "")}
                            onChange={(e) => {
                              const value = e.target.value
                                .replace(/[۰-۹]/g, (digit) =>
                                  "۰۱۲۳۴۵۶۷۸۹".indexOf(digit),
                                )
                                .replace(/\D/g, "")
                                .slice(0, 4);

                              field.onChange(value);
                            }}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {birthDayError && (
                    <div className={styles.field_error}>
                      <div className={styles.field_error_text}>
                        تاریخ تولد وارد نشده است
                      </div>
                    </div>
                  )}

                  <div className={styles.form_info}>
                    <div
                      className={`${styles.form_info_icon} cube-font-icon`}
                      data-icon-name="alert-info-outline"
                      data-icon=""
                    />

                    <div className={styles.field_hint_text}>
                      لطفا دقت کنید! درستی اطلاعات توسط سامانه ثبت احوال بررسی
                      می‌شود و هرسال فقط ۵ بار می‌توانید ثبت درخواست انجام دهید
                    </div>
                  </div>
                </div>

                <div className={styles.submit}>
                  <ConfirmEditIdentityModal
                    isOpen={isOpenConfirmEditIdentityModal}
                    onClose={() => setIsOpenConfirmEditIdentityModal(false)}
                    onSubmit={handleConfirmEdit}
                    isLoading={updatePersonalInfo.isLoading}
                  />

                  <button
                    type="submit"
                    className={styles.submit_btn}
                    disabled={!isValid || updatePersonalInfo.isLoading}
                  >
                    <div
                      className={
                        isValid && !updatePersonalInfo.isLoading
                          ? styles.submit_btn__enabled
                          : styles.submit_btn__disabled
                      }
                    />

                    <div className={styles.submit_btn__content}>
                      <div className={styles.submit_btn__text}>
                        {updatePersonalInfo.isLoading
                          ? "در حال ذخیره..."
                          : "ذخیره"}
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

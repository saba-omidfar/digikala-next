"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";

import toPersianDigits from "@/utils/toPersianDigits";

import { useUpdatePersonalInfo } from "@/hooks/useUser";
import { useGetProfile } from "@/hooks/useUser";

import styles from "./identityVerificationModal.module.css";

const days = Array.from({ length: 31 }, (_, index) => index + 1);
const months = [
  { value: 1, label: "فروردین" },
  { value: 2, label: "اردیبهشت" },
  { value: 3, label: "خرداد" },
  { value: 4, label: "تیر" },
  { value: 5, label: "مرداد" },
  { value: 6, label: "شهریور" },
  { value: 7, label: "مهر" },
  { value: 8, label: "آبان" },
  { value: 9, label: "آذر" },
  { value: 10, label: "دی" },
  { value: 11, label: "بهمن" },
  { value: 12, label: "اسفند" },
];
const years = Array.from({ length: 100 }, (_, index) => 1300 + index);

export default function IdentityVerificationModal() {
  const { closeModal } = useModal();
  const { data: profile } = useGetProfile();

  const { showSnackbar } = useSnackbar();
  const updatePersonalInfo = useUpdatePersonalInfo();

  const [openDropdown, setOpenDropdown] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
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

  const birthDay = watch("birthDay");
  const birthMonth = watch("birthMonth");
  const birthYear = watch("birthYear");

  const onSubmit = async (data) => {
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      national_identity_number: data.nationalIdentityNumber,
      birth_date: `${data.birthYear}-${data.birthMonth.padStart(
        2,
        "0",
      )}-${data.birthDay.padStart(2, "0")}`,
    };

    try {
      console.log("payload ->", payload);

      await updatePersonalInfo.mutateAsync(payload);

      closeModal("identity-verification");
      showSnackbar("اطلاعات با موفقیت ویرایش شد");
    } catch (error) {
      console.error("Update personal info error:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.header_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.header_title}>
                <span className="position-relative">تایید هویت</span>
              </p>
            </div>
          </div>
          <div className="flex-grow-1 text-h5"></div>
          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("identity-verification")}
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
        <div className={styles.content_container}>
          <div className={styles.content}>
            <p className={styles.content_title}>
              اطلاعات شناسایی خود را منطبق با کارت ملی وارد کنید. این اطلاعات
              باید متعلق به مالک شماره{" "}
              <span className={styles.content_title_phone}>
                {toPersianDigits(profile?.phone_number)}
              </span>{" "}
              باشد.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.field}>
                <div className="d-flex gap-3 w-100">
                  <label className="d-inline-block w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className={styles.field_title}>
                        نام<span className={styles.field_required}>*</span>
                      </p>
                    </div>

                    <div
                      className={`${styles.field_input_wrapper} ${
                        errors.firstName ? styles.field_input_error : ""
                      }`}
                    >
                      <div className="flex-grow-1">
                        <input
                          className={styles.field_input}
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
                      </div>
                    </div>

                    {errors.firstName && (
                      <p className={styles.field_error_text}>
                        {errors.firstName.message}
                      </p>
                    )}
                  </label>

                  <label className="d-inline-block w-100">
                    <div className="d-flex justify-content-between align-items-center">
                      <p className={styles.field_title}>
                        نام خانوادگی
                        <span className={styles.field_required}>*</span>
                      </p>
                    </div>

                    <div
                      className={`${styles.field_input_wrapper} ${
                        errors.lastName ? styles.field_input_error : ""
                      }`}
                    >
                      <div className="flex-grow-1">
                        <input
                          className={styles.field_input}
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
                      </div>
                    </div>

                    {errors.lastName && (
                      <p className={styles.field_error_text}>
                        {errors.lastName.message}
                      </p>
                    )}
                  </label>
                </div>

                <label className="d-inline-block w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className={styles.field_title}>
                      کد ملی<span className={styles.field_required}>*</span>
                    </p>
                  </div>

                  <div
                    className={`${styles.field_input_wrapper} ${
                      errors.nationalIdentityNumber
                        ? styles.field_input_error
                        : ""
                    }`}
                  >
                    <div className="flex-grow-1">
                      <input
                        className={styles.field_input}
                        placeholder=""
                        inputMode="numeric"
                        maxLength={10}
                        {...register("nationalIdentityNumber", {
                          required: "کدملی معتبر نیست",
                          pattern: {
                            value: /^\d{10}$/,
                            message: "کدملی معتبر نیست",
                          },
                        })}
                      />
                    </div>
                  </div>

                  <p className={styles.field_hint_text}>
                    متعلق به مالک شماره موبایل
                  </p>

                  {errors.nationalIdentityNumber ? (
                    <p className={styles.field_error_text}>
                      {errors.nationalIdentityNumber.message}
                    </p>
                  ) : (
                    ""
                  )}
                </label>
              </div>

              <div className={styles.birthday_title}>
                <span>تاریخ تولد</span>
                <span className={styles.field_required}>*</span>
              </div>

              <div className={styles.birthday_field}>
                <div
                  className="position-relative"
                  onClick={(event) => event.stopPropagation()}
                >
                  <input
                    type="hidden"
                    {...register("birthDay", {
                      required: true,
                    })}
                  />

                  <input
                    readOnly
                    placeholder="روز"
                    className={styles.birthday_field_input}
                    type="text"
                    value={birthDay ? toPersianDigits(birthDay) : ""}
                    onClick={() =>
                      setOpenDropdown((prev) => (prev === "day" ? null : "day"))
                    }
                  />

                  <div
                    className={styles.drop_down_icon_container}
                    onClick={() =>
                      setOpenDropdown((prev) => (prev === "day" ? null : "day"))
                    }
                  >
                    <svg className={styles.drop_down_icon}>
                      <use href="#dropdown"></use>
                    </svg>
                  </div>

                  {openDropdown === "day" && (
                    <ul className={styles.birthday_day_list}>
                      {days.map((day) => (
                        <li
                          key={day}
                          className={styles.birthday_day_item}
                          onClick={() => {
                            setValue("birthDay", String(day), {
                              shouldValidate: true,
                              shouldDirty: true,
                            });

                            setOpenDropdown(null);
                          }}
                        >
                          {toPersianDigits(day)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className={styles.birthday_field}>
                <div
                  className="position-relative"
                  onClick={(event) => event.stopPropagation()}
                >
                  <input
                    type="hidden"
                    {...register("birthMonth", {
                      required: true,
                    })}
                  />

                  <input
                    readOnly
                    placeholder="ماه"
                    className={styles.birthday_field_input}
                    type="text"
                    value={
                      birthMonth
                        ? months.find(
                            (month) => month.value === Number(birthMonth),
                          )?.label
                        : ""
                    }
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === "month" ? null : "month",
                      )
                    }
                  />

                  <div
                    className={styles.drop_down_icon_container}
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === "month" ? null : "month",
                      )
                    }
                  >
                    <svg className={styles.drop_down_icon}>
                      <use href="#dropdown"></use>
                    </svg>
                  </div>

                  {openDropdown === "month" && (
                    <ul className={styles.birthday_day_list}>
                      {months.map((month) => (
                        <li
                          key={month.value}
                          className={styles.birthday_day_item}
                          onClick={() => {
                            setValue("birthMonth", String(month.value), {
                              shouldValidate: true,
                              shouldDirty: true,
                            });

                            setOpenDropdown(null);
                          }}
                        >
                          {month.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className={styles.birthday_field}>
                <div
                  className="position-relative"
                  onClick={(event) => event.stopPropagation()}
                >
                  <input
                    type="hidden"
                    {...register("birthYear", {
                      required: true,
                    })}
                  />

                  <input
                    readOnly
                    placeholder="سال"
                    className={styles.birthday_field_input}
                    type="text"
                    value={birthYear ? toPersianDigits(birthYear) : ""}
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === "year" ? null : "year",
                      )
                    }
                  />

                  <div
                    className={styles.drop_down_icon_container}
                    onClick={() =>
                      setOpenDropdown((prev) =>
                        prev === "year" ? null : "year",
                      )
                    }
                  >
                    <svg className={styles.drop_down_icon}>
                      <use href="#dropdown"></use>
                    </svg>
                  </div>

                  {openDropdown === "year" && (
                    <ul className={styles.birthday_day_list}>
                      {years.map((year) => (
                        <li
                          key={year}
                          className={styles.birthday_day_item}
                          onClick={() => {
                            setValue("birthYear", String(year), {
                              shouldValidate: true,
                              shouldDirty: true,
                            });

                            setOpenDropdown(null);
                          }}
                        >
                          {toPersianDigits(year)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className={styles.form_hint}>
                <div className="d-flex">
                  <div
                    className={styles.info_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.info_icon}>
                      <use href="#infoOutline"></use>
                    </svg>
                  </div>
                  <span className={styles.form_hint_text}>
                    لطفاً دقت کنید! درستی اطلاعات توسط سامانه ثبت احوال بررسی
                    می‌شود و هر سال فقط ۵ بار می‌توانید ثبت درخواست انجام دهید.
                  </span>
                </div>
              </div>

              <div className={styles.footer}>
                <button
                  className={`${styles.footer_btn} ${!isValid && !updatePersonalInfo.isLoading ? styles.footer_btn_disabled : ""}`}
                  type="submit"
                  disabled={!isValid && !updatePersonalInfo.isLoading}
                  data-cro-id="profile-identity-submit"
                >
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    ثبت
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import IdentityVerificationAlert from "@/features/profile/sections/identityVerificationAlert/IdentityVerificationAlert";
import IdentityVerificationModal from "@/features/profile/modals/identityVerificationModal/IdentityVerificationModal";
import EditIdentityModal from "@/features/profile/modals/editIdentityModal/EditIdentityModal";
import AddEmailModal from "@/features/profile/modals/addEmailModal/AddEmailModal";
import AddPhoneModal from "@/features/profile/modals/addPhoneModal/AddPhoneModal";
import DeleteAccountModal from "@/features/profile/modals/deleteAccountModal/DeleteAccountModal";

import { useGetProfile } from "@/hooks/useUser";

import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./profilePersonal.module.css";

export default function ProfilePersonal() {
  const { openModal } = useModal();
  const { data: profile, isLoading } = useGetProfile();

  const firstName = profile?.first_name || "وارد نشده است";
  const lastName = profile?.last_name || "وارد نشده است";
  const nationalIdentityNumber =
    profile?.national_identity_number || "وارد نشده است";
  const phoneNumber = profile?.phone_number || "وارد نشده است";
  const birthDate = profile?.birth_date || "وارد نشده است";
  const email = profile?.email || "--";

  if (isLoading) return null;

  return (
    <div className={styles.profile_content}>
      <div className={styles.personal_content_container}>
        <div className={styles.personal_content}>
          <div className={styles.personal_info}>
            {!profile?.is_verified ? <IdentityVerificationAlert /> : ""}

            <div className="d-flex align-items-center justify-content-between">
              <h3 className={styles.personal_info_section_title}>
                اطلاعات شناسایی
              </h3>
              {profile.is_verified ? (
                <span className={styles.personal_info_verify_badge}>
                  تایید شده
                </span>
              ) : (
                ""
              )}
              <button
                className={styles.personal_info_edit_btn}
                onClick={() =>
                  openModal(<EditIdentityModal profile={profile} />, {
                    name: "edit-identity",
                    className: "modal__edit_identity rounded-medium",
                  })
                }
              >
                <div
                  className={`${styles.personal_info_edit_icon} cube-font-icon`}
                  data-icon-name="content-edit"
                  data-icon=""
                ></div>
                <div className={styles.personal_info_edit_btn_text}>ویرایش</div>
              </button>
            </div>
            <div className={styles.personal_info_content}>
              <div className={styles.personal_info_content_item}>
                <div className="d-flex flex-column position-relative">
                  <div className={styles.personal_info_item_inner}>
                    <div className="d-flex flex-column flex-1">
                      <h3 className={styles.personal_info_item_title}>نام</h3>
                      <p className={styles.personal_info_item_value}>
                        {firstName}
                      </p>
                    </div>
                    <div
                      className={styles.personal_info_verify_badge_container}
                    ></div>
                  </div>
                </div>
              </div>
              <div className={styles.personal_info_content_item}>
                <div className="d-flex flex-column position-relative">
                  <div className={styles.personal_info_item_inner}>
                    <div className="d-flex flex-column flex-1">
                      <h3 className={styles.personal_info_item_title}>
                        نام خانوادگی
                      </h3>
                      <p className={styles.personal_info_item_value}>
                        {lastName}
                      </p>
                    </div>
                    <div
                      className={styles.personal_info_verify_badge_container}
                    ></div>
                  </div>
                </div>
              </div>
              <div className={styles.personal_info_content_item}>
                <div className="d-flex flex-column position-relative">
                  <div className={styles.personal_info_item_inner}>
                    <div className="d-flex flex-column flex-1">
                      <h3 className={styles.personal_info_item_title}>
                        کد ملی
                      </h3>
                      <p className={styles.personal_info_item_value}>
                        {toPersianDigits(nationalIdentityNumber)}
                      </p>
                    </div>
                    <div
                      className={styles.personal_info_verify_badge_container}
                    ></div>
                  </div>
                </div>
              </div>
              <div className={styles.personal_info_content_item}>
                <div className="d-flex flex-column position-relative">
                  <div className={styles.personal_info_item_inner}>
                    <div className="d-flex flex-column flex-1">
                      <h3 className={styles.personal_info_item_title}>
                        تاریخ تولد
                      </h3>
                      <p className={styles.personal_info_item_value}>
                        {toPersianDigits(birthDate.replaceAll("-", "/"))}
                      </p>
                    </div>
                    <div
                      className={styles.personal_info_verify_badge_container}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.personal_info}>
            <div className="d-flex align-items-center justify-content-between">
              <h3 className={styles.personal_info_section_title}>
                اطلاعات تماس
              </h3>
            </div>

            <div className={styles.personal_info_content}>
              <div
                className={styles.personal_info_content_item}
                onClick={() =>
                  openModal(<AddPhoneModal profile={profile} />, {
                    name: "add-phone",
                    className: "modal__add_phone rounded-medium",
                  })
                }
              >
                <div className="d-flex flex-column position-relative">
                  <div className={styles.personal_info_item_inner}>
                    <div className="d-flex flex-column flex-1">
                      <h3 className={styles.personal_info_item_title}>
                        شماره موبایل
                      </h3>
                      <p className={styles.personal_info_item_value}>
                        {toPersianDigits(phoneNumber)}
                      </p>
                    </div>
                    {profile?.is_phone_verified ? (
                      <div
                        className={styles.personal_info_verify_badge_container}
                      >
                        <span
                          className={styles.personal_info_item_verify_badge}
                        >
                          تایید شده
                        </span>
                        <div
                          className={`${styles.personal_info_chevron_icon} cube-font-icon`}
                          data-icon-name="nav-chevron-left"
                          data-icon=""
                        ></div>
                      </div>
                    ) : (
                      <div
                        className={styles.personal_info_verify_badge_container}
                      >
                        <span
                          className={styles.personal_info_item_not_verify_badge}
                        >
                          نیاز به تایید
                        </span>
                        <div
                          className={`${styles.personal_info_chevron_icon} cube-font-icon`}
                          data-icon-name="nav-chevron-left"
                          data-icon=""
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className={styles.personal_info_content_item}
                onClick={() =>
                  openModal(<AddEmailModal profile={profile} />, {
                    name: "add-email",
                    className: "modal__add_email rounded-medium",
                  })
                }
              >
                <div className="d-flex flex-column position-relative">
                  <div className={styles.personal_info_item_inner}>
                    <div className="d-flex flex-column flex-1">
                      <h3 className={styles.personal_info_item_title}>ایمیل</h3>
                      <p className={styles.personal_info_item_value}>{email}</p>
                    </div>
                    {profile?.email ? (
                      <div
                        className={styles.personal_info_verify_badge_container}
                      >
                        {profile?.is_email_verified ? (
                          <span
                            className={styles.personal_info_item_verify_badge}
                          >
                            تایید شده
                          </span>
                        ) : (
                          <div
                            className={
                              styles.personal_info_verify_badge_container
                            }
                          >
                            <span
                              className={
                                styles.personal_info_item_not_verify_badge
                              }
                            >
                              نیاز به تایید
                            </span>
                            <div
                              className={`${styles.personal_info_chevron_icon} cube-font-icon`}
                              data-icon-name="nav-chevron-left"
                              data-icon=""
                            ></div>
                          </div>
                        )}
                        <div
                          className={`${styles.personal_info_chevron_icon} cube-font-icon`}
                          data-icon-name="nav-chevron-left"
                          data-icon=""
                        ></div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className={styles.delete_account_info}
            onClick={() =>
              openModal(<DeleteAccountModal />, {
                name: "delete-account",
                className: "modal__delete_account rounded-medium",
              })
            }
          >
            <div className="position-relative">
              <div className="d-flex flex-column position-relative">
                <div className={styles.delete_account_section}>
                  <div
                    className={`${styles.delete_icon} cube-font-icon`}
                    data-icon-name="action-delete"
                    data-icon=""
                  ></div>
                  <div className={styles.delete_account_section_content}>
                    <div className="d-flex flex-column">
                      <h3 className={styles.delete_account_section_title}>
                        حذف حساب کاربری{" "}
                      </h3>
                    </div>
                    <div className={styles.chevron_icon_container}>
                      <div
                        className={`${styles.personal_info_chevron_icon} cube-font-icon`}
                        data-icon-name="nav-chevron-left"
                        data-icon=""
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

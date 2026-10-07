"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useQueryClient } from "react-query";
import { useForm, Controller } from "react-hook-form";

import MapComponent from "@/components/modules/map/MapComponent";

import { useModal } from "@/contexts/modalContext";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { useUserContext } from "@/contexts/UserContext";

import {
  useAddAddress,
  useEditAddress,
} from "@/features/profile/hooks/useAddress";

import styles from "./confirmAddressModal.module.css";

export default function ConfirmAddressModal({
  data,
  location,
  isEdit,
  address,
}) {
  const queryClient = useQueryClient();
  const mapRef = useRef(null);

  const { user } = useUserContext();
  const { closeAll } = useModal();
  const { showSnackbar } = useSnackbar();

  const { mutateAsync: addAddress, isLoading: isAdding } = useAddAddress();
  const { mutateAsync: editAddress, isLoading: isEditing } = useEditAddress();

  const isSaving = isAdding || isEditing;

  const [currentCoords, setCurrentCoords] = useState({
    lng: location.longitude,
    lat: location.latitude,
  });
  const [addressName, setAddressName] = useState("");
  const [recipient, setRecipient] = useState("myself");

  useEffect(() => {
    setAddressName(isEdit ? address?.name || "" : "");
  }, [address, isEdit]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: isEdit
        ? address?.full_name || ""
        : [user?.user?.first_name, user?.user?.last_name]
            .filter(Boolean)
            .join(" "),
      mobile: isEdit
        ? address?.mobile || ""
        : user?.user?.mobile || user?.user?.phone || "",
    },
  });

  const handleMapMove = useCallback((coords) => {
    setCurrentCoords(coords);
  }, []);

  const handleSaveAddress = handleSubmit(async (formData) => {
    if (!addressName.trim()) {
      showSnackbar("لطفاً نام آدرس را وارد نمایید.");
      return;
    }

    const fullName =
      recipient === "someoneElse"
        ? formData.fullName.trim()
        : [user?.user?.first_name, user?.user?.last_name]
            .filter(Boolean)
            .join(" ");

    const mobile =
      recipient === "someoneElse"
        ? formData.mobile.trim()
        : user?.user?.mobile || user?.user?.phone || "";

    const payload = {
      id: address?.id,
      name: addressName.trim(),

      fullName,
      address: data.address,
      postalCode: data.postalCode,

      telephone: "",
      mobile,

      cityId: data.cityId,
      cityName: data.cityName,

      stateId: data.stateId,
      stateName: data.stateName,

      latitude: currentCoords.lat,
      longitude: currentCoords.lng,

      buildingNumber: data.buildingNumber,
      unit: data.unit,
    };

    try {
      if (!user?.is_logged_in) {
        showSnackbar("آدرس با موفقیت ثبت شد.");
      } else if (isEdit) {
        await editAddress(payload);
        await queryClient.invalidateQueries(["user"]);

        showSnackbar("آدرس با موفقیت ویرایش شد.");
      } else {
        await addAddress(payload);
        await queryClient.invalidateQueries(["user"]);

        showSnackbar("آدرس با موفقیت ثبت شد.");
      }

      closeAll();
    } catch (error) {
      console.error("Save address error:", error);

      showSnackbar(
        error?.response?.data?.message ||
          (isEdit
            ? "ویرایش آدرس با خطا مواجه شد."
            : "ثبت آدرس با خطا مواجه شد."),
      );
    }
  });

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className={styles.header_title}>تایید اطلاعات آدرس</div>

                  <button
                    type="button"
                    className="d-flex"
                    aria-label="بستن"
                    onClick={() => closeAll()}
                  >
                    <div
                      className={`${styles.close_icon} cube-font-icon`}
                      data-icon-name="cube-nav-close"
                      data-icon=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content_container}>
          <div className={styles.content}>
            <div className={styles.content_map_continer}>
              <MapComponent
                data={data}
                mapRef={mapRef}
                initialCenter={{
                  ...currentCoords,
                  zoom: 18,
                }}
                onMove={handleMapMove}
              >
                <div
                  className={styles.choose_location__pin}
                  role="img"
                  aria-hidden="false"
                  aria-label="Pin"
                >
                  <img
                    className={styles.choose_location__pin_img}
                    alt="Pin"
                    title=""
                    src="https://www.digikala.com/statics/img/svg/pin-nearby.svg"
                  />
                </div>
              </MapComponent>
            </div>

            <div className={styles.content_address_container}>
              <div className="d-flex" aria-hidden="false">
                <div
                  className={`${styles.location_icon} cube-font-icon`}
                  data-icon-name="cube-location-street"
                  data-icon=""
                />
              </div>

              <span className={styles.location_address}>
                {`${data?.stateName}، ${data?.cityName}، ${data.address}`}
              </span>
            </div>

            <div className={styles.content_form}>
              <div className={styles.address_name_field}>
                <label className="d-inline-block w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className={styles.form_state}>
                      نام آدرس
                      <span className={styles.form_state_icon}>*</span>
                    </p>
                  </div>

                  <div className={styles.input_container}>
                    <div className="flex-grow-1">
                      <input
                        className={styles.input}
                        placeholder="مثال : خانه، محل‌ کار و ..."
                        autoComplete="off"
                        type="text"
                        value={addressName}
                        onChange={(event) => {
                          setAddressName(event.target.value);
                        }}
                      />
                    </div>
                  </div>
                </label>
              </div>

              <div className={styles.recipient_section}>
                <span className={styles.recipient_title}>
                  سفارش‌های این آدرس را چه کسی تحویل می‌گیرد؟
                </span>

                <div className={styles.recipient_options}>
                  <div className={styles.recipient_option_container}>
                    <label className={styles.recipient_option}>
                      <input
                        className={styles.recipient_radio}
                        type="radio"
                        name="recipient"
                        value="myself"
                        checked={recipient === "myself"}
                        onChange={(event) => setRecipient(event.target.value)}
                      />

                      <div className={styles.recipient_radio_box}>
                        <div
                          className={`${styles.recipient_radio_indicator} ${
                            recipient === "myself"
                              ? styles.recipient_radio_indicator__active
                              : ""
                          }`}
                        >
                          {recipient === "myself" ? (
                            <div
                              className={
                                styles.recipient_radio_indicator_circle
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <span className={styles.recipient_label}>
                        تحویل به خودم
                      </span>
                    </label>
                  </div>

                  <div className={styles.recipient_option_container}>
                    <label className={styles.recipient_option}>
                      <input
                        className={styles.recipient_radio}
                        type="radio"
                        name="recipient"
                        value="someoneElse"
                        checked={recipient === "someoneElse"}
                        onChange={(event) => setRecipient(event.target.value)}
                      />

                      <div className={styles.recipient_radio_box}>
                        <div
                          className={`${styles.recipient_radio_indicator} ${
                            recipient === "someoneElse"
                              ? styles.recipient_radio_indicator__active
                              : ""
                          }`}
                        >
                          {recipient === "someoneElse" ? (
                            <div
                              className={
                                styles.recipient_radio_indicator_circle
                              }
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>

                      <span className={styles.recipient_label}>
                        تحویل به شخص دیگر
                      </span>
                    </label>
                  </div>
                </div>

                {recipient !== "myself" ? (
                  <div className={styles.recipient_someonelse_container}>
                    <div className="w-100">
                      <Controller
                        name="fullName"
                        control={control}
                        rules={{
                          required: "نام و نام‌خانوادگی گیرنده را وارد کنید",
                        }}
                        render={({ field }) => (
                          <label className="d-inline-block w-100">
                            <div className="d-flex justify-content-between align-items-center">
                              <p className={styles.form_state}>
                                نام و نام خانوادگی
                                <span className={styles.form_state_icon}>
                                  *
                                </span>
                              </p>
                            </div>

                            <div
                              className={`${styles.input_container} ${
                                errors.fullName
                                  ? styles.input_container__error
                                  : ""
                              }`}
                            >
                              <div className="flex-grow-1">
                                <input
                                  className={styles.input}
                                  placeholder=""
                                  autoComplete="off"
                                  type="text"
                                  {...field}
                                />
                              </div>
                            </div>

                            {errors.fullName && (
                              <p className={styles.form_state__error_text}>
                                {errors.fullName.message}
                              </p>
                            )}
                          </label>
                        )}
                      />
                    </div>

                    <div className={styles.recipient_someonelse_input}>
                      <Controller
                        name="mobile"
                        control={control}
                        rules={{
                          required: "شماره همراه گیرنده را وارد کنید",
                          pattern: {
                            value: /^09\d{9}$/,
                            message: "شماره همراه معتبر وارد کنید",
                          },
                        }}
                        render={({ field }) => (
                          <label className="d-inline-block w-100">
                            <div className="d-flex justify-content-between align-items-center">
                              <p className={styles.form_state}>
                                شماره همراه
                                <span className={styles.form_state_icon}>
                                  *
                                </span>
                              </p>
                            </div>

                            <div
                              className={`${styles.input_container} ${
                                errors.mobile
                                  ? styles.input_container__error
                                  : ""
                              }`}
                            >
                              <div className="flex-grow-1">
                                <input
                                  className={styles.input}
                                  placeholder=""
                                  autoComplete="tel"
                                  type="tel"
                                  inputMode="numeric"
                                  {...field}
                                />
                              </div>
                            </div>

                            {errors.mobile && (
                              <p className={styles.form_state__error_text}>
                                {errors.mobile.message}
                              </p>
                            )}
                          </label>
                        )}
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className={`${styles.footer_reject_btn} ${styles.footer_btn}`}
            onClick={() => closeAll()}
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              انصراف
            </div>
          </button>

          <button
            type="button"
            disabled={isSaving}
            className={`${styles.footer_save_btn} ${styles.footer_btn}`}
            onClick={handleSaveAddress}
          >
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              {isSaving ? "در حال ذخیره..." : "ذخیره آدرس"}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

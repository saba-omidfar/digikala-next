"use client";
import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { useModal } from "@/contexts/modalContext";
import { useLocation } from "@/contexts/locationContext";

import { useGetStates } from "@/features/profile/hooks/useStates";
import { useGetCities } from "@/features/profile/hooks/useGetCities";
import useScreenStatus from "@/hooks/useScreenStatus";

import LocationPickerModal from "@/features/profile/modals/locationPickerModal/LocationPickerModal";
import MapComponent from "@/components/modules/map/MapComponent";

import styles from "./AddNewAddressModal.module.css";

export default function AddNewAddressModal({
  address,
  isEdit,
  manualAddress,
  setManualAddress,
}) {
  const { isSmallScreen } = useScreenStatus();
  const { openModal, closeModal } = useModal();

  const [isManualAddress, setIsManualAddress] = useState(
    manualAddress || false,
  );

  const { DEFAULT_LOCATION, mapRef, selectedLocation, setMapCenter } =
    useLocation();

  const { handleSubmitAddress } = useLocation();

  const { data: states, isLoading: stateIsLoading } = useGetStates();
  const { data: cities, isLoading: citiesIsLoading } = useGetCities();

  const stateDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);

  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const [stateSearch, setStateSearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const handleMapMove = () => {
    setMapCenter({
      lng: selectedLocation.latitude,
      lat: selectedLocation.longitude,
      zoom: 12,
    });
  };

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      stateId: "",
      cityId: "",
      address: "",
      buildingNumber: "",
      unit: "",
      postalCode: "",
    },
  });

  useEffect(() => {
    if (address) {
      reset({
        stateId: String(address.state_id || ""),
        cityId: String(address.city_id || ""),
        address: address.address || "",
        buildingNumber: address.building_number || "",
        unit: address.unit || "",
        postalCode: address.postal_code || "",
      });

      return;
    }

    reset({
      stateId: "",
      cityId: "",
      address: "",
      buildingNumber: "",
      unit: "",
      postalCode: "",
    });
  }, [address, reset]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target)
      ) {
        setIsStateOpen(false);
      }

      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target)
      ) {
        setIsCityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedStateId = watch("stateId");
  const selectedCityId = watch("cityId");

  const onSubmit = async (data) => {
    const selectedState = states?.find(
      (state) => String(state.id) === String(data.stateId),
    );

    const selectedCity = cities?.find(
      (city) => String(city.id) === String(data.cityId),
    );

    const location = await handleSubmitAddress({
      address: data.address,
      city: selectedCity?.name || "",
      state: selectedState?.name || "",
    });

    if (!location) return;

    const addressData = {
      ...data,

      id: address?.id,

      stateName: selectedState?.name || address?.state_name || "",
      cityName: selectedCity?.name || address?.city_name || "",

      isEdit,
    };

    closeModal("add-new-address");
    openModal(
      <LocationPickerModal
        location={location}
        data={addressData}
        address={address}
        isEdit={isEdit}
      />,
      {
        name: "location-picker",
        className: "modal__location_picker rounded-medium",
      },
    );
  };

  const handleStateSelect = (state) => {
    setValue("stateId", state.id, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue("cityId", "", {
      shouldValidate: true,
    });

    setStateSearch("");
    setCitySearch("");

    setIsStateOpen(false);
    setIsCityOpen(false);
  };

  const handleCitySelect = (city) => {
    setValue("cityId", city.id, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setCitySearch("");
    setIsCityOpen(false);
  };

  const selectedState = states?.find(
    (state) => String(state.id) === String(selectedStateId),
  );

  const selectedCity = cities?.find(
    (city) => String(city.id) === String(selectedCityId),
  );

  const filteredStates =
    states?.filter((state) =>
      state.name.toLowerCase().includes(stateSearch.toLowerCase()),
    ) || [];

  const filteredCities =
    cities
      ?.filter((city) => String(city.state_id) === String(selectedStateId))
      .filter((city) =>
        city.name.toLowerCase().includes(citySearch.toLowerCase()),
      ) || [];

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className="flex-grow-1">
            <div className="d-flex align-items-center justify-content-between">
              <div className={styles.header_title}>افزودن آدرس جدید</div>
            </div>
          </div>

          <div
            className="d-flex"
            aria-hidden="false"
            onClick={() => closeModal("add-new-address")}
          >
            <div
              className={`${styles.close_icon} cube-font-icon`}
              data-icon-name="cube-nav-close"
              data-icon=""
            />
          </div>
        </div>
      </div>

      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.content}>
          <div className="w-100">
            {!isManualAddress ? (
              <>
                <div className="d-flex flex-column">
                  <div className={styles.map_container}>
                    <MapComponent
                      mapRef={mapRef}
                      initialCenter={DEFAULT_LOCATION}
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
                          src="https://www.digikala.com/statics/img/svg/pin-edit.svg"
                        />
                      </div>
                    </MapComponent>
                  </div>
                </div>
                <div className={styles.location_details_container}>
                  <span className={styles.location_text}>
                    آدرس براساس موقعیت مکانی انتخاب شده
                  </span>
                  <div className={styles.location_address}>
                    <span className={styles.location_address_text}>
                      {selectedLocation?.address}
                    </span>
                  </div>
                  <span className={styles.location_address_hint_text}>
                    اگر آدرس نادرست است، می‌توانید از ثبت دستی آدرس استفاده
                    کنید.
                  </span>
                  <div className={styles.add_new_address_btn}>
                    <span
                      className={styles.add_new_address_btn_text}
                      onClick={() => {
                        setIsManualAddress(true);
                        setManualAddress?.(true);
                      }}
                    >
                      ثبت دستی آدرس
                    </span>
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className={`${styles.add_new_address_icon} cube-font-icon`}
                        data-icon-name="cube-nav-chevron-left"
                        data-icon=""
                      ></div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              {isManualAddress ? (
                <>
                  <div className={styles.form_state_container}>
                    <div>
                      <div>
                        <div className={styles.form_state}>
                          استان
                          <label className={styles.form_state_icon}>*</label>
                        </div>

                        <Controller
                          name="stateId"
                          control={control}
                          rules={{
                            required: "لطفاًً استان را انتخاب کنید.",
                          }}
                          render={({ field }) => (
                            <div
                              ref={stateDropdownRef}
                              className="position-relative"
                            >
                              <input type="hidden" {...field} />

                              <input
                                placeholder=""
                                className={`${styles.form_state_input} ${isSmallScreen && errors.stateId ? styles.form_state_input__error : ""}`}
                                autoComplete="off"
                                type="text"
                                value={
                                  isStateOpen
                                    ? stateSearch
                                    : selectedState?.name || ""
                                }
                                onFocus={() => {
                                  setIsStateOpen(true);
                                  setStateSearch("");
                                }}
                                onChange={(e) => {
                                  setStateSearch(e.target.value);
                                  setIsStateOpen(true);
                                }}
                              />

                              <div
                                className={styles.chevron_icon_container}
                                aria-hidden="false"
                                onClick={() => {
                                  setIsStateOpen((prev) => !prev);
                                  setStateSearch("");
                                }}
                              >
                                <svg className={styles.chevron_icon}>
                                  <use href="#dropdown"></use>
                                </svg>
                              </div>

                              {isStateOpen && (
                                <ul className={styles.state_drop_down_list}>
                                  {stateIsLoading ? (
                                    <li
                                      className={
                                        styles.state_drop_down_list_item
                                      }
                                    >
                                      در حال بارگذاری...
                                    </li>
                                  ) : filteredStates.length > 0 ? (
                                    filteredStates.map((state) => (
                                      <li
                                        key={state.id}
                                        className={
                                          styles.state_drop_down_list_item
                                        }
                                        onClick={() => handleStateSelect(state)}
                                      >
                                        {state.name}
                                      </li>
                                    ))
                                  ) : (
                                    <li
                                      className={
                                        styles.state_drop_down_list_item
                                      }
                                    >
                                      موردی یافت نشد
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          )}
                        />

                        {errors.stateId && (
                          <p className={styles.form_state__error_text}>
                            {errors.stateId.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <div>
                        <div className={styles.form_state}>
                          شهر
                          <label className={styles.form_state_icon}>*</label>
                        </div>

                        <Controller
                          name="cityId"
                          control={control}
                          rules={{
                            required: "شهر را انتخاب کنید.",
                          }}
                          render={({ field }) => (
                            <div
                              ref={cityDropdownRef}
                              className="position-relative"
                            >
                              <input type="hidden" {...field} />

                              <input
                                placeholder=""
                                className={`${styles.form_state_input} ${isSmallScreen && errors.cityId ? styles.form_state_input__error : ""}`}
                                autoComplete="off"
                                type="text"
                                value={
                                  isCityOpen
                                    ? citySearch
                                    : selectedCity?.name || ""
                                }
                                disabled={!selectedStateId}
                                onFocus={() => {
                                  if (!selectedStateId) return;

                                  setIsCityOpen(true);
                                  setCitySearch("");
                                }}
                                onChange={(e) => {
                                  setCitySearch(e.target.value);
                                  setIsCityOpen(true);
                                }}
                              />

                              <div
                                className={styles.chevron_icon_container}
                                aria-hidden="false"
                                onClick={() => {
                                  if (!selectedStateId) return;

                                  setIsCityOpen((prev) => !prev);
                                  setCitySearch("");
                                }}
                              >
                                <svg className={styles.chevron_icon}>
                                  <use href="#dropdown"></use>
                                </svg>
                              </div>

                              {isCityOpen && selectedStateId && (
                                <ul className={styles.state_drop_down_list}>
                                  {citiesIsLoading ? (
                                    <li
                                      className={
                                        styles.state_drop_down_list_item
                                      }
                                    >
                                      درحال بارگذاری...
                                    </li>
                                  ) : filteredCities.length > 0 ? (
                                    filteredCities.map((city) => (
                                      <li
                                        key={city.id}
                                        className={
                                          styles.state_drop_down_list_item
                                        }
                                        onClick={() => handleCitySelect(city)}
                                      >
                                        {city.name}
                                      </li>
                                    ))
                                  ) : (
                                    <li
                                      className={
                                        styles.state_drop_down_list_item
                                      }
                                    >
                                      موردی یافت نشد
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          )}
                        />

                        {errors.cityId && (
                          <p className={styles.form_state__error_text}>
                            {errors.cityId.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className={styles.form_address_container}>
                    <Controller
                      name="address"
                      control={control}
                      rules={{
                        required: "لطفاًً آدرس را وارد کنید.",
                      }}
                      render={({ field }) => (
                        <label className="d-inline-block w-100">
                          <div className="d-flex justify-content-between align-items-center">
                            <p className={styles.form_state}>
                              آدرس
                              <span className={styles.form_state_icon}>*</span>
                            </p>
                          </div>

                          <div
                            className={`${styles.input_container} ${
                              errors.address
                                ? styles.input_container__error
                                : ""
                            }`}
                          >
                            <div className="flex-grow-1">
                              <input
                                className={styles.input}
                                placeholder="مثال : خیابان، کوچه و جزئیات آدرس"
                                autoComplete="off"
                                type="text"
                                {...field}
                              />
                            </div>
                          </div>

                          {errors.address && (
                            <p className={styles.form_state__error_text}>
                              {errors.address.message}
                            </p>
                          )}
                        </label>
                      )}
                    />

                    <span className={styles.form_state_subtitle}>
                      در صورت تغییر این بخش و ناهماهنگی آن با موقعیت مکانی، ممکن
                      است ارسال سفارش با مشکل مواجه شود.
                    </span>
                  </div>
                </>
              ) : (
                ""
              )}

              <div className={styles.form_unit_container}>
                <Controller
                  name="buildingNumber"
                  control={control}
                  rules={{
                    required: "پلاک را وارد کنید.",
                  }}
                  render={({ field }) => (
                    <label className="d-inline-block">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className={styles.form_state}>
                          پلاک
                          <span className={styles.form_state_icon}>*</span>
                        </p>
                      </div>

                      <div
                        className={`${styles.input_container} ${
                          errors.buildingNumber
                            ? styles.input_container__error
                            : ""
                        }`}
                      >
                        <div className="flex-grow-1">
                          <input
                            className={styles.input}
                            autoComplete="off"
                            type="text"
                            {...field}
                          />
                        </div>
                      </div>

                      {errors.buildingNumber && (
                        <p className={styles.form_state__error_text}>
                          {errors.buildingNumber.message}
                        </p>
                      )}
                    </label>
                  )}
                />

                <Controller
                  name="unit"
                  control={control}
                  render={({ field }) => (
                    <label className="d-inline-block">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className={styles.form_state}>واحد</p>
                      </div>

                      <div className={styles.input_container}>
                        <div className="flex-grow-1">
                          <input
                            className={styles.input}
                            autoComplete="off"
                            type="text"
                            {...field}
                          />
                        </div>
                      </div>
                    </label>
                  )}
                />
              </div>

              <div className={styles.form_postal_code_container}>
                <Controller
                  name="postalCode"
                  control={control}
                  rules={{
                    required: "اینجا را خالی نگذارید",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "کدپستی وارد شده درست نیست",
                    },
                  }}
                  render={({ field }) => (
                    <label className="d-inline-block w-100">
                      <div className="d-flex justify-content-between align-items-center">
                        <p className={styles.form_state}>
                          کدپستی
                          <span className={styles.form_state_icon}>*</span>
                        </p>
                      </div>

                      <div
                        className={`${styles.input_container} ${
                          errors.postalCode ? styles.input_container__error : ""
                        }`}
                      >
                        <div className="flex-grow-1">
                          <input
                            className={styles.input}
                            placeholder="باید ۱۰ رقمی باشد"
                            autoComplete="off"
                            maxLength={10}
                            type="text"
                            {...field}
                          />
                        </div>
                      </div>

                      {errors.postalCode && (
                        <p className={styles.form_state__error_text}>
                          {errors.postalCode.message}
                        </p>
                      )}
                    </label>
                  )}
                />
              </div>

              <div className={styles.footer}>
                <div className="d-flex align-items-center justify-content-end">
                  <button
                    data-cro-id="submit-address"
                    type="submit"
                    className={styles.footer_btn}
                  >
                    <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                      تایید و ادامه
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

"use client";

import React from "react";

import { useModal } from "@/contexts/modalContext";
import { useLocation } from "@/contexts/locationContext";

import LocationModal from "@/components/layout/header/modals/locationModal/LocationModal";
import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";

import styles from "./selectCity.module.css";

function SelectCity() {
  const { openModal } = useModal();
  const { selectedLocation } = useLocation();

  const modalClickHandler = () => {
    !locations.length
      ? openModal(<SelectLocationModal />, {
          className: "modal__select_location rounded-large",
        })
      : openModal(<LocationModal />, {
          className: "modal__location rounded-large",
          size: "md",
        });
  };

  return (
    <>
      <div
        className={styles.select_city__responsive}
        onClick={modalClickHandler}
      >
        {selectedLocation ? (
          <div className={styles.topbar__selectedcity}>
            <div className="d-flex ms-2">
              <div
                data-icon-name="cube-nav-chevron-down"
                data-icon="&#xE946;"
                className={`${styles.topbar__selectedcity_icon} cube-font-icon`}
              ></div>
            </div>
            <div className={styles.topbar__selectedcity_text}>
              {selectedLocation?.address}
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center" style={{ gap: "8px" }}>
            <div
              data-icon-name="cube-nav-chevron-down"
              data-icon="&#xE946;"
              className={`${styles.topbar__selectedcity_icon} cube-font-icon`}
            ></div>

            <span className={styles.topbar__selectedcity_text}>
              انتخاب آدرس
            </span>
          </div>
        )}
        <div className="d-flex">
          <div
            data-icon-name="cube-nav-chevron-down"
            data-icon="&#xE9C2;"
            className={`${styles.topbar__selectedcity_chevron_icon} cube-font-icon`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default SelectCity;

import { useState, useEffect, useCallback } from "react";

import { useModal } from "@/contexts/modalContext";
import { useLocation } from "@/contexts/locationContext";
import useScreenStatus from "@/hooks/useScreenStatus";

import SearchLocationModal from "../searchLocationModal/SearchLocationModal";
import Map from "@/components/modules/map/Map";

import styles from "./selectLocationModal.module.css";

function SelectLocationModal({ isEdit }) {
  const [isOpenSearch, setIsOpenSearch] = useState(false);

  const { openModal, closeAll } = useModal();
  const { isSmallScreen } = useScreenStatus();
  const {
    showGeoList,
    setShowGeoList,
    DEFAULT_LOCATION,
    mapRef,
    geo,
    geoIsLoading,
    searchValue,
    setSearchValue,
    selectedLocation,
    handleSearchLocation,
    handleSelectLocation,
    handleSubmitLocation,
    setMapCenter,
  } = useLocation();

  useEffect(() => {
    if (!selectedLocation) return;

    mapRef.current?.flyTo({
      center: [selectedLocation.longitude, selectedLocation.latitude],
      zoom: 15,
      duration: 1200,
    });
  }, []);

  const handleMapMove = useCallback((coords) => {
    setMapCenter(coords);
  }, []);

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleOpenSearch = () => {
    if (isSmallScreen) {
      openModal(<SearchLocationModal />, {
        className: "bottomSheet__search",
        size: "full",
      });
      return;
    }

    setIsOpenSearch(true);
  };

  const handleCloseSearch = () => {
    setIsOpenSearch(false);
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) {
      alert("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;

        mapRef.current?.flyTo({
          center: [longitude, latitude],
          zoom: 16,
          duration: 1200,
        });

        setMapCenter({
          latitude,
          longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("دسترسی به موقعیت مکانی رد شد.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("موقعیت در دسترس نیست.");
            break;
          case error.TIMEOUT:
            alert("دریافت موقعیت زمان‌بر شد.");
            break;
          default:
            alert("خطایی رخ داد.");
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 60000,
      },
    );
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div className={styles.title}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="w-100">
                <div className="d-flex align-items-center justify-content-between gap-2">
                  <div className={styles.header_title}>انتخاب موقعیت مکانی</div>

                  <div
                    className="d-flex"
                    aria-hidden="false"
                    onClick={() => closeAll()}
                  >
                    <div
                      className={`${styles.close_icon} cube-font-icon`}
                      data-icon-name="cube-nav-close"
                      data-icon=""
                    />
                  </div>
                </div>

                <div className={styles.header_subtitle}>
                  برای تحویل به‌موقع سفارش، موقعیت را دقیق انتخاب کنید.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
        <div className={styles.content}>
          <div className="h-100 d-flex flex-column">
            {/* موقعیت من */}
            <div
              className={styles.my_location_container}
              onClick={handleMyLocation}
            >
              <div className={styles.my_location}>
                <div className="d-flex" aria-hidden="false">
                  <div
                    className={`${styles.my_location_icon} cube-font-icon`}
                    data-icon-name="cube-location-auto-detect-on"
                    data-icon=""
                  ></div>
                </div>
                <span className={styles.my_location_text}>موقعیت من</span>
              </div>
            </div>

            <div className="h-100 flex-grow-1 position-relative hide-scrollbar">
              {!isOpenSearch ? (
                <div
                  className={`${styles.choose_location} ${!!searchValue && showGeoList ? styles.choose_location__open : ""}`}
                  onClick={handleOpenSearch}
                >
                  <div className={styles.choose_location__search_bar_container}>
                    <div className={styles.choose_location__search_bar}>
                      <div
                        className={styles.search_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.search_icon}>
                          <use href="#searchSearch" />
                        </svg>
                      </div>
                      {isEdit ? (
                        <div className={styles.choose_location_text}>
                          جستجوی استان و شهر ...
                        </div>
                      ) : (
                        <div className={styles.choose_location_text}>
                          {searchValue
                            ? searchValue
                            : selectedLocation?.address ||
                              "جستجوی استان و شهر ..."}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.choose_location} ${!!searchValue && showGeoList ? styles.choose_location__open : ""}`}
                >
                  <div className={styles.choose_location__search_input}>
                    <div className={styles.choose_location__search_input_bar}>
                      <label className={styles.input_label}>
                        <div className={styles.input_container}>
                          <div
                            className={styles.input_icon_container}
                            aria-hidden="false"
                            onClick={handleCloseSearch}
                          >
                            <svg className={styles.input_icon}>
                              <use href="#arrowRight" />
                            </svg>
                          </div>

                          <div className="flex-grow-1">
                            <input
                              autoFocus
                              className={styles.input}
                              type="text"
                              placeholder="جستجوی آدرس"
                              value={searchValue}
                              onChange={(e) =>
                                handleSearchLocation(e.target.value)
                              }
                            />
                          </div>

                          {!!searchValue && (
                            <div
                              className="d-flex"
                              aria-hidden="false"
                              onClick={handleClearSearch}
                            >
                              <svg className={styles.clear_icon}>
                                <use href="#clear" />
                              </svg>
                            </div>
                          )}
                        </div>
                      </label>
                    </div>

                    {showGeoList &&
                      !!searchValue &&
                      !geoIsLoading &&
                      !!geo.length && (
                        <ul className={styles.locations_list}>
                          {geo?.map((item) => (
                            <li
                              key={`${item.latitude}-${item.longitude}`}
                              className={styles.location_item}
                              onClick={() => handleSelectLocation(item)}
                            >
                              <div
                                className={styles.pin_icon_container}
                                aria-hidden="false"
                              >
                                <svg className={styles.pin_icon}>
                                  <use href="#pin" />
                                </svg>
                              </div>

                              <div
                                className={styles.location_address_container}
                              >
                                <p className={styles.location_address_title}>
                                  {item.title}
                                </p>

                                <p className={styles.location_address}>
                                  {item.address}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </div>
              )}

              <Map
                mapRef={mapRef}
                initialCenter={DEFAULT_LOCATION}
                onMove={handleMapMove}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className="d-flex align-items-center bg-white">
          <button className={styles.footer_btn} onClick={handleSubmitLocation}>
            <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
              <span className={styles.footer_text}>ثبت موقعیت مکانی</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectLocationModal;

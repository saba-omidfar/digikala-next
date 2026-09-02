import SearchModal from "@/components/layout/header/modals/searchModal/SearchModal";
import LocationModal from "@/components/layout/header/modals/locationModal/LocationModal";
import SelectLocationModal from "@/components/layout/header/modals/selectLocationModal/SelectLocationModal";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useGetUniversal } from "@/hooks/useGetUniversal";
import { useMobileHeaderScroll } from "@/features/home/hooks/useMobileHeaderScroll";

import { useModal } from "@/contexts/modalContext";
import { useLocation } from "@/contexts/locationContext";

import styles from "./indexMobileHeader.module.css";

export default function IndexMobileHeader() {
  const { openModal, openMobileModal } = useModal();
  const { selectedLocation } = useLocation();
  const { isSmallScreen } = useScreenStatus();
  const { isIndexMobileHeaderScrolledY, isIndexMobileHeaderFixed } =
    useMobileHeaderScroll();
  const { data: topMegaMenuBanners } = useGetUniversal();

  const handleSearchInputClick = () => {
    openModal(<SearchModal />, { name: "search" });
  };

  const modalClickHandler = () => {
    if (selectedLocation) {
      if (isSmallScreen) {
        openMobileModal("location");
      } else {
        openModal(<LocationModal />, {
          name: "location",
          className: "modal__location rounded-large",
          size: "md",
        });
      }

      return;
    }

    openModal(<SelectLocationModal />, {
      name: "select-location",
      className: "modal__select_location rounded-large",
    });
  };

  return (
    <div
      className={styles.mobile_sticky_header_container}
      style={{
        top:
          !isIndexMobileHeaderScrolledY && topMegaMenuBanners?.mobile?.length
            ? 35
            : 0,
        backgroundColor: "rgb(242, 243, 245)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), 300ms",
      }}
    >
      <div
        id="superapp-tabular-container"
        className={styles.mobile_sticky_header}
        style={{
          height: "auto",
        }}
      >
        <div
          id="superapp-tabular-container-content"
          className={styles.header_container}
        >
          <header
            className={`${styles.header} ${
              isIndexMobileHeaderFixed ? styles.fixed_header : ""
            }`}
          >
            <div className="position-relative m-0 w-100">
              <div className="w-100" onClick={handleSearchInputClick}>
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className={styles.base_layout_search}>
                      <div
                        data-cro-id="searchbox-click"
                        className={styles.search_input_container}
                      >
                        <div className={styles.search_input}>
                          <div className={styles.icon_container}>
                            <div
                              data-icon-name="cube-action-search"
                              data-icon="&#xE91F;"
                              className={`${styles.icon} cube-font-icon`}
                            ></div>
                          </div>
                          <span
                            data-cro-id="searchbox-type"
                            className={styles.search_box_type}
                          >
                            <div className={styles.placeholder_container}>
                              <div
                                className={styles.placeholder_text_container}
                              >
                                <span className={styles.placeholder_text}>
                                  جستجو در
                                </span>
                                <div
                                  className={styles.placeholder_logo_container}
                                >
                                  <img
                                    src="/images/brand/typography.svg"
                                    width={61}
                                    height={16}
                                    alt="دیجی‌کالا"
                                    title=""
                                    className={styles.placeholder_logo}
                                  />
                                </div>
                              </div>
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.location_container} ${
                  isIndexMobileHeaderScrolledY
                    ? styles.hide_location_container
                    : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  modalClickHandler();
                }}
              >
                {selectedLocation ? (
                  <div className={styles.location}>
                    <div className={styles.location_text_container}>
                      <div className="d-flex" aria-hidden="false">
                        <div
                          className={`${styles.location_icon} ${
                            selectedLocation
                              ? styles.dark_icon
                              : styles.light_icon
                          } cube-font-icon`}
                          data-icon-name="cube-location-pin"
                          data-icon=""
                        ></div>
                      </div>
                      <p className={styles.location_text}>
                        تحویل به {selectedLocation?.address}
                      </p>
                    </div>
                    <div className="d-flex">
                      <div
                        className={`${styles.chevron_icon} cube-font-icon`}
                        data-icon-name="cube-nav-chevron-down"
                        data-icon=""
                      ></div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={styles.selectcity_container}
                    id="header-location"
                    style={{ color: "rgb(147, 76, 14)" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      modalClickHandler();
                    }}
                  >
                    <div className={styles.selectcity}>
                      <div className="d-flex" aria-hidden="false">
                        <div
                          className={`${styles.location_icon} cube-font-icon`}
                          data-icon-name="cube-location-pin"
                          data-icon=""
                        ></div>
                      </div>
                      <p className={styles.selectcity_title}>انتخاب آدرس</p>
                    </div>
                    <div className="d-flex" aria-hidden="false">
                      <div
                        className={`${styles.location_icon} cube-font-icon`}
                        data-icon-name="cube-nav-chevron-down"
                        data-icon=""
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
}

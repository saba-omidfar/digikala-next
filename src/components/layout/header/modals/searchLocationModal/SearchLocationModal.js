import { useLocation } from "@/contexts/locationContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./searchLocationModal.module.css";

function SearchLocationModal() {
  const { closeModal } = useModal();
  const {
    geo,
    geoIsLoading,
    searchValue,
    setSearchValue,
    handleSearchLocation,
    handleSelectLocation,
  } = useLocation();

  const handleCloseSearch = () => {
    closeModal();
  };
  const handleClearSearch = () => {
    setSearchValue("");
  };

  return (
    <div className={styles.layout}>
      <div className={styles.search_location_container}>
        <div className={styles.search_location}>
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
                  onChange={(e) => handleSearchLocation(e.target.value)}
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
      </div>

      <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
        <div className={styles.content}>
          {!!searchValue && !geoIsLoading && !!geo.length && (
            <ul className={styles.locations_list}>
              {geo?.map((item) => (
                <li
                  key={`${item.latitude}-${item.longitude}`}
                  className={styles.location_item}
                  onClick={() => {
                    handleSelectLocation(item);
                    closeModal();
                  }}
                >
                  <div
                    className={styles.pin_icon_container}
                    aria-hidden="false"
                  >
                    <svg className={styles.pin_icon}>
                      <use href="#pin" />
                    </svg>
                  </div>

                  <div className={styles.location_address_container}>
                    <p className={styles.location_address_title}>
                      {item.title}
                    </p>

                    <p className={styles.location_address}>{item.address}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchLocationModal;

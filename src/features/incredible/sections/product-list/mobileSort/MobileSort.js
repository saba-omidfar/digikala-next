"use client";

import { useModal } from "@/contexts/modalContext";
import { useListing } from "@/contexts/ListingContext";
import { useSearchScrollStatus } from "@/features/search/hooks/useSearchScrollStatus";

import { sortFilters, isFilterActive } from "@/utils/SortFilters";

import FilterModal from "@/features/search/modals/filterModal/FilterModal";
import MobileAdvertisement from "@/features/incredible/sections/product-list/mobileAdvertisement/MobileAdvertisement";

import styles from "./mobileSort.module.css";

export default function MobileSort({
  isIncrediblePage,
  activeFilter,
  setActiveFilter,
}) {
  const { searchpageIsScrolledY } = useSearchScrollStatus();

  const { openModal, openMobileModal } = useModal();
  const {
    data,
    params,
    promotionId,
    filters,
    setFilterExtra,
    clearFilterExtra,
    filtersCount,
    switchFiltersChangeHandler,
    sortDefault,
    totalItems,
  } = useListing();

  const handleClick = ({ filterTitle = "", filter, key }) => {
    if (filterTitle === "فیلترها") {
      setActiveFilter(filterTitle);
      clearFilterExtra();

      openModal(
        <FilterModal
          activeFilter={filterTitle || activeFilter}
          setActiveFilter={setActiveFilter}
        />,
        {
          scope: "listing",
          name: "filter",
        },
      );
    } else {
      setActiveFilter(filter.title);
      setFilterExtra((prev) => ({
        filterId: filter.id,
        filterItem: filter,
        filterKey: filter.key || key,
        filterTitle: filter.title,
        filterOptions: filter.options,
        isOpen: !prev.isOpen,
      }));
      openMobileModal(
        "filter-details",
        {
          activeFilter: filter?.title,
        },
        {
          scope: "listing",
        },
      );
    }
  };

  const changeHandler = (switchFilter) => {
    switchFiltersChangeHandler(switchFilter);
  };

  // if (isLoading) {
  //   return (
  //     <div className={styles.skeleton_container}>
  //       <div className={styles.skeleton}></div>
  //     </div>
  //   );
  // }

  return (
    <div className={promotionId ? styles.sort_margin : ""}>
      <div
        className={`${styles.sort_container} ${
          searchpageIsScrolledY && !isIncrediblePage
            ? styles.sort_fixed_container
            : ""
        }`}
      >
        <div
          className={styles.sort_item_container}
          onClick={() => openMobileModal("mobile-sort", { activeFilter })}
        >
          <div className="position-relative">
            <div className={styles.sort_item}>
              <span>{sortDefault ? sortDefault.title_fa : "مرتب‌سازی:"}</span>
              <div className={styles.sort_icon_container} aria-hidden="false">
                <svg className={styles.icon}>
                  <use href="#sort"></use>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          className="position-relative"
          onClick={() => handleClick({ filterTitle: "فیلترها" })}
        >
          <div
            className={`${styles.sort_item} ${
              filtersCount ? styles.sort_item_active : ""
            }`}
          >
            <span>فیلتر</span>
            <div className={styles.sort_icon_container} aria-hidden="false">
              <svg
                className={`${styles.icon} ${
                  filtersCount ? styles.icon_active : ""
                }`}
              >
                <use href="#filter"></use>
              </svg>
            </div>
          </div>
          {filtersCount !== 0 && (
            <div className={styles.sort_badge}>
              {filtersCount?.toLocaleString("fa-IR")}
            </div>
          )}
        </div>

        <div className={styles.filters_container}>
          {sortFilters(filters, params)?.map((filter, index) => {
            const active = isFilterActive(filter, params);

            switch (filter?.type) {
              case "switch":
                return (
                  <div key={filter.key} className="position-relative">
                    <div
                      className={`${styles.filter_item} ${
                        active ? styles.filter_item_active : ""
                      }`}
                      onClick={() => changeHandler(filter?.key)}
                    >
                      <span>{filter?.title}</span>
                    </div>
                  </div>
                );

              case "nested_list":
                return filter.options.map((option) => {
                  const active = isFilterActive(option, params, "attributes");

                  return (
                    <div key={option.id} className="position-relative">
                      <div
                        className={`${styles.filter_item} ${
                          active ? styles.filter_item_active : ""
                        }`}
                        onClick={() =>
                          handleClick({
                            filter: option,
                            filterTitle: option.title,
                            key: `${filter.key}[${option.id}]`,
                          })
                        }
                      >
                        <span>{option?.title}</span>

                        <div
                          className={styles.chevron_icon_container}
                          aria-hidden="false"
                        >
                          <svg
                            className={`${styles.icon} ${
                              active ? styles.icon_active : ""
                            }`}
                          >
                            <use href="#chevronDown"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                });

              default:
                return (
                  <div key={filter.key} className="position-relative">
                    <div
                      className={`${styles.filter_item} ${
                        active ? styles.filter_item_active : ""
                      }`}
                      onClick={() =>
                        handleClick({
                          filter,
                          filterTitle: filter.title,
                          key: filter.key,
                        })
                      }
                    >
                      <span>{filter?.title}</span>

                      <div
                        className={styles.chevron_icon_container}
                        aria-hidden="false"
                      >
                        <svg
                          className={`${styles.icon} ${
                            active ? styles.icon_active : ""
                          }`}
                        >
                          <use href="#chevronDown"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                );
            }
          })}
        </div>
      </div>
      {totalItems > 0 && (
        <div className={styles.total_items_container}>
          <span className={styles.total_items_title}>
            {totalItems?.toLocaleString("fa-IR")} کالا{" "}
            {data?.category ? `در ${data?.category?.title_fa}` : ""}
          </span>
        </div>
      )}

      <MobileAdvertisement advertisement={data?.advertisement} />
    </div>
  );
}

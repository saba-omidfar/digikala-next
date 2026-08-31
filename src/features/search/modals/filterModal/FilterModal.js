"use client";

import FilterItem from "./FilterItem";
import FilterSwitchItem from "./FilterSwitchItem";
import FilterContent from "@/features/incredible/sections/product-list/productListSidebar/filterContent/FilterContent";
import FilterFooter from "./filterFooter/FilterFooter";

import { useListing } from "@/contexts/ListingContext";
import { useModal } from "@/contexts/modalContext";

import "nouislider/distribute/nouislider.css";
import styles from "./filterModal.module.css";

function FilterModal({ activeFilter }) {
  const { closeModal } = useModal();
  const {
    data,
    filters,
    filterExtra,
    setFilterExtra,
    handleSwitchChange,
    params,
  } = useListing();

  const filterItemClickHandler = ({ filter, key }) => {
    setFilterExtra((prev) => ({
      filterId: filter.id,
      filterItem: filter,
      filterKey: filter.key || key,
      filterTitle: filter.title,
      filterOptions: filter.options,
      isOpen: !(prev.isOpen && prev.filterKey === filter.key),
    }));
  };

  const clearFilterExtra = () => {
    setFilterExtra({
      filterItem: undefined,
      filterKey: null,
      filterTitle: null,
      filterOptions: null,
      isOpen: false,
    });
  };

  return (
    <div className={styles.modal_layout}>
      <div className="flex-grow-1 d-flex flex-column overflow-y-auto">
        <div className={styles.children}>
          <div className={styles.modal_header_container}>
            <div className={styles.modal_close_btn_container}>
              <div
                className="d-flex"
                onClick={() => {
                  !filterExtra.filterKey ? closeModal() : clearFilterExtra();
                }}
                aria-hidden="false"
              >
                {!filterExtra.filterKey ? (
                  <svg className={styles.modal_close_btn}>
                    <use href="#close"></use>
                  </svg>
                ) : (
                  <svg className={styles.modal_arrow_btn}>
                    <use href="#arrowRight"></use>
                  </svg>
                )}
              </div>
            </div>
            <div className={styles.modal_header__title_text}>
              {filterExtra?.filterTitle
                ? filterExtra?.filterTitle
                : activeFilter}
            </div>
          </div>
          <div className={styles.list}>
            {!filterExtra.filterKey && (
              <>
                {data &&
                  filters?.map((filter, index) => {
                    switch (filter.type) {
                      case "switch":
                        return (
                          <FilterSwitchItem
                            key={filter.key}
                            filter={filter}
                            checked={!!params[filter.key]}
                            onChange={handleSwitchChange}
                            isLast={index === filter?.options?.length - 1}
                          />
                        );

                      case "nested_list":
                        return filter.options.map((option) => (
                          <FilterItem
                            key={option.id}
                            filterKey={`${filter.key}[${option.id}]`}
                            filter={option}
                            onClick={() =>
                              filterItemClickHandler({
                                filter: option,
                                key: `${filter.key}[${option.id}]`,
                              })
                            }
                          />
                        ));

                      default:
                        return (
                          <FilterItem
                            key={filter.key}
                            filterKey={filter.key}
                            filter={filter}
                            onClick={() => filterItemClickHandler({ filter })}
                            isLast={index === filter?.options?.length - 1}
                          />
                        );
                    }
                  })}
              </>
            )}
            <FilterContent />
          </div>
        </div>
      </div>
      <FilterFooter />
    </div>
  );
}

export default FilterModal;

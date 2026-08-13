import { useState } from "react";

import { useListing } from "@/contexts/ListingContext";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import FilterPriceContent from "./filterContent/filterPriceContent/FilterPriceContent";
import FilterColorsContent from "@/features/search/modals/filterModal/filterContent/filterColorsContent/FilterColorsContent";
import FilterCategoriesContent from "@/features/search/modals/filterModal/filterContent/filterCategoriesContent/FilterCategoriesContent";

import styles from "./filterMobileContent.module.css";

function FilterMobileContent() {
  const { filterExtra, params, filterCheckboxChangeHandler } = useListing();

  if (!filterExtra.isOpen) return null;

  const [searchTerm, setSearchTerm] = useState("");

  const key =
    typeof filterExtra?.filterKey === "string"
      ? filterExtra?.filterKey
      : filterExtra?.filterKey?.keyCode;

  if (key === "color_palettes") return <FilterColorsContent />;
  // if (key === "categories" || key === "category_list")
  //   return <FilterCategoriesContent />;
  if (key === "price") return <FilterPriceContent />;

  const selectedItems = filterExtra?.filterOptions.filter((option) => {
    const value = String(option.id ?? option.title);

    return params[filterExtra.filterKey]?.some((key) => String(key) === value);
  });

  const isChecked = (filter) => {
    const key = filter.key || filterExtra.filterKey;
    const value = String(filter.id ?? filter.title);

    return !!params?.[key]?.includes(value);
  };

  return (
    <>
      {filterExtra.filterOptions.length > 10 ? (
        <form className={styles.filter_items_form}>
          <label htmlFor="#" className="d-inline-block w-100">
            <div className={styles.filter_items_input_container}>
              {!searchTerm ? (
                <div
                  className={styles.filter_items_input_icon_container}
                  aria-hidden="false"
                >
                  <div
                    data-icon-name="cube-search"
                    data-icon="&#xE91F;"
                    className={`${styles.filter_items_input_icon} cube-font-icon`}
                  ></div>
                </div>
              ) : null}
              <div className="flex-grow-1">
                <input
                  name="search"
                  type="text"
                  value={searchTerm || ""}
                  placeholder={`جستجو در ${filterExtra.filterTitle} ...`}
                  className={styles.filter_items_input}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </div>
              {searchTerm ? (
                <div className="d-flex" onClick={() => setSearchTerm("")}>
                  <div
                    data-icon-name="cube-close"
                    data-icon="&#xE96D;"
                    className={`${styles.clear_icon} cube-font-icon`}
                  ></div>
                </div>
              ) : null}
            </div>
          </label>
        </form>
      ) : null}

      {/* Selected Items By User */}
      {filterExtra?.filterOptions.length > 10 && selectedItems?.length ? (
        <>
          <div className={styles.selected_items_title}>انتخاب‌های شما</div>
          <div className={styles.selected_items_container}>
            {selectedItems?.map(
              (filter) => (
                console.log("filter->", filter),
                (
                  <div
                    key={filter.id}
                    className={styles.selected_item}
                    onClick={() => {
                      filterCheckboxChangeHandler({
                        key: filter.key || filterExtra.filterKey,
                        id: filter.id,
                        title: filter?.title_fa || filter?.title,
                        checked: !isChecked(filter),
                      });
                    }}
                  >
                    <div className="position-relative">
                      <div className={styles.selected_item_chip}>
                        <span>{filter?.title_fa || filter?.title}</span>
                      </div>
                    </div>
                  </div>
                )
              ),
              // <CustomCheckBox
              //   key={index}
              //   id={filter?.id}
              //   label={filter?.title_fa || filter?.title}
              //   engLabel={
              //     filterExtra?.filterKey === "brands" ? filter?.title_en : ""
              //   }
              //   isLast={index === filterExtra?.filterOptions?.length - 1}
              //   checked={isChecked(filter)}
              //   changeHandler={(checked) =>
              //     filterCheckboxChangeHandler({
              //       key: filter.key || filterExtra.filterKey,
              //       id: filter.id,
              //       title: filter.title,
              //       checked,
              //     })
              //   }
              // />
            )}
          </div>
        </>
      ) : null}

      {/* All items */}
      {filterExtra?.filterOptions?.length > 10 && params[key] ? (
        <div className={styles.selected_items_title}>
          همه‌ی {filterExtra.filterTitle}ها
        </div>
      ) : null}

      {filterExtra?.filterOptions
        .filter((item) => !searchTerm || item?.title_fa?.includes(searchTerm))
        .map((filter, index) => (
          <CustomCheckBox
            key={filter?.id}
            id={filter?.id}
            label={filter?.title_fa || filter?.title}
            engLabel={
              filterExtra?.filterKey === "brands" ? filter?.title_en : ""
            }
            isLast={index === filterExtra?.filterOptions?.length - 1}
            checked={isChecked(filter)}
            changeHandler={(checked) =>
              filterCheckboxChangeHandler({
                key: filter.key || filterExtra.filterKey,
                id: filter.id,
                title: filter.title,
                checked,
              })
            }
          />
        ))}
    </>
  );
}
export default FilterMobileContent;

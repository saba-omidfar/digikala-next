import { useState } from "react";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import FilterColorsContent from "@/features/search/modals/filterModal/filterContent/filterColorsContent/FilterColorsContent";
import FilterCategoriesContent from "@/features/search/modals/filterModal/filterContent/filterCategoriesContent/FilterCategoriesContent";
import FilterPriceContent from "@/features/search/modals/filterModal/filterContent/filterPriceContent/FilterPriceContent";

import { useListing } from "@/contexts/ListingContext";

import styles from "./FilterContent.module.css";

export default function FilterContent() {
  const { filterExtra, params, filterCheckboxChangeHandler } = useListing();

  const [searchTerm, setSearchTerm] = useState("");

  const key =
    typeof filterExtra?.filterKey === "string"
      ? filterExtra?.filterKey
      : filterExtra?.filterKey?.keyCode;

  if (key === "color_palettes") return <FilterColorsContent />;
  if (key === "categories") return <FilterCategoriesContent />;
  if (key === "price") return <FilterPriceContent />;

  const selectedItems = filterExtra?.filterOptions?.filter((option) => {
    const value = String(option.id ?? option.title);

    return params[filterExtra.filterKey]?.some((key) => String(key) === value);
  });

  const isChecked = (filter) => {
    const key = filter.key || filterExtra.filterKey;
    const value = String(filter.id ?? filter.title);

    return !!params?.[key]?.includes(value);
  };

  if (!filterExtra.isOpen) return null;

  return (
    <>
      {filterExtra.filterKey !== "categories" &&
      filterExtra.filterOptions?.length > 10 ? (
        <form className={styles.filter_items_form}>
          <label htmlFor="#" className="d-inline-block w-100">
            <div className={styles.filter_items_input_container}>
              {!searchTerm ? (
                <div className={styles.filter_items_input_icon_container}>
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
                  placeholder={`جستجو ${filterExtra.filterTitle} ...`}
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
      {filterExtra?.filterOptions?.length > 10 && selectedItems?.length ? (
        <>
          <div className={styles.selected_items_title}>انتخاب شما</div>
          {selectedItems?.map((item, index) => (
            <CustomCheckBox
              key={`${index}-${item?.key}`}
              id={item?.id}
              label={item?.title || item?.title_fa}
              engLabel={
                filterExtra?.filterKey === "brands" ? item?.title_en : ""
              }
              isLast={index === params[key].length - 1}
              checked={isChecked(item)}
              changeHandler={(checked) =>
                filterCheckboxChangeHandler({
                  key: filter.key || filterExtra.filterKey,
                  id: item.id,
                  title: item.title,
                  checked,
                })
              }
            />
          ))}
        </>
      ) : null}

      {/* All items */}
      {filterExtra.filterKey !== "categories" ? (
        filterExtra?.filterOptions?.length > 10 && params[key] ? (
          <div className={styles.selected_items_title}>
            همه‌ی {filterExtra.filterTitle}ها
          </div>
        ) : null
      ) : (
        ""
      )}

      {filterExtra?.filterOptions
        ?.filter(
          (item) =>
            !searchTerm ||
            item?.title_fa?.includes(searchTerm) ||
            item?.title?.includes(searchTerm),
        )
        ?.map((filter, index) => (
          <div className="w-100" key={`${index}-${filter?.id}`}>
            <CustomCheckBox
              id={filter.id}
              label={filter.title_fa || filter.title}
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
          </div>
        ))}
    </>
  );
}

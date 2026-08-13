import React from "react";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import { useListing } from "@/contexts/ListingContext";

import styles from "./filterBrandsContent.module.css";

function FilterBrandsContent() {
  const {
    filterExtra,
    params,
    searchBrandValue,
    setSearchBrandValue,
    brandCheckboxChangeHandler,
  } = useListing();

  const selectedBrands = filterExtra?.filterOptions.filter((brand) =>
    params.brands?.some((b) => String(b) === String(brand.filterOptionId)),
  );

  return (
    <div className={styles.brands_container}>
      <form className={styles.brands_form}>
        <label htmlFor="#" className="d-inline-block w-100">
          <div className={styles.brands_input_container}>
            {!searchBrandValue ? (
              <div className={styles.brands_input_icon_container}>
                <div
                  data-icon-name="cube-search"
                  data-icon="&#xE91F;"
                  className={`${styles.brands_input_icon} cube-font-icon`}
                ></div>
              </div>
            ) : null}
            <div className="flex-grow-1">
              <input
                name="search"
                type="text"
                value={searchBrandValue}
                placeholder="جستجو برند ..."
                className={styles.brands_input}
                onChange={(event) => setSearchBrandValue(event.target.value)}
              />
            </div>
            {searchBrandValue ? (
              <div className="d-flex" onClick={() => setSearchBrandValue("")}>
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
      {/* Sleceted Brands By User */}
      {params.brands?.length ? (
        <>
          <div className={styles.selected_brands_title}>انتخاب شما</div>
          {selectedBrands?.map((brand, index) => (
            <CustomCheckBox
              key={index}
              id={brand?.id}
              label={brand?.title_fa}
              engLabel={brand?.title_en}
              isLast={index === params.brands.length - 1}
              checked={!!params.brands?.includes(String(brand.id))}
              changeHandler={(checked) =>
                brandCheckboxChangeHandler(String(brand.id), !checked)
              }
            />
          ))}
        </>
      ) : null}

      {/* All Brands */}
      {params.brands?.length ? (
        <div className={styles.selected_brands_title}>همه‌ی برندها</div>
      ) : null}

      {filterExtra?.filterOptions
        .filter(
          (brand) =>
            !searchBrandValue ||
            brand.filterOptionTitle.includes(searchBrandValue),
        )
        .map((filter, index) => (
          <CustomCheckBox
            key={index}
            id={filter?.filterOptionId}
            label={filter?.filterOptionTitle}
            engLabel={filter?.filterOptionTitleEn}
            isLast={index === filterExtra?.filterOptions.length - 1}
            checked={!!params.brands?.includes(String(filter.filterOptionId))}
            changeHandler={(checked) =>
              brandCheckboxChangeHandler(
                String(filter.filterOptionId),
                !checked,
              )
            }
          />
        ))}
    </div>
  );
}

export default FilterBrandsContent;

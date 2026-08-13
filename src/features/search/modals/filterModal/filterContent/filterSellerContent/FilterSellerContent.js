import React from "react";

import CustomCheckBox from "@/components/modules/checkBox/CustomCheckBox";
import { useListing } from "@/contexts/ListingContext";

function FilterSellerContent() {
  const { filterExtra, params, sellerCheckboxChangeHandler } = useListing();

  return (
    <>
      {filterExtra?.filterOptions?.map((filter, index) => (
        <div className="w-100" key={index}>
          <div className="w-100 d-flex align-items-center justify-content-start">
            <CustomCheckBox
              id={filter?.filterOptionId}
              label={filter?.filterOptionTitle}
              engLabel={filter?.filterOptionTitleEn}
              filter={filter}
              isLast={index === filterExtra?.filterOptions.length - 1}
              checked={
                !!params.seller_types?.includes(String(filter.filterOptionId))
              }
              changeHandler={(checked) =>
                sellerCheckboxChangeHandler(
                  String(filter.filterOptionId),
                  !checked,
                )
              }
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default FilterSellerContent;

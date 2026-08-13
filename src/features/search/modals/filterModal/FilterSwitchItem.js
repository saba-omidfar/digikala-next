import React from "react";
import Image from "next/image";

import { useListing } from "@/contexts/ListingContext";
import CustomSwitch from "@/components/modules/customSwitch/CustomSwitch";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./filterSwitchItem.module.css";

function FilterSwitchItem({ filter, caption, isLast }) {
  const { params, switchFiltersChangeHandler } = useListing();
  const { isSmallScreen } = useScreenStatus();

  return (
    <div style={{ width: "100%", padding: isSmallScreen ? "0" : "0 20px" }}>
      <div className="w-100 d-flex align-items-center justify-content-start">
        <div className="flex-grow-1">
          <div
            className={`${styles.filter_modal_sortItem} ${
              !isLast ? styles.filter_modal_sortItem_bb : ""
            }`}
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              <label className={styles.filter_modal_sort_title}>
                <div className="d-flex align-items-center justify-content-start flex-wrap">
                  {filter?.title}
                  {filter?.icon && (
                    <span className="flex-grow-0 me-2">
                      <div className={styles.filter_modal_sortItem_img}>
                        <Image
                          width={18}
                          height={18}
                          src={filter?.icon}
                          alt=""
                          style={{
                            display: "inline-block",
                            objectFit: "contain",
                          }}
                        />
                      </div>
                    </span>
                  )}
                </div>
              </label>
              <label
                htmlFor={filter.key}
                className={styles.filter_modal_switch}
              >
                <CustomSwitch
                  name={filter.key}
                  checked={!!params[filter.key]}
                  onChange={() => switchFiltersChangeHandler(filter.key)}
                />
              </label>
            </div>
            {caption && (
              <div className={styles.filter_modal_switch_caption}>
                {caption}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterSwitchItem;

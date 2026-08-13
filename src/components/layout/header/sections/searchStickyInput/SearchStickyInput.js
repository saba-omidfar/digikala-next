"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { useModal } from "@/contexts/modalContext";
import { useSearchContext } from "@/contexts/searchContext";

import SelectCity from "@/components/layout/header/sections/tobbar/SelectCity";
import SearchModal from "@/components/layout/header/modals/searchModal/SearchModal";
import TopMegamenuBanner from "@/components/layout/header/sections/topMegamenuBanner/TopMegamenuBanner";

import styles from "./searchStickyInput.module.css";

function SearchStickyInput({ isSearchPage, isSearchInputSticky, hasBorder }) {
  const router = useRouter();
  const { openModal, closeModal } = useModal();
  const { searchItemValue, setSearchItemValue } = useSearchContext();

  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const handleSearchInputClick = () => {
    openModal(<SearchModal />);
  };

  useEffect(() => {
    if (query && searchItemValue === "") {
      setSearchItemValue(query);
    }
  }, [query, setSearchItemValue]);

  return (
    <>
      <TopMegamenuBanner />
      <div
        className={styles.header_container}
        id="base_layout_mobile_sticky_header"
      >
        <div>
          <header
            className={styles.header}
            style={{
              borderBottom: hasBorder ? "1px solid #f0f0f1" : "",
              // isSearchPage && isSmallScreen ? "none" : "1px solid #f0f0f1",
            }}
          >
            <div
              className="w-100 position-relative"
              onClick={handleSearchInputClick}
            >
              <div className="w-100">
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className={styles.base_layout_search}>
                      <div className={styles.search_input_container}>
                        <div className={styles.arrow_icon_container}>
                          <div
                            className="d-flex"
                            onClick={() => {
                              closeModal();
                              router.back();
                            }}
                            aria-hidden="false"
                          >
                            <svg className={styles.arrow_icon}>
                              <use href="#arrowRight"></use>
                            </svg>
                          </div>
                        </div>
                        <div
                          id="searchbox-click"
                          className={styles.search_box_container}
                        >
                          <div className={styles.search_box}>
                            {query ? (
                              <div className={styles.search_input}>
                                <div
                                  data-icon-name="cube-close"
                                  data-icon="&#xE91F;"
                                  className={`${styles.search_input_icon} cube-font-icon`}
                                ></div>
                                <span
                                  className={styles.search_box_type_container}
                                  id="searchbox-type"
                                >
                                  <div
                                    className={`${
                                      !query
                                        ? styles.search_box_type_placeholder
                                        : styles.search_box_type_query
                                    }`}
                                  >
                                    {searchItemValue
                                      ? searchItemValue
                                      : "جستجو"}
                                  </div>
                                </span>
                                {searchItemValue && (
                                  <div
                                    className="d-flex"
                                    onClick={() => {
                                      setSearchItemValue("");
                                    }}
                                  >
                                    <div
                                      data-icon-name="cube-close"
                                      data-icon="&#xE907;"
                                      className={`${styles.close_icon} cube-font-icon`}
                                    ></div>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="w-100">
                                <div className={styles.search_input}>
                                  <div className="d-flex">
                                    <div
                                      data-icon-name="cube-search-trend"
                                      data-icon="&#xE91F;"
                                      className={`${styles.search_input_icon} cube-font-icon`}
                                    ></div>
                                  </div>
                                  <span
                                    className={styles.search_box_type_container}
                                    id="searchbox-type"
                                  >
                                    <div className={styles.search_box_type}>
                                      <div
                                        className={
                                          styles.search_box_placeholder_container
                                        }
                                      >
                                        <span
                                          className={
                                            styles.search_box_placeholder_text
                                          }
                                        >
                                          جستجو در
                                        </span>
                                        <div
                                          className={
                                            styles.search_box_placeholder_img_container
                                          }
                                        >
                                          <Image
                                            src="/images/brand/typography.svg"
                                            width={61}
                                            height={16}
                                            style={{
                                              display: "inline-block",
                                              objectFit: "contain",
                                            }}
                                            alt=""
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isSearchInputSticky && !isSearchPage ? <SelectCity /> : ""}
          </header>
        </div>
      </div>
    </>
  );
}

export default SearchStickyInput;

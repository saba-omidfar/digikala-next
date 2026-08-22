"use client";

import { useRef } from "react";
import { useRouter } from "nextjs-toploader/app";

import Link from "next/link";

import SearchResultBox from "@/components/layout/header/sections/searchResult/SearchResultBox";

import { useModal } from "@/contexts/modalContext";
import { useSearchContext } from "@/contexts/searchContext";
import { useAutocomplete } from "@/hooks/useAutocomplete";

import styles from "./searchModal.module.css";

function SearchModal() {
  const router = useRouter();
  const inputRef = useRef(null);
  const { closeModal } = useModal();
  const { searchItemValue, setSearchItemValue } = useSearchContext();

  const { data: digikalaAutocompleteData, isLoading } =
    useAutocomplete(searchItemValue);

  const goToSearchPage = (e) => {
    if (e.keyCode === 13) {
      closeModal();
      router.push(
        `/search?q=${encodeURIComponent(searchItemValue || "").replace(/%20/g, "+")}`,
      );
      closeModal();
    }
  };

  const clearSearchTerm = () => {
    setSearchItemValue("");
    inputRef.current?.focus();
  };

  return (
    <div className={styles.layout}>
      <div className={styles.header_container}>
        <div className={styles.header}>
          <div
            className={styles.close_icon_container}
            onClick={() => closeModal()}
          >
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.close_icon}>
                <use href="#arrowRight"></use>
              </svg>
            </div>
          </div>
          <div className="flex-grow-1">
            <div
              className={styles.search_box_click_container}
              id="searchbox-click"
            >
              <div className={styles.search_box_click}>
                <div className={styles.search_box}>
                  <div className="d-flex" aria-hidden="false">
                    <div
                      className={`${styles.search_icon} cube-font-icon`}
                      data-icon-name="cube-action-search"
                      data-icon=""
                    ></div>
                  </div>
                  <span id="searchbox-type" className={styles.search_box_type}>
                    <label className="d-inline-block w-100">
                      <div className={styles.input_container}>
                        <div className="flex-grow-1">
                          <input
                            type="text"
                            placeholder="جستجو در همه کالاها"
                            autoComplete="off"
                            value={searchItemValue || ""}
                            className={styles.input}
                            ref={inputRef}
                            onChange={(e) => setSearchItemValue(e.target.value)}
                            onKeyDown={(e) => goToSearchPage(e)}
                          />
                        </div>
                      </div>
                    </label>
                  </span>

                  {searchItemValue ? (
                    isLoading ? (
                      <div className="search-input_desktop_loadingDots">
                        <span className="search-input_desktop_loadingDot"></span>
                        <span className="search-input_desktop_loadingDot"></span>
                        <span className="search-input_desktop_loadingDot"></span>
                      </div>
                    ) : (
                      <div className="d-flex" onClick={clearSearchTerm}>
                        <div
                          data-icon-name="cube-nav-close"
                          data-icon=""
                          className={`${styles.clear_icon} cube-font-icon`}
                        ></div>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {searchItemValue && (
        <div className={styles.content}>
          <div>
            <div className="d-flex flex-column">
              <div>
                {digikalaAutocompleteData?.auto_complete?.length
                  ? digikalaAutocompleteData?.auto_complete?.map(
                      (autocomplete, index) => (
                        <SearchResultBox
                          key={`${index} + ${autocomplete?.title}`}
                          data={autocomplete}
                          onClose={closeModal}
                        />
                      ),
                    )
                  : ""}
              </div>
            </div>
          </div>
        </div>
      )}

      {!searchItemValue && (
        <div className={styles.results_container}>
          <div className={styles.search_history}>
            <div className={styles.trending_search}>
              <div className={styles.section_header}>
                <span className={styles.section_title}>جستجوهای پرطرفدار</span>
              </div>
              <div className={styles.chips_container}>
                {digikalaAutocompleteData?.trends?.map((chip) => (
                  <Link
                    key={chip.keyword}
                    href={chip?.url?.uri || "#"}
                    onClick={(e) => {
                      e.preventDefault();
                      closeModal();
                      router.push(chip?.url?.uri);
                    }}
                  >
                    <div className={styles.chip_wrapper}>
                      <div
                        className={styles.trend_icon_container}
                        aria-hidden="false"
                      >
                        <div
                          className={`${styles.trend_icon} cube-font-icon`}
                          data-icon-name="cube-content-trend-up"
                          data-icon=""
                        ></div>
                      </div>
                      <span className={styles.chip_label}>{chip.keyword}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchModal;

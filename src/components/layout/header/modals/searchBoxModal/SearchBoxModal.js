"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import SearchResult from "@/components/layout/header/sections/searchResult/SearchResult";

import { useAutocomplete } from "@/hooks/useAutocomplete";
import { useSearchContext } from "@/contexts/searchContext";
import { useModal } from "@/contexts/modalContext";

import styles from "./searchBoxModal.module.css";

function SearchBoxModal({ searchBoxRef }) {
  const { closeModal } = useModal();
  const { searchItemValue, setSearchItemValue } = useSearchContext();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const { data, isLoading } = useAutocomplete(searchItemValue);

  useEffect(() => {
    if (query) {
      setSearchItemValue(query);
    }
  }, [query]);

  return (
    <>
      <div className={styles.header}>
        <div id="searchbox-click" className={styles.search_box_container}>
          <div className={styles.search_box}>
            <div className="d-lex" aria-hidden="false">
              <svg className={styles.search_icon}>
                <use href="#searchSearch"></use>
              </svg>
            </div>
            <span
              data-cro-id="searchbox-type"
              className="flex-grow-1 position-relative"
            >
              <label className="d-inline-block w-100">
                <div className={styles.search_input_container}>
                  <div className="flex-grow-1">
                    <input
                      className={styles.search_input}
                      type="text"
                      name="search-input"
                      placeholder="جستجو در همه کالاها"
                      autoComplete="off"
                      value={searchItemValue}
                      autoFocus="true"
                      onChange={(e) => setSearchItemValue(e.target.value)}
                    />
                  </div>
                </div>
              </label>
            </span>
            {searchItemValue && isLoading ? (
              <div className="search-input_desktop_loadingDots">
                <span className="search-input_desktop_loadingDot"></span>
                <span className="search-input_desktop_loadingDot"></span>
                <span className="search-input_desktop_loadingDot"></span>
              </div>
            ) : (
              ""
            )}
            {searchItemValue ? (
              <div
                className="d-flex"
                aria-hidden="false"
                onClick={() => setSearchItemValue("")}
              >
                <div
                  className={`${styles.close_icon} cube-font-icon`}
                  data-icon-name="cube-nav-close"
                  data-icon=""
                ></div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {searchItemValue ? (
        <SearchResult />
      ) : (
        <div className={styles.results_container}>
          <div className={styles.search_history}>
            <div className={styles.trending_search}>
              <div className={styles.section_header}>
                <span className={styles.section_title}>جستجوهای پرطرفدار</span>
              </div>
              <div className={styles.chips_container}>
                {data?.trends?.map((chip) => (
                  <Link
                    key={chip.keyword}
                    href={
                      chip.url.url.replace("https://www.digikala.com/", "/") ||
                      "#"
                    }
                    onClick={() => {
                      searchBoxRef.current?.blur();
                      closeModal();
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
            {data?.banner &&
              data?.banner?.map((banner) => (
                <div key={banner.id} className={styles.banner_wrapper}>
                  <Link
                    className={styles.banner_link}
                    target="_blank"
                    href={banner?.url ? banner?.url?.uri : "#"}
                  >
                    <div aria-hidden="false" aria-label={banner.title}>
                      <img
                        className={styles.banner_img}
                        src={banner.image}
                        alt={banner.title}
                        title=""
                      />
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* {isLoading ? (
        <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
          <div className="d-flex flex-column flex-grow-1 hide-scrollbar">
            <div className="pb-3"></div>
          </div>
        </div>
      ) : (
        <>
          {searchItemValue && !isLoading ? (
            <SearchResult searchItemValue={searchItemValue} />
          ) : (
            <div className={styles.results_container}>
              <div className={styles.search_history}>
                <div className={styles.trending_search}>
                  <div className={styles.section_header}>
                    <span className={styles.section_title}>
                      جستجوهای پرطرفدار
                    </span>
                  </div>
                  <div className={styles.chips_container}>
                    {data?.trends?.map((chip) => (
                      <Link
                        key={chip.keyword}
                        href={data?.url ? data?.url?.uri : "#"}
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
                          <span className={styles.chip_label}>
                            {chip.keyword}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )} */}
    </>
  );
}

export default SearchBoxModal;

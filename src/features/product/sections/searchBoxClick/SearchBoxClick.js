import { useAutocomplete } from "@/hooks/useAutocomplete";
import { useSearchContext } from "@/contexts/searchContext";

import SearchSaggestedBox from "@/components/layout/header/sections/searchResult/SearchResultBox";
import SearchSkeleton from "@/features/incredible/sections/product-list/searchSkeleton/SearchSkeleton";

import styles from "./searchBoxClick.module.css";

function SearchBoxClick({
  showSearchBox,
  setShowSearchBox,
  SearchBoxCategories,
}) {
  const { searchItemValue, setSearchItemValue } = useSearchContext();

  const { data, isLoading } = useAutocomplete(searchItemValue);

  if (!showSearchBox) {
    return null;
  }

  return (
    <div className="position-relative">
      <div
        className={styles.searchBox_container}
        onClick={() => setShowSearchBox(false)}
      >
        <div
          className={`${styles.searchBox} ${
            showSearchBox
              ? styles.slideDown_animation
              : styles.slideUp_animation
          } `}
          onClick={(e) => e.stopPropagation()}
        >
          <div id="searchbox-click" className={styles.searchInput_conatiner}>
            <div className={styles.searchInput}>
              <div
                className="d-flex align-items-center justify-content-between"
                style={{ minWidth: "0", height: "36px" }}
              >
                <div className="d-flex" onClick={() => setShowSearchBox(false)}>
                  <div
                    data-icon-name="cube-arrow-right"
                    data-icon="&#xE955;"
                    className={`${styles.arrow_right_icon} cube-font-icon`}
                  ></div>
                </div>
                <div
                  id="searchbox-type"
                  style={{ height: "40px", flexGrow: "1" }}
                >
                  <label
                    htmlFor="search-input"
                    className="w-100 d-inline-block"
                  >
                    <div className={styles.input_container}>
                      <div className="flex-grow-1">
                        <input
                          className={styles.input}
                          type="text"
                          name="search-input"
                          placeholder="جستجو در کالاهای دیجی‌کالا"
                          autoComplete="off"
                          value={searchItemValue}
                          onChange={(event) =>
                            searchItemValue(event.target.value)
                          }
                        />
                      </div>
                    </div>
                  </label>
                </div>
                {searchItemValue?.length ? (
                  <div className="d-flex" onClick={() => searchItemValue("")}>
                    <div
                      data-icon-name="cube-close"
                      data-icon="&#xE907;"
                      className={`${styles.close_icon} cube-font-icon`}
                    ></div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        {searchItemValue?.length ? (
          <div className="w-100 h-100">
            <div className={styles.search_result_container}>
              <div className="pt-2">
                <div
                  className="d-flex align-items-center"
                  style={{ padding: "8px 20px" }}
                >
                  <div className="d-flex ps-3">
                    <div
                      data-icon-name="cube-value-search"
                      data-icon="&#xE91F;"
                      className={`${styles.search_icon} cube-font-icon`}
                    ></div>
                  </div>
                  <p className={styles.searchInput_value}>
                    جستجوی «{searchItemValue}»
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column" style={{ padding: "0 20px" }}>
                <div>
                  <span className="d-flex align-items-center py-2">
                    <div className="d-flex ms-3">
                      <div
                        data-icon-name="cube-#ategory_outline"
                        data-icon="&#xE974;"
                        className={`${styles.category_icon} cube-font-icon`}
                      ></div>
                    </div>
                    <p className={styles.category_title}>
                      {`همه کالاهای ${categories[0]?.categoryTitle}`}
                    </p>
                  </span>
                  {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <SearchSkeleton key={i} />
                      ))
                    : data?.categories?.map((category) => (
                        <SearchBoxCategories
                          key={category.categoryId}
                          category={category}
                          setShowSearchBox={setShowSearchBox}
                          SearchBoxCategories={SearchBoxCategories}
                        />
                      ))}
                </div>
                <div>
                  <div id="searchbox-suggested-search">
                    {data?.categories?.map((category) => (
                      <SearchSaggestedBox
                        key={category.categoryId}
                        keyword={category.categoryKeyword}
                      />
                    ))}
                    {/* <span className={styles.searchbox_suggested}>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex flex-shrink-0 ms-3">
                          <div
                            data-icon-name="cube-value-search"
                            data-icon="&#xE91F;"
                            className={`${styles.search_icon} cube-font-icon`}
                          ></div>
                        </div>
                        <div className="flex-grow-1 text-right">
                          <span
                            className={
                              styles.searchBox_categories_searchInput_value
                            }
                          >
                            {searchItemValue}
                          </span>
                        </div>
                        <div className="d-flex align-items-center flex-shrink-0 me-3">
                          <div
                            data-icon-name="cube-search-place-suggest"
                            data-icon="&#xE958;"
                            className={`${styles.searchPlace_suggest_icon} cube-font-icon`}
                          ></div>
                        </div>
                      </div>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SearchBoxClick;

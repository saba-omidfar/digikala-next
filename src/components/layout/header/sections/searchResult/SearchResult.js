import SearchResultBox from "@/components/layout/header/sections/searchResult/SearchResultBox";

import { useAutocomplete } from "@/hooks/useAutocomplete";
import { useSearchContext } from "@/contexts/searchContext";

function SearchResult() {
  const { searchItemValue } = useSearchContext();
  const { data, isLoading } = useAutocomplete(searchItemValue);

  // if (isLoading)
  //   return (
  //     <div className="d-flex flex-column flex-grow-1 overflow-y-auto">
  //       <div className="d-flex flex-column flex-grow-1 hide-scrollbar">
  //         <div className="pb-3"></div>
  //       </div>
  //     </div>
  //   );

  return (
    <div className="overflow-y-auto hide-scrollbar">
      <div>
        <div className="d-flex flex-column">
          {!Array?.isArray(data) && searchItemValue ? (
            <>
              {/* {data?.advance_links?.map((link, _) => (
            <span className="d-flex align-items-center py-2">
              <div
                className={styles.search_item_icon_container}
                aria-hidden="false"
              >
                <svg className={styles.search_item_icon}>
                  <use href="#categoryOutline"></use>
                </svg>
              </div>
              <p className={styles.search_item_category}>
                {` همه کالاهای ${link?.category?.title_fa}`}
              </p>
            </span>
          ))} */}

              {data?.auto_complete?.map((data, index) => (
                <SearchResultBox
                  key={`${index} - ${data?.title}`}
                  data={data}
                />
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;

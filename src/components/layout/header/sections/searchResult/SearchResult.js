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

  if (!data) return null;

  return (
    <div className="overflow-y-auto hide-scrollbar">
      <div>
        <div className="d-flex flex-column">
          {!Array?.isArray(data) && searchItemValue ? (
            <>
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

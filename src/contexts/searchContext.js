"use client";

import { useState } from "react";
import { createContext, useContext } from "react";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchItemValue, setSearchItemValue] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchItemValue,
        setSearchItemValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => useContext(SearchContext);

"use client";
import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useModal } from "@/contexts/modalContext";

import SearchBoxModal from "@/components/layout/header/modals/searchBoxModal/SearchBoxModal";

import styles from "./searchInput.module.css";

function SearchInput() {
  const searchBoxRef = useRef(null);
  const { openModal } = useModal();

  const searchParams = useSearchParams();
  const query = searchParams.get("q");

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div
      ref={searchBoxRef}
      className="d-flex justify-content-between align-items-center"
    >
      <div className={styles.layout_search}>
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
                      type="text"
                      name="search-input"
                      placeholder={query ? query : "جستجو"}
                      autoComplete="off"
                      value={searchTerm}
                      className={styles.search_input}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={() => {
                        openModal(
                          <SearchBoxModal searchBoxRef={searchBoxRef} />,
                          {
                            className: "modal__search_desktop",
                            name: "search-box-click",
                            anchorId: "searchbox-click",
                            anchorRef: searchBoxRef,
                          },
                        );
                      }}
                    />
                  </div>
                </div>
              </label>
            </span>
            <span className={styles.shortcut_box} aria-hidden="true">
              Ctrl+K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;

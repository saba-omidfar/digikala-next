"use client";
import { useState, useEffect, useRef } from "react";

import { useParams } from "next/navigation";

import FilterSwitchItem from "@/features/search/modals/filterModal/FilterSwitchItem";
import FilterItem from "@/features/search/modals/filterModal/FilterItem";
import SidebarSkeleton from "./SidebarSkeleton";
import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";
import SidebarLoading from "./sidebarLoading/SidebarLoading";

import { useHeaderScroll } from "@/components/layout/header/hooks/useHeaderScroll";

import { useListing } from "@/contexts/ListingContext";

import useScreenStatus from "@/hooks/useScreenStatus";
import { useGetProductProviders } from "@/hooks/useProvidersProducts";

import styles from "./productListSidebar.module.css";

export default function ProductListSidebar() {
  const { categoryCode } = useParams();

  const { isSmallScreen } = useScreenStatus();
  const { data: productsProviders } = useGetProductProviders(categoryCode);

  const {
    data,
    filters,
    isLoading,
    params,
    filterExtra,
    setFilterExtra,
    hasNonSortFilters,
    removeAllFilters,
    handleSwitchChange,
  } = useListing();

  const sidebarRef = useRef(null);

  const [fade, setFade] = useState({
    top: 0,
    bottom: 1,
  });

  const { hideMenuOnTop } = useHeaderScroll();

  useEffect(() => {
    const el = sidebarRef.current;

    if (!el) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;

      const isTop = scrollTop <= 0;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 1;

      setFade({
        top: isTop ? 0 : 1,
        bottom: isBottom ? 0 : 1,
      });
    };

    handleScroll();

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const filterItemClickHandler = ({ filter, key }) => {
    setFilterExtra((prev) => ({
      filterId: filter.id,
      filterItem: filter,
      filterKey: filter.key || key,
      filterTitle: filter.title,
      filterOptions: filter.options,
      isOpen: !prev.isOpen,
    }));
  };

  if (isSmallScreen) return null;

  return (
    <section className={styles.product_list_sidebar_container}>
      <div
        className={styles.product_list_sidebar}
        style={{
          top: hideMenuOnTop ? 90 : 130,
        }}
      >
        {/* {isLoading ? (
          ""
        ) : (
          <>
            {data?.related_search_words && (
              <div className={styles.related_search_container}>
                <div className={styles.related_search_title}>
                  جستجو‌های مرتبط
                </div>

                {data.related_search_words.map((word) => (
                  <div key={word} className={styles.related_search_word}>
                    <a
                      className={styles.related_search_link}
                      href={`/search/?q=${word}`}
                    >
                      <svg className={styles.search_icon}>
                        <use href="#searchSearch" />
                      </svg>

                      <div className={styles.related_search_word_title}>
                        {word}
                      </div>

                      <svg className={styles.chevron_icon}>
                        <use href="#chevronLeft" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </>
        )} */}
        <div
          className={styles.sidebar}
          ref={sidebarRef}
          style={{
            maxHeight: `calc(100vh - ${hideMenuOnTop ? 108 : 145}px)`,
          }}
        >
          {isLoading ? (
            <SidebarLoading />
          ) : (
            <div>
              {/* sticky wrapper */}
              {filters && (
                <div className={styles.sticky_sidebar}>
                  {/* {productsProviders?.sideBarMenu?.map((product, index) => (
                    <VerticalProductCard
                      key={product?.id}
                      index={index}
                      product={product}
                      linkClassName={styles.product_link}
                      imgContainerClassName={styles.product_img_container}
                      isVertical
                      hasNoRating
                    />
                  ))} */}

                  {isLoading ? (
                    <SidebarSkeleton />
                  ) : (
                    <>
                      <div className={styles.sidebar_title}>
                        <div className="w-100 d-flex align-items-center justify-content-start">
                          <div className="flex-grow-1">فیلترها</div>

                          {hasNonSortFilters && (
                            <button
                              className={styles.sidebar_filter_delete_btn}
                              onClick={removeAllFilters}
                            >
                              حذف فیلتر‌ها
                            </button>
                          )}
                        </div>
                      </div>

                      <div>
                        {filters?.map((filter) => {
                          switch (filter.type) {
                            case "switch":
                              return (
                                <FilterSwitchItem
                                  key={filter.key}
                                  filter={filter}
                                  checked={!!params[filter.key]}
                                  onChange={handleSwitchChange}
                                />
                              );

                            case "nested_list":
                              return filter.options.map((option) => (
                                <FilterItem
                                  key={option.id}
                                  filterKey={`${filter.key}[${option.id}]`}
                                  filter={option}
                                  onClick={() =>
                                    filterItemClickHandler({
                                      filter: option,
                                      key: `${filter.key}[${option.id}]`,
                                    })
                                  }
                                />
                              ));

                            default:
                              return (
                                <FilterItem
                                  key={filter.key}
                                  filterKey={filter.key}
                                  filter={filter}
                                  onClick={() =>
                                    filterItemClickHandler({ filter })
                                  }
                                />
                              );
                          }
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}
              <div className={styles.padding_bottom}></div>
            </div>
          )}
        </div>
        <div
          aria-hidden="true"
          className={styles.filter_panel__top_border}
        ></div>
        <div
          aria-hidden="true"
          className={styles.filter_panel__top_fade}
          style={{ opacity: fade.top }}
        ></div>
        <div
          aria-hidden="true"
          className={styles.filter_panel__bottom_fade}
          style={{ opacity: fade.bottom }}
        ></div>
      </div>
    </section>
  );
}

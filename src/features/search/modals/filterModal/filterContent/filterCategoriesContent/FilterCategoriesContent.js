"use client";

import CategoryItem from "./categoryItem/CategoryItem";

import useGetCategoryTree from "@/features/search/hooks/useGetCategoryTree";
import useCategoryNavigation from "@/features/search/hooks/useCategoryNavigation";
import { useListing } from "@/contexts/ListingContext";

import styles from "./filterCategoriesContent.module.css";

export default function FilterCategoriesContent() {
  const { data: categoryTree, isLoading } = useGetCategoryTree();
  const { data, filterExtra, categoryCode } = useListing();

  const {
    activeCategory,
    breadcrumb,
    categories,
    isCategoryPage,
    navigateToCategory,
  } = useCategoryNavigation({
    categoryTree,
    categoryCode,
    searchCategoryId: data?.query_attributes?.category_ids?.[0],
    categoryOptions: data?.filters?.categories?.options ?? [],
  });

  if (
    filterExtra.filterKey === "categories" &&
    activeCategory &&
    categories.length === 0
  ) {
    return null;
  }

  return (
    <>
      <div>
        <div className="w-100">
          <div className="w-100 d-flex align-items-start justify-content-start">
            <div className="mt-2.5 lg:mt-3">
              <span className="px-2"></span>
            </div>
            <div className={styles.categories_title_container}>
              <div className={styles.categories_title}>همه کالاها</div>
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.check_icon}>
                  <use href="#done"></use>
                </svg>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div>
        <div className="w-100">
          {breadcrumb.map((item, index) => (
            <div
              key={item.id}
              style={{ paddingRight: index * 16 }}
              onClick={() => navigateToCategory(item)}
            >
              <div className="w-100">
                <div className="w-100 d-flex align-items-center justify-content-start">
                  <div className={styles.tree_item}>
                    <div
                      className={
                        item.isExpanded
                          ? styles.tree_item_show_child
                          : styles.chevron_icon_container
                      }
                    >
                      <svg className={styles.chevron_icon}>
                        <use href="#chevronLeft" />
                      </svg>
                    </div>
                  </div>

                  <div className={styles.categories_title_container}>
                    <div className={styles.categories_title}>
                      {item.title_fa}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            style={{
              paddingRight: breadcrumb.length * 16,
            }}
          >
            <div className="w-100">
              {isCategoryPage &&
                categories.map((item) => (
                  <CategoryItem
                    key={item.id}
                    item={item}
                    navigateToCategory={navigateToCategory}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

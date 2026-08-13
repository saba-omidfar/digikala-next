"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useAutocomplete } from "@/hooks/useAutocomplete";
import { useListing } from "@/contexts/ListingContext";

import styles from "./selectCategory.module.css";

function SelectCategory() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("q");

  const { data: autoCompleteData } = useAutocomplete(searchTerm);
  const { setCategoryId } = useListing();

  const goToSearchPage = ({ category }) => {
    setCategoryId(category?.category?.id);
    const categoryCode = category?.category?.code || "";
    router.replace(
      `/search/${categoryCode}/?categoryCode=${categoryCode}&q=${encodeURIComponent(category?.keyword)}`,
    );
  };

  if (!autoCompleteData?.categories) return;

  return (
    <div className={styles.categories_container_padding}>
      <div className={styles.categories_container}>
        <div className="d-flex justify-content-between flex-wrap align-items-center">
          <div className="d-flex">
            <div className={styles.all_cat_icon_container}>
              <div className="d-flex">
                <div
                  data-icon-name="cube-cat-all"
                  data-icon="&#xE974;"
                  className={`${styles.all_cat_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
            <span className={styles.select_category_title}>
              برای نتایج دقیق‌تر یک دسته‌بندی انتخاب کنید
            </span>
          </div>
        </div>
        <div className={styles.all_categories_container}>
          {autoCompleteData?.categories?.map((category) => (
            <div
              key={category?.keyword}
              className={styles.category_container}
              onClick={() => goToSearchPage({ category })}
            >
              <div className="d-flex">
                <span className={styles.category_title}>
                  {category?.keyword}
                </span>
                <span className={styles.category_subtitle}>
                  در دسته {category?.category?.title_fa}
                </span>
              </div>
              <div className={styles.chevron_icon_container}>
                <div
                  data-icon-name="cube-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.chevron_icon} cube-font-icon`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectCategory;

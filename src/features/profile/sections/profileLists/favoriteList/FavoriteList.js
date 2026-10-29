"use client";

import FavoriteProduct from "@/features/profile/sections/profileLists/favoriteList/favoriteProduct/FavoriteProduct";
import FavoriteListLoading from "./FavoriteListLoading";

import { useFavoriesProducts } from "@/features/profile/hooks/useLists";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./favoriteList.module.css";

export default function FavoriteList() {
  const { data, refetch, isLoading, sort, setSort } = useFavoriesProducts();

  return (
    <li>
      {isLoading ? (
        <div className={styles.loading_container}>
          <FavoriteListLoading />
        </div>
      ) : (
        <div className={styles.favorite_list_content}>
          {data?.products?.length ? (
            <div id="plpLayoutContainer" className={styles.favorite_list}>
              <section className="w-100 flex-grow-1 position-relative">
                <div>
                  <div className={styles.favorites_list_header}>
                    <div className={styles.favorites_list_header_title}>
                      <div
                        className={styles.sort_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.sort_icon}>
                          <use href="#sort"></use>
                        </svg>
                      </div>
                      مرتب سازی:
                    </div>
                    <div className={styles.sort_options}>
                      {data?.sort_options?.map((sortOption) => (
                        <div
                          key={sortOption.id}
                          data-cro-id="plp-sort-option"
                          className={`${styles.sort_option} ${
                            sort === sortOption.id
                              ? styles.sort_option_active
                              : ""
                          }`}
                          onClick={() => setSort(sortOption.id)}
                        >
                          {sortOption.title_fa}
                        </div>
                      ))}
                    </div>
                    <div className={styles.favorite_list_count}>
                      {toPersianDigits(data?.products?.length)} کالا
                    </div>
                  </div>
                </div>
                <div className="d-flex w-100 h-100 flex-coumn">
                  <div className="w-100">
                    <div className="d-flex flex-wrap">
                      {data?.products?.map((product) => (
                        <FavoriteProduct
                          key={product.id}
                          product={product}
                          refetch={refetch}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            ""
          )}
          {!data?.products?.length ? (
            <div className={styles.list_empty_container}>
              <div className={styles.list_empty}>
                <div
                  role="img"
                  aria-hidden="false"
                  aria-label="لیست علاقه‌مندی‌های شما خالی است."
                  className={styles.list_empty_img_container}
                >
                  <img
                    className={styles.list_empty_img}
                    alt="لیست علاقه‌مندی‌های شما خالی است."
                    title=""
                    src="https://www.digikala.com/statics/img/svg/favorites-list-empty.svg"
                  />
                </div>
              </div>
              <div className={styles.list_empty_title}>
                لیست علاقه‌مندی‌های شما خالی است.
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </li>
  );
}

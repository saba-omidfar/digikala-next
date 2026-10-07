"use client";
import { useState, useEffect } from "react";

import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

import {
  useOrders,
  useOrdersTabs,
  useReturns,
  useSearchOrders,
} from "@/features/profile/hooks/useOrders";

import toPersianDigits from "@/utils/toPersianDigits";

import CircleLoading from "@/components/modules/circleLoading/CircleLoading";
import OrderItem from "./orderItem/OrderItem";
import ReturnItem from "./returnItem/ReturnItem";
import Pagination from "@/features/product/sections/pagination/Pagination";

import styles from "./profileOrders.module.css";

export default function ProfileOrders() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(
    searchParams.get("q") || "",
  );

  const activeTab = searchParams.get("activeTab") || "in_progress";
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data: tabs } = useOrdersTabs();
  const { data: ordersData, isLoading: ordersLoading } = useOrders();
  const { data: returnsData, isLoading: returnsLoading } = useReturns();
  const { data: searchData, isLoading: searchLoading } = useSearchOrders({
    activeTab,
    q: debouncedSearch,
  });

  console.log("searchData =>", searchData);

  const isReturnedTab = activeTab === "returned";

  const items = isReturnedTab
    ? returnsData?.items || []
    : ordersData?.items || [];

  const isLoading = isReturnedTab ? returnsLoading : ordersLoading;

  const totalItems = isReturnedTab
    ? returnsData?.pager?.total_items || 0
    : ordersData?.pager?.total_items || 0;

  const handleTabClick = (key) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("activeTab", key);
    params.set("page", "1");

    router.push(`/profile/orders/?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    router.push(`/profile/orders/?${params.toString()}`);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const value = searchValue.trim();
      setDebouncedSearch(value);

      const params = new URLSearchParams(searchParams.toString());

      params.set("activeTab", activeTab);

      if (value) {
        params.set("search", "true");
        params.set("q", value);
      } else {
        params.delete("search");
        params.delete("q");
      }

      params.delete("page");

      const newUrl = `/profile/orders/?${params.toString()}`;

      if (newUrl !== `/profile/orders/?${searchParams.toString()}`) {
        router.replace(newUrl, { scroll: false });
      }
    }, 700);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <>
      {isSearchOpen || searchData?.orders?.length ? (
        <div className={styles.search_container}>
          <div className={styles.search_header_container}>
            <label className="w-100 d-inline-block">
              <div className={styles.search_input_container}>
                <div
                  className={styles.search_icon_container}
                  aria-hidden="false"
                >
                  <svg className={styles.search_icon}>
                    <use href="#searchSearch"></use>
                  </svg>
                </div>

                <div className="flex-grow-1">
                  <input
                    className={styles.search_input}
                    placeholder="عنوان کالا یا شماره سفارش"
                    autoComplete="off"
                    type="text"
                    name="q"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>

                {searchValue ? (
                  <div
                    className="d-flex"
                    aria-hidden="false"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchValue("");
                    }}
                  >
                    <svg className={styles.clear_icon}>
                      <use href="#clear"></use>
                    </svg>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </label>
          </div>
          {!searchValue ? (
            <div className={styles.empty_search_container}>
              <div
                role="img"
                aria-hidden="false"
                aria-label="عبارتی برای جستجو وارد نمایید"
                className={styles.search_img_container}
              >
                <img
                  className={styles.search_img}
                  width="115"
                  height="115"
                  alt="عبارتی برای جستجو وارد نمایید"
                  title=""
                  src="https://www.digikala.com/statics/img/svg/search.svg"
                />
              </div>
            </div>
          ) : (
            <>
              {searchLoading ? (
                <CircleLoading />
              ) : searchData?.orders?.length ? (
                <div className={styles.search_orders_container}>
                  {isReturnedTab
                    ? searchData?.orders?.map((order) => (
                        <ReturnItem key={order.id} order={order} />
                      ))
                    : searchData?.orders?.map((order) => (
                        <OrderItem key={order.order_code} order={order} />
                      ))}
                </div>
              ) : (
                <div className={styles.not_found_container}>
                  <div
                    className={styles.not_found_img_container}
                    role="img"
                    aria-hidden="false"
                    aria-label="سفارشی یافت نشد"
                  >
                    <img
                      className={styles.not_found_img}
                      alt="سفارشی یافت نشد"
                      title=""
                      src="https://www.digikala.com/statics/img/svg/plp/not-found.svg"
                    />
                  </div>
                  <div className={styles.not_found_content}>
                    <div className={styles.not_found_title}>
                      <div
                        className={styles.info_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.info_icon}>
                          <use href="#infoFill"></use>
                        </svg>
                      </div>
                      سفارشی با این مشخصات پیدا نکردیم
                    </div>
                    <div className={styles.not_found_subtitle}>
                      پیشنهاد می‌کنیم شماره سفارش یا کلمه مورد نظر را تغییر دهید
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div>
          <div className={styles.profile_content}>
            <div className={styles.profile_header_container}>
              <div className={styles.profile_header}>
                <div className="d-flex align-items-center flex-grow-1">
                  <p className={styles.profile_title}>
                    <span className="position-relative">تاریخچه سفارشات</span>
                  </p>
                </div>
              </div>

              <div
                className={styles.search_btn_container}
                onClick={() => setIsSearchOpen(true)}
              >
                <div className={styles.search_btn}>
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.search_icon}>
                      <use href="#searchSearch"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.mobile_search_container}>
              <div className="w-100">
                <div className={styles.search_header_container}>
                  <label className="w-100 d-inline-block">
                    <div className={styles.search_input_container}>
                      <div
                        className={styles.search_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.search_icon}>
                          <use href="#searchSearch"></use>
                        </svg>
                      </div>
                      <div className="flex-grow-1">
                        <input
                          className={styles.search_input}
                          placeholder="جستجو در سفارش‌ها"
                          autoComplete="off"
                          type="text"
                          name="q"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                      </div>

                      {searchValue ? (
                        <div
                          className="d-flex"
                          aria-hidden="false"
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchValue("");
                          }}
                        >
                          <svg className={styles.clear_icon}>
                            <use href="#clear"></use>
                          </svg>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <ul className={styles.tabs_container}>
                {tabs &&
                  Object.entries(tabs).map(([key, tab]) => (
                    <li
                      key={key}
                      className={`${styles.tab} ${
                        activeTab === key ? styles.tab_active : ""
                      }`}
                      data-cro-id="profile-history-menu"
                      onClick={() => handleTabClick(key)}
                    >
                      <div className="d-flex align-items-center">
                        <div className={styles.tab_title}>{tab.title}</div>

                        {key !== "in_progress" ? (
                          <div
                            className={`${styles.tab_number_badge} ${
                              activeTab === key
                                ? styles.tab_active_number_badge
                                : ""
                            }`}
                          >
                            {toPersianDigits(tab.count)}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </li>
                  ))}
              </ul>

              <ul className={styles.orders_content}>
                {items?.length ? (
                  <li>
                    <div className={styles.orders}>
                      {isReturnedTab
                        ? items?.map((order) => (
                            <ReturnItem key={order.id} order={order} />
                          ))
                        : items?.map((order) => (
                            <OrderItem key={order.order_code} order={order} />
                          ))}
                    </div>
                  </li>
                ) : (
                  <li>
                    {isLoading ? (
                      <CircleLoading />
                    ) : (
                      <div className={styles.order_empty_container}>
                        <div
                          role="img"
                          aria-hidden="false"
                          aria-label="empty"
                          className={styles.order_empty_img_container}
                        >
                          <img
                            className={styles.order_empty_img}
                            alt="empty"
                            src="https://www.digikala.com/statics/img/svg/profile/order-empty.svg"
                          />
                        </div>

                        <div className={styles.order_empty_title}>
                          هنوز هیچ سفارشی ندادید
                        </div>
                      </div>
                    )}
                  </li>
                )}
              </ul>
            </div>

            {totalItems > 10 && (
              <Pagination
                className={styles.pagination_border}
                totalItems={totalItems}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                itemsPerPage={10}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}

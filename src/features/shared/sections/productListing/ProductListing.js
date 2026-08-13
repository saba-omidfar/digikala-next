"use client";

import { useState } from "react";

import ProductList from "@/features/incredible/sections/product-list/productList/ProductList";
import SelectCategory from "@/features/search/sections/selectCategory/SelectCategory";
import SellerSection from "@/features/shared/sections/productListing/sellerSection/SellerSection";

import useScreenStatus from "@/hooks/useScreenStatus";
import useSearchPage from "@/features/search/hooks/useSearchPage";
import { useGetUniversal } from "@/hooks/useGetUniversal";

import styles from "./productListing.module.css";

export default function ProductListing({
  mobileClassname = "",
  desktopClassname = "",
  desktopNavClassname = "",
  mobileNavClassname = "",
  isPoromotionSearchPage,
}) {
  const { isSmallScreen } = useScreenStatus();
  const { data: topMegaMenuBanners } = useGetUniversal();
  const { data, sellerCode, categoryCode, promotionId, searchTerm } =
    useSearchPage();

  const [activeFilter, setActiveFilter] = useState("فیلترها");

  return (
    <div
      className={styles.container}
      style={{
        paddingTop: topMegaMenuBanners ? (isSmallScreen ? 0 : 168) : 0,
      }}
    >
      {(promotionId || isPoromotionSearchPage) && (
        <div id="base_layout_desktop_static_header" className="w-100">
          <div>
            <div className={styles.promotion_banner__special}>
              <div className={styles.promotion_banner}>
                <div
                  aria-hidden="true"
                  aria-label=""
                  className={styles.promotion_img_container}
                >
                  <img
                    className={styles.promotion_img}
                    src="/images/svg/plp/promotions/specialSell.svg"
                    alt=""
                    title=""
                  />
                </div>
              </div>
              <div className={styles.promotion_text}>
                {data?.promotion?.title_fa ||
                  "پیشنهادهای شگفت‌انگیز, تخفیف و حراج"}
              </div>
            </div>
          </div>
        </div>
      )}

      {sellerCode && isSmallScreen ? (
        <SellerSection seller={data?.seller} />
      ) : (
        ""
      )}

      <main className={`${isSmallScreen ? mobileClassname : desktopClassname}`}>
        {!isSmallScreen && !categoryCode && searchTerm && <SelectCategory />}
        {sellerCode && !isSmallScreen ? (
          <SellerSection seller={data?.seller} />
        ) : (
          ""
        )}

        <ProductList
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          desktopNavClassname={desktopNavClassname}
          mobileNavClassname={mobileNavClassname}
        />
      </main>
    </div>
  );
}

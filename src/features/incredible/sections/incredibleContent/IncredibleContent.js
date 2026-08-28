"use client";

import IncredibleTopSlider from "@/features/incredible/sections/incredibleTopSlider/IncredibleTopSlider";
import IncredibleOffersDealOfTheDay from "@/features/incredible/sections/incredibleOffersDealOfTheDay/IncredibleOffersDealOfTheDay";
import IncredibleProductsSlider from "@/features/incredible/sections/incredibleProductsSlider/IncredibleProductsSlider";
import Categories from "@/features/incredible/sections/categories/Categories";
import FreshIncredibleOffers from "@/components/sections/freshIncredibleOffers/FreshIncredibleOffers";
import AllFreshIncredibleOffers from "@/features/incredible/sections/allFreshIncredibleOffers/AllFreshIncredibleOffers";
import LoadingModal from "@/features/shared/modals/loadingModal/LoadingModal";

import { useGetIncredibleOffers } from "@/features/incredible/hooks/useIncredibleOffers";
import { useGetUniversal } from "@/hooks/useGetUniversal";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./incredibleContent.module.css";

export default function IncredibleContent({ categoryId }) {
  const { isSmallScreen } = useScreenStatus();
  const { data, isLoading } = useGetIncredibleOffers({ categoryId });
  const { data: topMegaMenuBanners } = useGetUniversal();

  if (isLoading) {
    return (
      <div className="cart_overlay">
        <div className="page_loading_container">
          <LoadingModal />
        </div>
      </div>
    );
  }

  return (
    <div
      className={styles.container}
      style={{ paddingTop: isSmallScreen ? 0 : topMegaMenuBanners ? 168 : 108 }}
    >
      <main
        className={`${styles.layout_Desktop__container} ${styles.layout_Desktop__content_full_width}`}
      >
        <div className={styles.header__amazing}></div>

        <IncredibleTopSlider slides={data?.incredible_banner_slider} />

        {data?.deal_of_the_day_products?.products?.length ? (
          <IncredibleOffersDealOfTheDay
            products={data?.deal_of_the_day_products?.products}
            title={data?.deal_of_the_day_products?.title}
          />
        ) : (
          ""
        )}

        {data?.main_categories?.length ? (
          <Categories categories={data?.main_categories} />
        ) : (
          ""
        )}

        {data?.running_out_incredible_products?.products?.length ? (
          <IncredibleProductsSlider
            products={data?.running_out_incredible_products?.products}
            title={data?.running_out_incredible_products?.title}
          />
        ) : (
          ""
        )}

        {data?.lightening_deal_products?.products?.length ? (
          <IncredibleProductsSlider
            products={data?.lightening_deal_products?.products}
            title={data?.lightening_deal_products?.title}
          />
        ) : (
          ""
        )}

        {data?.teasing_incredible_products?.products?.length ? (
          <FreshIncredibleOffers
            marginStyle={{ marginTop: "16px" }}
            patternStyle={{
              background:
                "url(/images/svg/typography/incrediblePattern.svg) left center no-repeat",
            }}
            discountPercent={
              data?.teasing_incredible_products?.discount_percent
            }
            products={data?.teasing_incredible_products?.products}
            productsCount={data?.teasing_incredible_products?.products_count}
            timer={data?.teasing_incredible_products?.timer}
            backgroundGradiant="linear-gradient(135deg,rgba(239,57,78,.1) 0,rgba(242,242,242,0) 100%)"
            seeMoreLink={data?.teasing_incredible_products?.see_more_url?.uri}
            isTeasingIncredible
          />
        ) : (
          ""
        )}

        {data?.incredible_products_list ? (
          <AllFreshIncredibleOffers isIncredibleTeasing />
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

"use client";

import SectionHeaderMobile from "@/features/brand-landing/sections/sectionHeaderMobile/SectionHeaderMobile";
import SectionHeaderDesktop from "@/features/brand-landing/sections/sectionHeaderDesktop/SectionHeaderDesktop";
import MainTopSlider from "@/features/shared/sections/mainTopSlider/MainTopSlider";
import TopBanner from "@/features/brand-landing/sections/topBanner/TopBanner";
import MiddleBanners from "@/features/brand-landing/sections/middleBanners/MiddleBanners";
import Banners from "@/features/brand-landing/sections/banners/Banners";
import CarouselProducts from "@/features/landing/sections/carouselProducts/CarouselProducts";

import { useListing } from "@/contexts/ListingContext";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./brandLandingContent.module.css";

export default function BrandLandingMobileContent() {
  const { data, isLoading } = useListing();
  const { isSmallScreen } = useScreenStatus();

  if (isLoading) return null;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {isSmallScreen ? (
          <SectionHeaderMobile
            premiumBrand={data?.premium_brand}
            headerBanners={data?.header_banners?.[0]}
            brandTitle={data?.brand}
            menuUrls={data?.menu_urls}
          />
        ) : (
          <SectionHeaderDesktop
            premiumBrand={data?.premium_brand}
            headerBanners={data?.header_banners?.[0]}
            brandTitle={data?.brand}
            menuUrls={data?.menu_urls}
          />
        )}

        <div className={styles.content}>
          {data?.hero_banners?.length && (
            <MainTopSlider slides={data?.hero_banners} />
          )}

          {data?.top_banners?.length &&
            data?.top_banners?.map((banner, index) => (
              <TopBanner key={index} banner={banner} />
            ))}

          {data?.top_second_banners?.length && (
            <Banners banners={data?.top_second_banners} />
          )}

          {data?.chosen_products && (
            <CarouselProducts
              data={data?.chosen_products}
              className="m-0 p-0"
              linkClassName={styles.product_link}
              hasNotSeeMoreUlr
            />
          )}

          {data?.middle_right_banners?.length &&
            data?.middle_second_banners?.length && (
              <MiddleBanners
                middleRightBanners={data?.middle_right_banners}
                middleSecondtBanners={data?.middle_second_banners}
              />
            )}

          {data?.middle_banners?.length && (
            <Banners
              banners={data?.middle_banners}
              gridTemplateColumns={`repeat(${isSmallScreen ? 1 : data?.middle_banners?.length}, minmax(0, 1fr))`}
              bannerImgContainer={styles.banner_img_container}
            />
          )}

          {data?.newest_products && (
            <CarouselProducts
              data={data?.newest_products}
              className="m-0 p-0"
              seeMoreUrlColor="#1672dd"
            />
          )}

          {data?.best_selling_products && (
            <CarouselProducts
              data={data?.best_selling_products}
              className="m-0 p-0"
              seeMoreUrlColor="#1672dd"
            />
          )}

          {data?.bottom_banners?.length && (
            <Banners
              banners={data?.bottom_banners}
              gridTemplateColumns={`repeat(${isSmallScreen ? 2 : data?.bottom_banners?.length}, minmax(0, 1fr))`}
              bannerImgContainer={styles.banner_img_container}
            />
          )}

          {data?.premium_brand?.description && (
            <article aria-hidden="true" className={styles.brand_description}>
              <span className={styles.seo_title}>درباره برند</span>
              <div className={styles.seo_content}>
                <div className={styles.seo_description}>
                  {data?.premium_brand?.description}
                </div>
              </div>
            </article>
          )}
        </div>
      </main>
    </div>
  );
}

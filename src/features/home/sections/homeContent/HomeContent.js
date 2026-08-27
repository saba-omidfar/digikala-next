import HomeTopSlider from "@/features/home/sections/homeTopSlider/HomeTopSlider";

import AmazingSliderDesktop from "@/features/home/sections/amazingSlider/desktop/AmazingSliderDesktop";
import AmazingSliderMobile from "@/features/home/sections/amazingSlider/mobile/AmazingSliderMobile";

import DeepLinks from "@/features/home/sections/deepLinks/DeepLinks";

import Banners from "@/components/sections/banners/Banners";

import Categories from "@/features/home/sections/categories/Categories";
import MobileCategories from "@/features/home/sections/mobileCategories/MobileCategories";

import PopularBrands from "@/features/home/sections/popularBrands/PopularBrands";
import MobileBrands from "@/features/home/sections/mobileBrands/MobileBrands";

import BestSellingProductsSlider from "@/features/home/sections/bestSellingProductsSlider/BestSellingProductsSlider";

import Divider from "@/features/home/sections/divider/Divider";

export default function HomeContent({ homeData, isMobile }) {
  const renderWidget = (widget) => {
    const { utm, data } = widget;

    switch (utm) {
      case "banner_slider_homepage_tab_all":
        if (isMobile) return null;

        return data?.items?.length > 0 ? (
          <HomeTopSlider slides={data?.items} />
        ) : null;

      case "circle_badge_homepage_tab_all":
        return data?.items?.length > 0 ? (
          <DeepLinks deepLinks={data?.items} />
        ) : null;

      case "amazing_carousel_homepage_tab_all":
        return data ? (
          isMobile ? (
            <AmazingSliderMobile data={data} />
          ) : (
            <AmazingSliderDesktop data={data} />
          )
        ) : null;

      case "touchpoint_group_tab_homepage_tab_all":
        return isMobile ? (
          <MobileCategories categories={data?.default_groups} />
        ) : (
          <Categories categories={data?.default_groups} />
        );

      case "brands_web":
        return isMobile ? (
          <MobileBrands
            icon={data?.icon?.url}
            title={data?.title}
            brands={data?.items}
          />
        ) : (
          <PopularBrands brands={data} />
        );

      case "top_banners":
      case "top_second_banners":
      case "zone_middle_banner_0":
      case "dkms_zone_middle_index_0_homepage_tab_all":
      case "zone_middle_banner_1":
      case "middle_third_banners":
      case "dkms_middle_third_homepage_tab_all":
      case "middle_third_other_banners":
      case "zone_bottom_banners":
      case "dkms_top_homepage_tab_all":
      case "dkms_top_second_homepage_tab_all":
      case "dkms_middle_third_other_tab_all":
        return data?.items?.length > 0 ? (
          <Banners banners={data?.items} isHomePage />
        ) : null;

      case "trending_products_tab_homepage":
        return data?.products?.length > 0 ? (
          <BestSellingProductsSlider
            isHomePage
            title={data.title}
            products={data.products}
            iconColor="#f9a825"
            numberColor="#1672dd"
            seeMore={data?.see_more_url?.uri}
          />
        ) : null;

      case "trending_products_tab_homepage":
        return data?.products?.length > 0 ? (
          <BestSellingProductsSlider
            isHomePage
            title={data.title}
            products={data.products}
          />
        ) : null;

      case "divider":
        return isMobile ? <Divider data={data} /> : null;

      default:
        return null;
    }
  };

  return (
    <>
      {homeData?.map((widget, index) => (
        <div key={index}>{renderWidget(widget)}</div>
      ))}
    </>
  );
}

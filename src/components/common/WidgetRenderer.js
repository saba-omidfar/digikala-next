import DeepLinks from "@/features/home/sections/deepLinks/DeepLinks";
import Banners from "@/components/sections/banners/Banners";
import MobileCategories from "@/features/home/sections/mobileCategories/MobileCategories";
import PopularBrands from "@/components/sections/popularBrands/PopularBrands";
import BestSellingProductsSlider from "@/features/home/sections/bestSellingProductsSlider/BestSellingProductsSlider";
import Blogs from "@/features/home/sections/blogs/Blogs";
import AmazingSliderMobile from "@/features/home/sections/amazingSlider/mobile/AmazingSliderMobile";

export default function WidgetRenderer({ widget, data }) {
  if (
    widget.type === "dkms_banner" &&
    widget.utm !== "banner_slider_mobile_web"
  ) {
    return <Banners banners={data?.data?.items || data?.items} isHomePage />;
  }

  switch (widget.utm) {
    case "dkms_zone_middle_index_1_mobile_web":
      return <Banners banners={data?.data?.items || data?.items} isHomePage />;

    case "circle_badge_tab_all":
      return <DeepLinks deepLinks={data?.items} />;

    case "amazing_carousel_tab_all":
      return <AmazingSliderMobile incredibbleOffers={data?.data} />;

    case "touchpoint_group_tab_all":
      return (
        <MobileCategories categories={data?.data?.default_groups?.items} />
      );

    case "brands_web":
      return (
        <PopularBrands
          icon={data?.data?.icon}
          title={data?.data?.title}
          brands={data?.data?.items}
          isHomePage
        />
      );

    case "best_selling_products_tab_all":
    case "trending_products_tab_all":
    case "filterable_product_web":
      return (
        <BestSellingProductsSlider
          isHomePage
          title={data?.data?.title}
          products={data?.data?.products}
          iconColor="#f9a825"
          numberColor="#1672dd"
        />
      );

    case "mag_web":
      return <Blogs magazineNews={data?.data} title={data?.data?.title} />;

    default:
      return null;
  }
}

"use client";

import MainTopSlider from "@/features/shared/sections/mainTopSlider/MainTopSlider";
import FreshMenu from "@/features/main/sections/freshMenu/FreshMenu";
import SimpleCarousel from "@/features/main/sections/simpleCarousel/SimpleCarousel";
import AmazingSlider from "@/features/main/sections/amazingSlider/AmazingSlider";
import Categories from "@/features/main/sections/categories/Categories";
import RecommendedCategories from "@/features/main/sections/recommendedCategories/RecommendedCategories";
import Banners from "@/features/main/sections/banners/Banners";
import BestSellingProductsSlider from "@/components/sections/bestSellingProductsSlider/BestSellingProductsSlider";
import TopFrequentProducts from "@/features/main/sections/topFrequentProducts/TopFrequentProducts";
import PopularBrands from "@/components/sections/popularBrands/PopularBrands";
import DigikalaMagazineNews from "@/features/main/sections/digikalaMagazineNews/DigikalaMagazineNews";
import Article from "@/features/main/sections/article/Article";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function LegacyMainContent({ categoryCode, data, title }) {
  const { isSmallScreen } = useScreenStatus();

  let backgroundColor,
    backgroundBg = "";

  switch (categoryCode) {
    case "food-beverage":
      backgroundColor = "linear-gradient(to top, #05ba58 , #05ba58)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/Supermarket2.webp";
      break;

    case "electronic-devices":
      backgroundColor = "linear-gradient(to top, #6763d9, #5c51bf)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/Electronics.webp";
      break;

    case "home-and-kitchen":
      backgroundColor = "linear-gradient(to top, #00b4b0, #009db0)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/HomeAndKitchen.webp";
      break;

    case "personal-appliance":
      backgroundColor = "linear-gradient(to top, #c441f1, #b006eb)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/Beauty.webp";
      break;

    case "vehicles-spare-parts":
      backgroundColor = "linear-gradient(to top, #ef4056, #ef4056)";
      backgroundBg = "";
      break;

    case "vehicles":
      backgroundColor = "linear-gradient(to top, #f62, #d65c26)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/Tools.webp";
      break;

    case "book-and-media":
      backgroundColor = "linear-gradient(to top, #ff9a36, #fa8614)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/Stationery.webp";
      break;

    case "sport-entertainment":
      backgroundColor = "linear-gradient(to top, #2babc4, #1693c0)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/SportsAndEntertainemnt.webp";
      break;

    case "mother-and-child":
      backgroundColor = "linear-gradient(to top, #fb507d, #dd305d)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/KidsAndMother.webp";
      break;

    case "rural-products":
      backgroundColor = "linear-gradient(to top, #ef4056, #ef394e)";
      backgroundBg =
        "https://www.digikala.com/statics/img/png/specialCarousel/Supermarket2.webp";
      break;

    default:
      break;
  }

  return (
    <>
      {/* Top Slider */}
      {data?.slider_banners?.length ? (
        <MainTopSlider slides={data?.slider_banners} />
      ) : (
        ""
      )}

      {/* Selected Menu */}
      {!isSmallScreen && data?.fmcg_selected_menu?.items?.length ? (
        <FreshMenu fresh_menu={data?.fmcg_selected_menu} />
      ) : (
        ""
      )}

      {/* Amazing Slider */}
      {data?.incredible_offers?.products?.length ? (
        <>
          <AmazingSlider
            incredibbleOffers={data?.incredible_offers}
            backgroundColor={backgroundColor}
            backgroundBg={backgroundBg}
          />
        </>
      ) : (
        ""
      )}

      {/* Catgeories */}
      <Categories categories={data?.sub_categories} />

      {/* Middle Banners */}
      {data?.middle_banners?.length ? (
        <Banners data={data?.middle_banners} middleBanners />
      ) : (
        ""
      )}

      {/* MarketingProducts */}
      {data?.marketing_products_carousels?.length
        ? data?.marketing_products_carousels?.map((marketingProduct) => (
            <SimpleCarousel
              key={marketingProduct?.title}
              data={marketingProduct}
              titleLineColor="#ef394e"
            />
          ))
        : ""}

      {/* Recomended Categories */}
      <RecommendedCategories
        title="دسته‌بندی‌های پیشنهادی"
        categoryGroups={data?.recommendation_sub_categories}
      />

      {/* Top Banners */}
      {data?.top_banners?.length ? (
        <Banners data={data?.top_banners} topBanners />
      ) : (
        ""
      )}

      {/* Best-Selling Products Slider */}
      <BestSellingProductsSlider
        title={data?.best_selling_products?.title}
        products={data?.best_selling_products?.products}
        url={data?.best_selling_products?.see_more_url?.uri}
        seeMore={true}
        iconColor="#f9a825"
        numberColor="#1672dd"
        isMainPage
      />

      {/* Top Frequent Products */}
      {data?.top_repurchased_products ? (
        <TopFrequentProducts
          title={data?.top_repurchased_products?.title}
          products={data?.top_repurchased_products?.products}
        />
      ) : (
        ""
      )}

      {/* Popular Brands */}
      <PopularBrands
        brands={data?.popular_brands?.brands}
        title="محبوب‌ترین برندها"
        isMainPage
      />

      {/* Digikala Magazine News */}
      <DigikalaMagazineNews
        title="مطالب مرتبط"
        magazine={data?.digikala_magazine}
      />

      {/* Seo */}
      {title ? <Article seo={data?.seo} title={title} /> : ""}
    </>
  );
}

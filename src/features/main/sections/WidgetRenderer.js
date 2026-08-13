import Banner from "@/components/sections/banner/Banner";
import SimpleCarousel from "@/features/main/sections/simpleCarousel/SimpleCarousel";
import BestSellingProductsSlider from "@/components/sections/bestSellingProductsSlider/BestSellingProductsSlider";
import Description from "@/features/landing/sections/description/Description";
import ImagesRow from "@/features/landing/sections/imagesRow/ImagesRow";

export default function WidgetRenderer({ widget }) {
  switch (widget?.widget_type) {
    case "banner":
      return <Banner banners={widget?.data} />;

    case "special_carousel":
      return (
        <SimpleCarousel
          data={widget?.data?.carousel}
          title={widget?.data?.title}
          titleLineColor="#ef394e"
        />
      );

    case "description":
      return <Description data={widget} />;

    case "images_row":
      return <ImagesRow widget={widget} />;

    case "best_selling":
      return (
        <BestSellingProductsSlider
          title="پرطرفدارترین‌ها"
          products={widget?.data?.products}
          url={widget?.data?.see_more_url?.uri}
        />
      );

    default:
      return null;
  }
}

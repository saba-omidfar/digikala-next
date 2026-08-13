import Description from "@/features/landing/sections/description/Description";
import HeroSlider from "@/features/landing/sections/heroSlider/HeroSlider";
import SingleProduct from "@/features/landing/sections/singleProduct/SingleProduct";
import ImagesRow from "@/features/landing/sections/imagesRow/ImagesRow";
import HeadLine from "@/features/landing/sections/headLine/HeadLine";
import IncredibleOffer from "@/features/landing/sections/incredibleOffer/IncredibleOffer";
import Banner from "@/features/landing/sections/banner/Banner";
import Faq from "@/features/landing/sections/faq/Faq";
import Seo from "@/features/landing/sections/seo/Seo";

import SpecialCarouselWidget from "./widgets/specialCarouselWidget/SpecialCarouselWidget";
import TabSectionWidget from "./widgets/TabSectionWidget";

export default function WidgetRenderer({ widget, landingId, systemColor }) {
  switch (widget.widget_type) {
    case "description":
      return (
        <Description data={widget} systemColor={systemColor} isLandingPage />
      );

    case "hero":
      return <HeroSlider heroSlides={widget.data} />;

    case "single_product":
      return <SingleProduct data={widget} />;

    case "special_carousel":
      return (
        <SpecialCarouselWidget
          widget={widget}
          landingId={landingId}
          systemColor={systemColor}
        />
      );

    case "images_row":
      return <ImagesRow widget={widget} systemColor={systemColor} />;

    case "tab_section":
      return <TabSectionWidget widget={widget} />;

    case "headline":
      return <HeadLine data={widget} />;

    case "incredible_offer":
      return <IncredibleOffer data={widget} />;

    case "banner":
      return <Banner data={widget} />;

    case "faq":
      return <Faq data={widget} />;

    case "seo":
      return <Seo data={widget} />;

    default:
      return null;
  }
}

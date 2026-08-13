"use client";

import AmazingSlider from "@/features/landing/sections/amazingSlider/AmazingSlider";
import PopularBrands from "@/components/sections/popularBrands/PopularBrands";

import SpecialCarousel from "@/features/landing/sections/specialCarousel/SpecialCarousel";

import { useGetWidgetIdLanding } from "@/features/landing/hooks/useLandingPage";

import styles from "./specialCarouselWidget.module.css";
import NewsMeg from "../../newsMeg/NewsMeg";

export default function SpecialCarouselWidget({
  widget,
  landingId,
  systemColor,
}) {
  const isLandingPage = landingId === 1457;

  const widgetUrl = widget?.data?.widget_url;

  const widgetIdFromUrl = widgetUrl?.split("/")?.filter(Boolean)?.pop();

  const shouldFetchExternalWidget = [
    8571, 8573, 20017, 8496, 4707, 14569, 7242, 9491, 16286,
  ].includes(widget?.widget_id);

  const { data } = useGetWidgetIdLanding(
    shouldFetchExternalWidget ? widgetIdFromUrl : undefined,
  );

  switch (widget?.widget_id) {
    case 8571:
      return <AmazingSlider incredibbleOffers={data?.data?.carousel} />;

    case 8573:
      return (
        <div className={styles.popular_brand_container}>
          <PopularBrands
            isLandingPage={isLandingPage}
            borderColor="hsl(199,54%,89%)"
            title={data?.data?.title}
            brands={data?.data?.images}
          />
        </div>
      );

    case 20017:
      return <AmazingSlider incredibbleOffers={data?.data?.data?.carousel} />;

    case 8496:
      return <NewsMeg data={data?.data} />;

    case 4707:
      return <NewsMeg data={data?.data} />;

    case 14569:
      return <NewsMeg data={data?.data} />;

    case 7242:
      return <NewsMeg data={data?.data} />;

    case 9491:
      return <NewsMeg data={data?.data} />;

    default:
      return (
        <SpecialCarousel
          widget={widget}
          systemColor={systemColor}
          isLandingPage={isLandingPage}
          landingId={landingId}
        />
      );
  }
}

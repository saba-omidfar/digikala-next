import NewsMeg from "@/features/landing/sections/newsMeg/NewsMeg";
import CarouselProducts from "@/features/landing/sections/carouselProducts/CarouselProducts";

import { useGetWidgetIdLanding } from "@/features/landing/hooks/useLandingPage";

function SpecialCarousel({ widget, systemColor, isLandingPage, landingId }) {
  const widgetId = widget?.data?.widget_url?.split("/").filter(Boolean).pop();
  const { data, loading } = useGetWidgetIdLanding(widgetId);

  if (loading || !data) return null;

  if (data?.data?.news) {
    return (
      <NewsMeg
        data={data}
        navigationIconColor="#ef4056"
        isLandingPage={isLandingPage}
      />
    );
  }

  if (data?.data?.carousel || data?.data?.data?.carousel) {
    return (
      <CarouselProducts
        data={data}
        systemColor={systemColor}
        landingId={landingId}
      />
    );
  }

  return null;
}

export default SpecialCarousel;

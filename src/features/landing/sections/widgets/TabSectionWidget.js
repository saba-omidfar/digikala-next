import TabSection from "@/features/landing/sections/tabSection/TabSection";

import { useGetWidgetIdLanding } from "@/features/landing/hooks/useLandingPage";

export default function TabSectionWidget({ widget }) {
  const widgetUrl = widget?.data?.widget_url;
  const widgetIdFromUrl = widgetUrl?.split("/")?.filter(Boolean)?.pop();

  const { data } = useGetWidgetIdLanding(widgetIdFromUrl);

  return <TabSection data={(data?.data?.data || data?.data)?.tabs} />;
}

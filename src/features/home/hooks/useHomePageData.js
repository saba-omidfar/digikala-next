import useFetch from "@/hooks/useFetch";

import parseIndexPage from "@/features/home/utils/parseIndexPage";
import { useWidgetData } from "@/features/home/hooks/useWidgetData";

export default function useHomePageData() {
  const { data, loading } = useFetch("/api/home");

  const widgets = useWidgetData(data?.widgets);
  const homeData = parseIndexPage(widgets);

  return {
    homeData,
    homeDataLoading: loading,
  };
}

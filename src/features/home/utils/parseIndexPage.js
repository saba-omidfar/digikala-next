export default function parseIndexPage(widgets) {
  if (!Array.isArray(widgets) || widgets.length === 0) {
    return [];
  }

  return widgets.map((widget) => {
    switch (widget.utm) {
      case "banner_slider_mobile_web":
        return {
          ...widget,
          component: "top_slider",
          data: widget?.data?.items,
        };

      case "circle_badge_tab_all":
        return {
          ...widget,
          component: "deep_links",
          data: widget?.data?.items,
        };

      case "amazing_carousel_tab_all":
        return {
          ...widget,
          component: "incredible_offers",
          data: widget?.data,
        };

      case "touchpoint_group_tab_all":
        return {
          ...widget,
          component: "categories",
          data: widget?.data,
        };

      case "brands_web":
        return {
          ...widget,
          component: "popular_brands",
          data: widget?.data,
        };

      case "dkms_top_mobile_web":
        return {
          ...widget,
          component: "top_banners",
          data: widget?.data?.items,
        };

      case "dkms_top_second_mobile_web":
        return {
          ...widget,
          component: "top_second_banners",
          data: widget?.data?.items,
        };

      case "dkms_zone_middle_index_0_mobile_web":
        return {
          ...widget,
          component: "zone_middle_banner_0",
          data: widget?.data?.items,
        };

      case "dkms_zone_middle_index_1_mobile_web":
        return {
          ...widget,
          component: "zone_middle_banner_1",
          data: widget?.data?.items,
        };

      case "dkms_middle_third_mobile_web":
        return {
          ...widget,
          component: "middle_third_banners",
          data: widget?.data?.items,
        };

      case "dkms_middle_third_other_mobile_web":
        return {
          ...widget,
          component: "middle_third_other_banners",
          data: widget?.data?.items,
        };

      case "best_selling_products_tab_all":
        return {
          ...widget,
          component: "best_selling",
          data: widget?.data,
        };

      case "dkms_bottom_mobile_web":
        return {
          ...widget,
          component: "zone_bottom_banners",
          data: widget?.data?.items,
        };

      case "trending_products_tab_all":
        return {
          ...widget,
          component: "trending",
          data: widget?.data,
        };

      case "divider":
        return {
          ...widget,
          component: "divider",
          data: widget?.data,
        };

      default:
        return widget;
    }
  });
}

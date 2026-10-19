import ChildCategories from "./childCategories/ChildCategories";
import BrandsBestSelling from "./brandsBestSelling/BrandsBestSelling";
import FilterTouchpoint from "./filterTouchpoint/FilterTouchpoint";
import HorizontalProducts from "./horizontalProduts/HorizontalProducts";
import CartBasedProducts from "./cartBasedProducts/CartBasedProducts";
import TouchpointGroup from "./touchpointGroup/TouchpointGroup";
import FilterableProducts from "./filterableProducts/FilterableProducts";

export default function WidgetRenderer({ widget }) {
  switch (widget?.type) {
    case "child_categories":
      return <ChildCategories data={widget?.data} />;

    case "filter":
      return <FilterTouchpoint data={widget?.data?.filters?.[0]} />;

    case "brands_carousel":
      return <BrandsBestSelling data={widget?.data} />;

    case "horizontal_products":
      return <HorizontalProducts data={widget?.data} />;

    case "cart_based_products":
      return <CartBasedProducts data={widget?.data} />;

    case "touchpoint_group":
      return <TouchpointGroup data={widget?.data} />;

    case "filterable_products":
      return <FilterableProducts data={widget?.data} />;

    default:
      return null;
  }
}

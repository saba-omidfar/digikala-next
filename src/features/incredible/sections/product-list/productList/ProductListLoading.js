import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";

import useScreenStatus from "@/hooks/useScreenStatus";

export default function ProductListLoading() {
  const { isSmallScreen } = useScreenStatus();

  return (
    <div
      className={`product_list__pages_container ${
        isSmallScreen
          ? "product_list__pages_container_without_sidebar"
          : "product_list__pages_container_with_sidebar"
      }`}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <VerticalProductCard key={i} index={i} isSkeleton />
      ))}
    </div>
  );
}

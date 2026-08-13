import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./productList.module.css";

export default function ProductListProducts({
  products,
  filters,
  totalItems,
  isFetchingMore,
  loadMoreRef,
  isIncredibleTeasing,
}) {
  const { isSmallScreen } = useScreenStatus();

  if (!totalItems) return null;

  return (
    <div>
      <div
        className={`product_list__pages_container ${
          isSmallScreen || !filters
            ? "product_list__pages_container_without_sidebar"
            : "product_list__pages_container_with_sidebar"
        }`}
      >
        {products?.map((product, index) => (
          <VerticalProductCard
            key={index}
            index={index}
            product={product?.data || product}
            linkClassName={styles.product_link}
            imgContainerClassName={styles.product_img_container}
            isVertical
            hasBadge={!isIncredibleTeasing}
            hasPromotionTimeline
            isIncredibleTeasing={isIncredibleTeasing}
          />
        ))}

        {!isSmallScreen &&
          isFetchingMore &&
          Array.from({ length: 5 }).map((_, i) => (
            <VerticalProductCard key={`loading-${i}`} isSkeleton />
          ))}

        <div ref={loadMoreRef} />
      </div>
    </div>
  );
}

import VerticalProductCard from "@/components/modules/VerticalProductCard/VerticalProductCard";
import ProductCardSkeleton from "@/features/incredible/sections/product-list/ProductCardSkeleton";

import { useBestSellingPage } from "@/features/best-selling/hooks/useBestSellingPage";

import styles from "./mobileContent.module.css";
import "@/styles/productList.css";

export default function MobileContent() {
  const { data, isLoading } = useBestSellingPage();

  return (
    <div className={styles.container}>
      <div className={styles.base_layout_Desktop_content}>
        <div className={styles.product_list_wrapper}>
          <div id="ProductListPagesWrapper" className={styles.product_list}>
            <section className="w-100 flex-grow-1 position-relative">
              <div className="product_list__pages_container product_list__pages_container_without_sidebar">
                {isLoading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={styles.skeleton_card_wrapper}>
                        <VerticalProductCard key={`loading-${i}`} isSkeleton />
                      </div>
                    ))
                  : data?.products?.map((product, index) => (
                      <VerticalProductCard
                        key={index}
                        index={index}
                        product={product}
                        imgContainerClassName={styles.product_img_container}
                        linkClassName={styles.product_link}
                        isVertical
                        hasProductBadge
                      />
                    ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

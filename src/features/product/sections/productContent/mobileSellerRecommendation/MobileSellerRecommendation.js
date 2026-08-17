import { useProductContext } from "@/contexts/ProductContext";

import HorizontalProductCard from "@/components/modules/horizontalProductCard/HorizontalProductCard";
import VerticalProductCardBG from "@/components/modules/verticalProductCardBG/VerticalProductCardBG";

import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./mobileSellerRecommendation.module.css";

function MobileSellerRecommendation() {
  const { cpc, isLoadingCpc } = useProductContext();
  const { isSmallScreen } = useScreenStatus();

  if (!cpc?.products?.length || isLoadingCpc) return;

  return (
    <div className={styles.cpc_container}>
      <div className={styles.cpc_header}>
        <span className={styles.cpc_title}>
          <div className="d-flex" aria-hidden="false">
            <svg className={styles.cpc_icon}>
              <use href="#ads"></use>
            </svg>
          </div>
          {cpc?.title}
        </span>
      </div>
      <div>
        <div className={styles.cpc_content}>
          <div className={styles.pr}></div>

          {isSmallScreen && cpc?.products?.length === 1 ? (
            <>
              {cpc?.products?.map((product, index) => (
                <HorizontalProductCard
                  key={index + product.id}
                  product={product}
                />
              ))}
            </>
          ) : (
            <>
              {cpc?.products?.map((product, index) => (
                <VerticalProductCardBG
                  key={index + product.id}
                  product={product}
                />
              ))}
            </>
          )}

          <div className={styles.pr}></div>
        </div>
      </div>
    </div>
  );
}

export default MobileSellerRecommendation;

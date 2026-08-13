import VerticalProductCardBG from "@/components/modules/verticalProductCardBG/VerticalProductCardBG";

import { useProductTabularRecommendation } from "@/hooks/useProduct";

import styles from "./suggestion.module.css";

function Suggestion({ productId, offset, isLastMeta }) {
  const { data, isLoading } = useProductTabularRecommendation(
    productId,
    offset,
  );

  if (!data?.data?.products || isLoading) return null;

  return (
    <div className={styles.recommendation_container}>
      <h3 id="TABULAR_REF_ID" className={styles.recommendation_title}>
        {data?.data?.title}
      </h3>
      <div className={styles.recommendation_content}>
        <div className="lazyload-wrapper">
          <div>
            <div className={styles.products_container}>
              {data?.data?.products?.map((product) => (
                <VerticalProductCardBG key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
      {!isLastMeta ? <div className={styles.recommendation_space}></div> : ""}
    </div>
  );
}

export default Suggestion;

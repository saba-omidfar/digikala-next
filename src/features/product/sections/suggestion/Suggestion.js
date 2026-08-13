import Recommendation from "@/features/product/sections/product/suggestion/Suggestion";

import { useProductContext } from "@/contexts/ProductContext";
import { useProductTabularRecommendation } from "@/hooks/useProduct";

import styles from "./suggestion.module.css";

function Suggestion() {
  const { productDetails } = useProductContext();
  const { data: recommendationData } = useProductTabularRecommendation(
    productDetails?.id,
    0,
  );

  return (
    <section id="SUGGESTION" className={styles.suggestion_container}>
      <div className={styles.suggestion_space}></div>
      <div className="lazyload-wrapper">
        <div>
          <div id="tabs-container--top" className={styles.suggestion_content}>
            {recommendationData?.meta?.offsets?.map((item, index) => (
              <Recommendation
                key={item?.offset}
                isLastMeta={
                  index === recommendationData?.meta?.offsets?.length - 1
                }
                productId={productDetails?.id}
                offset={item?.offset}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Suggestion;

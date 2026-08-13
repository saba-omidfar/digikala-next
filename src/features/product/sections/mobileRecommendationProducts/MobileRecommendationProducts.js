import ProductCard from "@/components/modules/productCard/ProductCard";
import styles from "./mobileRecommendationProducts.module.css";

function MobileRecommendationProducts({ data }) {
  return (
    <div>
      <div className={styles.recommendation_container}>
        <div className={styles.recommendation_header}>
          <div className="d-flex align-items-center flex-grow-1">
            <h2 className={styles.recommendation_title}>
              <span className="position-relative">{data?.title}</span>
            </h2>
          </div>
          <div className={styles.title__line}></div>
        </div>
        <div className={styles.recommendation_content}>
          {data?.products?.map((product) => (
            <ProductCard
              key={product?.id}
              product={product}
              isRecommendationProducts
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MobileRecommendationProducts;

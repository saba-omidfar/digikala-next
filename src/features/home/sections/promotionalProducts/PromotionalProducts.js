import React from "react";

import PromotionalItem from "./PromotionalItem";

import styles from "./promotionalProducts.module.css";

function PromotionalProducts({ data }) {
  return (
    <div className={styles.content}>
      <div className={styles.promotional_products_container}>
        <div className={styles.promotional_products_title}>
          <svg className={styles.promotional_products_icon}>
            <use href="#discount"></use>
          </svg>
          <h3 className="section_title" style={{ marginRight: "8px" }}>
            {data?.title}
          </h3>
        </div>
        <div className={styles.promotional_products_items}>
          {data?.products?.map((product) => (
            <PromotionalItem key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PromotionalProducts;

import { useState } from "react";

import ProductList from "@/features/incredible/sections/product-list/productList/ProductList";

import styles from "./allFreshIncredibleOffers.module.css";

export default function AllFreshIncredibleOffers({ isIncredibleTeasing }) {
  const [activeFilter, setActiveFilter] = useState("فیلترها");

  return (
    <div className={styles.content}>
      {isIncredibleTeasing && (
        <div className={styles.title_container}>
          <div className="d-flex align-items-center flex-grow-1">
            <p className={styles.title}>
              <span className="position-relative">همه شگفت‌انگیز‌ها</span>
            </p>
          </div>
        </div>
      )}
      <ProductList
        isIncrediblePage
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
}

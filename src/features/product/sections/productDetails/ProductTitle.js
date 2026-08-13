import ProductBrandBreadcrumb from "@/components/modules/productBrandBreadcrumb/ProductBrandBreadcrumb";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./productTitle.module.css";

function ProductTitle() {
  const { productDetails } = useProductContext();

  return (
    <div className={styles.header}>
      {productDetails?.brand && (
        <div className={styles.brand_img_container}>
          <img
            className={styles.brand_img}
            src={productDetails?.brand?.logo?.url?.[0]}
            width={52}
            height={52}
            alt={productDetails?.brand?.title_fa}
            title=""
          />
        </div>
      )}
      <div className="w-100">
        <ProductBrandBreadcrumb />
        {productDetails?.default_variant ? (
          <h1 className={styles.header_title}>
            {productDetails?.title_fa || productDetails?.test_title_fa}
          </h1>
        ) : (
          <h1 className={styles.not_found_title} id="title">
            <span className={styles.not_found_subtitle}>ناموجود</span>
            {productDetails?.title_fa}
          </h1>
        )}
      </div>
    </div>
  );
}

export default ProductTitle;

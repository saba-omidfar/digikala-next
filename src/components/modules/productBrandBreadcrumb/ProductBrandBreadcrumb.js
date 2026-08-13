import Link from "next/link";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./productBrandBreadcrumb.module.css";

function brandBreadcrumb() {
  const { productDetails } = useProductContext();

  return (
    <div className="d-flex align-items-center">
      <nav className="d-flex align-items-center">
        <Link
          className={styles.breadcrumb_link}
          id="breadcrumb-down"
          href={productDetails ? productDetails?.brand?.url?.uri : "#"}
        >
          <span className={styles.breadcrumb_link_text}>
            {productDetails?.brand?.title_fa}
          </span>
        </Link>
        <Link
          className={styles.breadcrumb_link}
          id="breadcrumb-down"
          href={
            productDetails
              ? productDetails && productDetails?.brand?.url?.uri
              : "#"
          }
        >
          <div className="d-flex align-items-center">
            <p className={styles.divider_icon}> / </p>
            <p className={styles.breadcrumb_link_text}>
              {productDetails?.category?.title_fa}{" "}
              {productDetails?.brand?.title_fa}
            </p>
          </div>
        </Link>
      </nav>
    </div>
  );
}

export default brandBreadcrumb;

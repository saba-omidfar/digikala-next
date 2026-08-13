import Link from "next/link";

import styles from "./amazingItem.module.css";

export default function AmazingItem({ product, index }) {
  const price = product?.price?.selling_price;
  const discountPercent = product?.price?.discount_percent;

  return (
    <Link
      target="_self"
      href={`product/dkp-${product?.id}/` || "#"}
      className={`${styles.product_link} ${index === 0 ? styles.rounded_r_md : ""}`}
    >
      <div className="h-100" id="product-card">
        <article className={styles.product_article}>
          <div className="position-relative d-flex flex-column flex-grow-1">
            <div className={styles.product_img_content}>
              <div className="d-flex align-items-stretch flex-column position-relative">
                <div className="d-flex align-items-start mx-auto">
                  <div>
                    <div
                      aria-hidden="false"
                      aria-label={product?.title}
                      className={styles.product_img_container}
                    >
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={product?.image?.url}
                        />
                        <source
                          type="image/jpeg"
                          srcSet={product?.image?.url}
                        />
                        <img
                          className={styles.product_img}
                          src={product?.image?.url}
                          alt={product?.title_fa}
                          title=""
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.product_infos}>
              <p className={styles.product_title}>{product?.title}</p>

              <div className={styles.price_container}>
                <div className="d-flex justify-content-start align-items-center gap-2">
                  {discountPercent && (
                    <div className={styles.discount_wrapper}>
                      <span
                        className={styles.discount_percent}
                        data-testid="price-discount-percent"
                      >
                        {discountPercent?.toLocaleString("fa-IR")}٪
                      </span>
                    </div>
                  )}
                  <span className={styles.old_price}>
                    {(product?.price?.rrp_price / 10).toLocaleString("fa-IR")}
                  </span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <span className={styles.selling_price}>
                      {(price / 10).toLocaleString("fa-IR")}
                    </span>
                    <div className="flex" aria-hidden="false">
                      <svg className={styles.price_icon}>
                        <use href="#toman"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </Link>
  );
}

import Link from "next/link";

import styles from "./amazingItem.module.css";

export default function AmazingItem({ product, index }) {
  const price = product?.price?.selling_price;
  const discountPercent = product?.price?.discount_percent;

  return (
    <Link
      target="_blank"
      href={product?.url?.uri || "#"}
      className={`${styles.product_link} ${index === 0 ? styles.rounded_r_md : ""}`}
    >
      <div className="h-100" id="product-card">
        <article className="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
          <div className="d-flex flex-grow-1 position-relative flex-column gap-3">
            <div>
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
                          src={product?.images?.main?.url?.[0]}
                          alt={product?.title_fa}
                          title=""
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start gap-2">
              <div>
                <h3 className={styles.product_title}>
                  {product.title_fa || product?.title}
                </h3>
              </div>

              <div className="w-100 d-flex justify-content-end align-items-end">
                <div>
                  <div className="d-flex align-items-start justify-content-start flex-column pt-1">
                    <div className="d-flex align-items-center justify-content-between gap-2">
                      {discountPercent && (
                        <div className={styles.discount_wrapper}>
                          <span
                            className={styles.discount_percent}
                            id="price-discount-percent"
                          >
                            {discountPercent?.toLocaleString("fa-IR")}٪
                          </span>
                        </div>
                      )}
                      {discountPercent !== 0 ? (
                        <div className={styles.old_price_container}>
                          <div
                            id="price-no-discount"
                            className={styles.old_price}
                          >
                            {(product?.price?.rrp_price / 10).toLocaleString(
                              "fa-IR",
                            )}
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className={styles.selling_price}>
                    <span id="price-final">
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

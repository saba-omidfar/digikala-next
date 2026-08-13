import Link from "next/link";

import styles from "./viewedProductItem.module.css";

function ViewedProductItem({ product, variant }) {
  return (
    <div>
      <Link
        className={styles.cart_item_link}
        href={`${product?.url?.uri}/?variant_id=${variant?.id}` || "#"}
        target="_blank"
      >
        <div className={styles.product_img_bg}>
          <div
            className={styles.product_img_container}
            aria-hidden="false"
            aria-label={product?.title_fa}
          >
            <picture>
              <source
                type="image/webp"
                srcSet={product?.images?.main?.url?.[0]}
              />
              <source
                type="image/jpeg"
                srcSet={product?.images?.main?.url?.[0]}
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
        <div className={styles.product_infos_container}>
          <span className={styles.product_title}>{product?.title_fa}</span>
          <div className={styles.amazing_badge_container}>
            <div className={styles.amazing_badge}>
              {variant?.price?.badge ? (
                <div className="d-flex" aria-hidden="false">
                  <div
                    className={`${styles.amazing_icon} cube-font-icon`}
                    data-icon-name="cube-badge-amazing"
                    data-icon=""
                    style={{ color: variant?.price?.badge?.color }}
                  ></div>
                </div>
              ) : (
                ""
              )}
              <span
                className={styles.amazing_text}
                style={{ color: variant?.price?.badge?.color }}
              >
                {variant?.price?.badge ? variant?.price?.badge?.title : ""}
              </span>
            </div>
          </div>
          {product?.default_variant ? (
            <div className={styles.product_price_container}>
              <div className={styles.product_price}>
                <div className={styles.old_price_container}>
                  {product?.default_variant?.price?.discount_percent !== 0 ? (
                    <div className={styles.old_price}>
                      <div className={styles.discount_badge}>
                        <div className="d-flex align-items-center">
                          <span className={styles.discount_percent}>%</span>
                          <span className={styles.discount_text}>
                            {product?.default_variant?.price?.discount_percent?.toLocaleString(
                              "fa-IR",
                            )}
                          </span>
                        </div>
                      </div>
                      <div className={styles.old_price_text_container}>
                        <span className={styles.old_price_text}>
                          {(
                            product?.default_variant?.price?.rrp_price / 10
                          )?.toLocaleString("fa-IR")}
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.new_price_container}>
                  <div className={styles.new_price}>
                    <span className={styles.new_price_text}>
                      {(
                        product?.default_variant?.price?.selling_price / 10
                      )?.toLocaleString("fa-IR")}
                    </span>
                    <div className="d-flex">
                      <svg className={styles.price_icon}>
                        <use href="#toman"></use>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <span className={styles.out_of_box_text}>ناموجود</span>
          )}
        </div>
      </Link>
    </div>
  );
}

export default ViewedProductItem;

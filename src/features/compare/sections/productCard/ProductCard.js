import Link from "next/link";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./productCard.module.css";

export default function ProductCard({ product, canRemove, onRemove }) {
  const sellingPrice = product.product.default_variant.price.selling_price;

  return (
    <div
      className={`${styles.product_card_container} ${styles.br_list_horizontal}`}
    >
      {canRemove ? (
        <div
          className={styles.close_icon_container}
          onClick={() => onRemove(product.product.id)}
        >
          <div className="d-flex" aria-hidden="false">
            <svg className={styles.close_icon}>
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className={styles.product_card}>
        <Link
          className={styles.product_link}
          href={product.product.url.uri ? product.product.url.uri : "#"}
        >
          <figure className={styles.product_figure}>
            <div
              className={styles.product_img_container}
              aria-hidden="false"
              aria-label={product.product.title_fa}
            >
              <img
                className={styles.product_img}
                src={product.product.images.main.url[0]}
                alt={product.product.title_fa}
                title=""
              />
            </div>
          </figure>
        </Link>
        <h3 className={styles.product_title}>{product.product.title_fa}</h3>
        <div className={styles.rate_container}>
          <div className="d-flex" aria-hidden="false">
            <svg className={styles.rate_icon}>
              <use href="#starFill"></use>
            </svg>
          </div>
          <span className={styles.rate_text}>
            {toPersianDigits(
              Math.round((product.product.rating.rate / 100) * 5 * 10) / 10,
            )}
          </span>
        </div>
        <div className={styles.price_container}>
          <div>
            <div className="d-flex align-items-center justify-content-start">
              <div className={styles.selling_price_container}>
                <span className={styles.selling_price_text}>
                  {sellingPrice
                    ? (sellingPrice / 10).toLocaleString("fa-IR")
                    : "-"}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.price_icon}>
                      <use href="#toman"></use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./filterableProduct.module.css";

export default function FilterableProduct({ product }) {
  return (
    <article className={styles.product_list__item}>
      <Link
        target="_self"
        className={styles.product_link}
        href={product.url.uri || "#"}
      >
        <div data-testid="product-card" className="h-100">
          <article className="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
            <div className="d-flex align-items-center justify-content-start mb-1">
              <div className="text-body2-extra flex-grow-1">
                <br />
              </div>
            </div>
            <div className="d-flex flex-grow-1 position-relative flex-column">
              <div className="">
                <div className="d-flex align-items-stretch flex-column position-relative mb-1">
                  <div className="d-flex align-items-start mx-auto">
                    <div>
                      <div
                        role="img"
                        aria-hidden="false"
                        aria-label={product.title}
                        className={styles.product_img_container}
                      >
                        <picture>
                          <source
                            type="image/webp"
                            srcSet={product.image.url}
                          />
                          <source
                            type="image/jpeg"
                            srcSet={product.image.url}
                          />
                          <img
                            decoding="async"
                            className={styles.product_img}
                            width="240"
                            height="240"
                            alt={product.title}
                            title=""
                            src={product.image.url}
                          />
                        </picture>
                      </div>
                    </div>
                    <div className={styles.product_colors}>
                      {product.colors.slice(0, 3).map((color) => (
                        <span
                          key={color.id}
                          className={styles.product_color}
                          style={{ backgroundColor: color.hex_code }}
                        ></span>
                      ))}
                      {product.colors.length > 3 && (
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.plus_icon}>
                            <use href="#addSimple"></use>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                <div className="d-flex align-items-center justify-content-start gap-1 flex-wrap mb-1">
                  <br />
                  <br />
                </div>
                <div>
                  <h3 className={styles.product_title}>{product.title}</h3>
                </div>
                <div className="mb-1 d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center" data-ab-id="">
                    <p className="text-caption invisible">&amp;nbsp;</p>
                    <br />
                  </div>
                  <div className="d-flex align-items-center">
                    <p className={styles.product_rate}>
                      {toPersianDigits(
                        Math.round((product?.rating?.rate / 100) * 5 * 10) / 10,
                      )}
                    </p>
                    <div
                      className={styles.rate_icon_container}
                      aria-hidden="false"
                    >
                      <svg className={styles.rate_icon}>
                        <use href="#starFill"></use>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="pt-1 flex flex-col items-stretch justify-between">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className={styles.selling_price}>
                      <span id="price-final">
                        {(product?.price?.selling_price / 10).toLocaleString(
                          "fa-IR",
                        )}
                      </span>
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.price_icon}>
                          <use href="#toman"></use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between ps-5"></div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </Link>
    </article>
  );
}

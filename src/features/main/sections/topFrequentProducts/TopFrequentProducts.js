import React from "react";
import Link from "next/link";
import Image from "next/image";

import styles from "./topFrequentProducts.module.css";

function TopFrequentProducts({ title, products }) {
  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h2 className={styles.title}>{title ? title : ""}</h2>
      </div>
      <div className={styles.promotional_grid__items}>
        {products?.map((product, index) => (
          <Link
            key={index}
            href={product.url?.uri}
            className={styles.product_link}
          >
            <div className="h-100" id="product-card">
              <article className="overflow-hidden d-flex flex-column align-items-stretch justify-content-start h-100">
                <div className="d-flex flex-grow-1 position-relative flex-column">
                  <div className="d-flex align-items-stretch flex-column position-relative mb-1">
                    <div className="d-flex align-items-start mx-auto">
                      <div>
                        <div className={styles.product_image__mini_badges}>
                          <br />
                          <br />
                        </div>
                        <div className={styles.product_image_container}>
                          <picture>
                            <source
                              type="image/webp"
                              srcSet={product?.images?.main?.webp_url?.[0]}
                            />
                            <source
                              type="image/jpeg"
                              srcSet={product?.images?.main?.webp_url?.[0]}
                            />
                            <img
                              className={styles.product_image}
                              src={product?.images?.main?.url?.[0]}
                              alt={product?.title_fa}
                            />
                          </picture>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 d-flex flex-column align-items-stretch justify-content-start">
                  <div className="pt-1 d-flex flex-column align-items-stretch justify-content-between">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className={styles.product_price_container}>
                        <span id="price-final">
                          {(
                            product.default_variant.price.selling_price / 10
                          ).toLocaleString("fa-IR")}
                        </span>
                        <div className="d-flex">
                          <div
                            className={`${styles.product_price_icon} cube-font-icon`}
                            data-icon-name="cube-toman"
                            data-icon="&#xE953;"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopFrequentProducts;

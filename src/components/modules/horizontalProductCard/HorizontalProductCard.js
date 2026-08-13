import Link from "next/link";

import styles from "./horizontalProductCard.module.css";

function HorizontalProductCard({ product }) {
  const digikalaJetShipment =
    product?.default_variant?.digiplus?.is_jet_eligible;
  const sellerShipment =
    product?.default_variant?.properties?.is_ship_by_seller;
  const time = product?.default_variant?.price?.timer;
  const price = product?.default_variant?.price?.rrp_price;
  const sellingPrice = product?.default_variant?.price?.selling_price;
  const percent = product?.default_variant?.price?.discount_percent;

  return (
    <Link
      target="_blank"
      href={product?.url ? product?.url?.uri : "#"}
      className={styles.product_link}
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
        <p className={styles.product_title}>{product?.title_fa}</p>
        <div className={styles.product_price_container}>
          <div className={styles.product_price__discount_wrapper}>
            <span className={styles.product_price__discount}>
              {percent?.toLocaleString("fa-IR")}٪
            </span>
          </div>
          <span className={styles.product_price}>
            {(price / 10).toLocaleString("fa-IR")}
          </span>
          <div className="d-flex align-items-center">
            {percent !== 0 ? (
              <span className={styles.product_final_price}>
                {(sellingPrice / 10).toLocaleString("fa-IR")}
              </span>
            ) : (
              ""
            )}
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.product_price_icon}>
                <use href="#toman"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HorizontalProductCard;

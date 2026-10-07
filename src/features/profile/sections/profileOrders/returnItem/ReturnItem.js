import Link from "next/link";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./returnItem.module.css";

export default function ReturnItem({ order }) {
  return (
    <div className={styles.return_item}>
      <div className={styles.header}>
        <div className={styles.return_details}>
          <div className="d-flex align-items-center">
            <div className={styles.return_date}>
              <p>{toPersianDigits(order.created_at)}</p>
            </div>
          </div>

          <div className={styles.divider}>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.divider_icon}>
                <use href="#dotOutline"></use>
              </svg>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className={styles.return_code_title}>کد پیگیری مرجوعی</div>
            <div className={styles.return_code}>
              {toPersianDigits(order.id)}
            </div>
          </div>

          <div className={styles.divider}>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.divider_icon}>
                <use href="#dotOutline"></use>
              </svg>
            </div>
          </div>

          <div className="d-flex align-items-center">
            <div className={styles.return_price_title}>مبلغ مرجوعی</div>
            <div className={styles.return_price_container}>
              <div className="d-flex justify-content-start align-items-center">
                <div className={styles.return_price}>
                  {(order.total_price / 10).toLocaleString("fa-IR")}
                </div>
                <div className="h-4 w-4">
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

        <div className={styles.mobile_return_details}>
          <div className={styles.mobile_return_header}>
            <div className="d-flex align-items-center">
              <div className={styles.return_code_title}>کد پیگیری مرجوعی</div>
              <div className={styles.return_code}>
                {toPersianDigits(order.id)}
              </div>
            </div>
            <Link
              className="me-auto"
              href={`/profile/orders/return/${order.id}/`}
            >
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.chevron_icon}>
                  <use href="#chevronLeft"></use>
                </svg>
              </div>
            </Link>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div className={styles.return_date}>
              {toPersianDigits(order.created_at)}
            </div>
            <div className={styles.return_price_container}>
              <div className="d-flex justify-content-start align-items-center">
                <div className={styles.return_price}>
                  {(order.total_price / 10).toLocaleString("fa-IR")}
                </div>
                <div className="h-4 w-4">
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

      <div className={styles.return_items_container}>
        {order.return_request_items.map((item) => (
          <div key={item.id} className={styles.return_product}>
            <div className={styles.return_item_header}>
              <div className={styles.return_item_status}>
                <div
                  className={styles.status_img_container}
                  aria-hidden="true"
                  aria-label=""
                >
                  <img
                    className={styles.status_img}
                    width="18"
                    height="18"
                    alt=""
                    title=""
                    src="https://api.digikala.com/static/files/4840c1d7.svg"
                  />
                </div>
                {item.status}
              </div>

              <Link
                className={styles.product_link}
                href={item.order_item.product.url.uri || "#"}
              >
                <div className="w-100 d-flex align-items-start justify-content-between">
                  <div className={styles.return_item_detials}>
                    <div
                      className={styles.product_img_container}
                      role="img"
                      aria-hidden="false"
                      aria-label={item.order_item.product.title_fa}
                    >
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={item.order_item.product.images.main.url[0]}
                        />
                        <source
                          type="image/jpeg"
                          srcSet={item.order_item.product.images.main.url[0]}
                        />
                        <img
                          className={styles.product_img}
                          width="60"
                          height="60"
                          alt={item.order_item.product.title_fa}
                          title=""
                          src={item.order_item.product.images.main.url[0]}
                        />
                      </picture>
                    </div>
                    <div className={styles.product_quantity}>
                      {toPersianDigits(item.order_item.returned_quantity)}
                    </div>
                  </div>
                  <div className={styles.product_infos}>
                    <div className={styles.product_title}>
                      {item.order_item.product.title_fa}
                    </div>
                    <div className={styles.return_reason}>
                      <div
                        className={styles.info_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.info_icon}>
                          <use href="#infoOutline"></use>
                        </svg>
                      </div>
                      {item.return_reason.title}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

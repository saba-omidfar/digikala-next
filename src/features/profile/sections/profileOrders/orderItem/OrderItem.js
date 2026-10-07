import Link from "next/link";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./orderItem.module.css";

export default function OrderItem({ order }) {
  const items = order?.product_images || order?.items;
  console.log("orderItems=>", order);

  return (
    <Link href={`/profile/orders/${order?.id}`} className={styles.link}>
      <div className={styles.header}>
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex flex-column">
            <div className={styles.header_status}>
              <div className={styles.status_icon_container}>
                <div className="position-relative">
                  <div className="d-flex" aria-hidden="false">
                    <svg
                      className={
                        order?.status === "sent"
                          ? styles.status_icon
                          : styles.status_cancel_icon
                      }
                    >
                      <use
                        href={order?.status === "sent" ? "#active" : "#clear"}
                      ></use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={styles.status_title}>
                {order?.status === "sent"
                  ? "تحویل شده"
                  : order?.status === "canceled"
                    ? "لغو شده"
                    : "لغو سیستمی"}
              </div>
            </div>
          </div>
          <div>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.chevron_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.order_details}>
          <div className="d-flex align-items-center">
            <div className={styles.order_date}>
              <p>{toPersianDigits(order?.created_at)}</p>
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
            <div className={styles.order_code_title}>کد سفارش</div>
            <div className={styles.order_code}>
              {toPersianDigits(order?.id)}
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
            <div className={styles.order_price_title}>مبلغ</div>
            <div className={styles.order_price_container}>
              <div className="d-flex justify-content-start align-items-center">
                <div className={styles.order_price}>
                  {(order?.payable_price / 10).toLocaleString("fa-IR")}
                </div>
                <div className={styles.price_icon_container}>
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
        <div className={styles.mobile_order_code}>
          <div className="d-flex align-items-center">
            <div className={styles.order_code_title}>کد سفارش</div>
            <div className={styles.order_code}>
              {toPersianDigits(order?.id)}
            </div>
          </div>
        </div>

        <div className={styles.mobile_order_details}>
          <div className="d-flex align-items-center">
            <div className={styles.order_date}>
              <p>{toPersianDigits(order?.created_at)}</p>
            </div>
          </div>
          <div className="d-flex justify-content-start align-items-center">
            <div className={styles.order_price}>
              {(order?.payable_price / 10).toLocaleString("fa-IR")}
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

      <div className={styles.order_items_container}>
        <div className={styles.order_items_contents}>
          <div className={styles.order_items}>
            {items?.slice(0, 7).map((item, index) => (
              <div className={styles.product_item} key={index}>
                <div
                  layout="fill"
                  className={styles.product_img_container}
                  aria-hidden="true"
                  aria-label=""
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={
                        item?.product?.images?.main?.url?.[0] || item?.url?.[0]
                      }
                    />
                    <source
                      type="image/jpeg"
                      srcSet={
                        item?.product?.images?.main?.url?.[0] || item?.url?.[0]
                      }
                    />
                    <img
                      className={styles.product_img}
                      alt=""
                      title=""
                      src={
                        item?.product?.images?.main?.url?.[0] || item?.url?.[0]
                      }
                    />
                  </picture>
                </div>
              </div>
            ))}
            {order?.product_images?.length > 7 ? (
              <div className={styles.product_item_more}>
                <div className={styles.product_item_more_count}>
                  {toPersianDigits(order?.product_images?.length - 7)}
                </div>
                {/* <div className="lg:hidden text-center">۲</div> */}
                <span className={styles.product_item_more_icon}>+</span>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* {order?.status === "sent" ? (
        <div className={styles.order_invoice}>
          <Link
            data-cro-id="profile-see-factor"
            className={styles.order_invoice_link}
            arget="blank"
            href={order?.invoice_url?.uri || "#"}
          >
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.order_invoice_icon}>
                <use href="#invoice"></use>
              </svg>
            </div>
            <span>مشاهده فاکتور</span>
          </Link>
        </div>
      ) : (
        ""
      )} */}
    </Link>
  );
}

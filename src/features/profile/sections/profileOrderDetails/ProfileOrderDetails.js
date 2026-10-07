"use client";
import { useRouter } from "nextjs-toploader/app";

import Link from "next/link";

import {
  useOrderDetails,
  useReorderItems,
} from "@/features/profile/hooks/useOrders";
import useScreenStatus from "@/hooks/useScreenStatus";

import toPersianDigits from "@/utils/toPersianDigits";

import Loading from "@/components/modules/loading/Loading";
import MobileProfileOrderDetails from "../mobileProfileOrderDetails/MobileProfileOrderDetails";

import styles from "./profileOrderDetails.module.css";

export default function ProfileOrderDetails({ orderId }) {
  const router = useRouter();
  const { isSmallScreen } = useScreenStatus();

  const { data: order, isLoading } = useOrderDetails(orderId);
  const reOrderItems = useReorderItems(orderId);

  const goBackHandler = () => {
    router.push("/profile/orders/?activeTab=sent");
  };

  const reorderItemsHandler = async () => {
    try {
      await reOrderItems.mutateAsync({ orderId });
      router.push("/checkout/cart");
    } catch (error) {
      console.error("Reorder failed:", error);
    }
  };

  if (isSmallScreen)
    return (
      <MobileProfileOrderDetails
        order={order}
        reorderItemsHandler={reorderItemsHandler}
      />
    );

  if (isLoading) return null;

  return (
    <div className={styles.profile_content}>
      <div className={styles.profile_header_container}>
        <div className={styles.profile_header}>
          <div className={styles.back_icon_container} onClick={goBackHandler}>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.back_icon}>
                <use href="#arrowRight"></use>
              </svg>
            </div>
          </div>
          <div className={styles.profile_title}>جزئیات سفارش</div>
        </div>
        <div className={styles.order_details_container}>
          <div className={styles.order_header}>
            <div className={styles.order_row_details}>
              <div className={styles.order_row_details_title}>
                کد پیگیری سفارش
              </div>
              <div className={styles.order_row_details_value}>
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

            <div className={styles.order_row_details}>
              <div className={styles.order_row_details_title}>
                تاریخ ثبت سفارش
              </div>
              <div className={styles.order_row_details_value}>
                <p>{toPersianDigits(order?.created_at)}</p>
              </div>
            </div>
          </div>
          <div className={styles.order_row}>
            <div className={styles.order_row_details}>
              <div className={styles.order_row_details_title}>تحویل گیرنده</div>
              <div className={styles.order_row_details_value}>صبا امیدفر</div>
            </div>

            <div className={styles.divider}>
              <div className="d-flex" aria-hidden="false">
                <svg className={styles.divider_icon}>
                  <use href="#dotOutline"></use>
                </svg>
              </div>
            </div>

            <div className={styles.order_row_details}>
              <div className={styles.order_row_details_title}>شماره موبایل</div>
              <div className={styles.order_row_details_value}>۰۹۳۸۵۰۸۵۸۰۶</div>
            </div>
          </div>
          <div className={styles.order_address}>
            <div className={styles.order_row_details}>
              <div className={styles.order_row_details_title}>آدرس</div>
              <div className={styles.order_row_details_value}>
                گرگان خیابان دانشجو نبش دانشجو ۲۷
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={styles.transaction_history_container}
        id="transaction-history"
      >
        <div className={styles.transaction_history}>
          <div className={styles.order_row_details}>
            <div className={styles.order_price_title}>مبلغ</div>
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

          <div className={styles.divider}>
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.divider_icon}>
                <use href="#dotOutline"></use>
              </svg>
            </div>
          </div>

          <div className={styles.order_row_details}>
            <div className={styles.order_payment_method}>
              <span className={styles.order_payment_method_value}>
                {order?.payment_method?.title_fa}
              </span>
            </div>
          </div>

          <div className={styles.order_shipments_container}>
            <div className={styles.order_row_details}>
              <div className={styles.order_shipments_title}>
                هزینه ارسال (بر اساس وزن و حجم){" "}
              </div>
              <div className={styles.order_shipments_cost_container}>
                <div className="d-flex justify-content-start align-items-center">
                  <div className={styles.order_shipments_cost}>
                    {toPersianDigits(order?.shipments?.[0]?.cost)}
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
        </div>
      </div>

      <div className={styles.order_infos_container}>
        <div className={styles.order_infos}>
          <div className={styles.order_infos_header}>
            <div className={styles.order_infos_shipment_row}>
              <div className={styles.order_infos_shipment_title}>
                <span>مرسوله</span>
                <span>۱</span>
                <span>از</span>
                <span>۱</span>
              </div>
              <div className={styles.divider}>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.divider_icon}>
                    <use href="#dotOutline"></use>
                  </svg>
                </div>
              </div>
              <div className={styles.order_infos_shipment}>
                <div>
                  <div
                    className={styles.order_infos_shipment_img_container}
                    aria-hidden="true"
                    aria-label=""
                  >
                    <picture>
                      <source
                        type="image/webp"
                        srcSet="https://dkstatics-public.digikala.com/delivery-submit-type/16060603.png?x-oss-process=image/format,webp"
                      />
                      <source
                        type="image/jpeg"
                        srcSet="https://dkstatics-public.digikala.com/delivery-submit-type/16060603.png"
                      />
                      <img
                        className={styles.order_infos_shipment_img}
                        width="18"
                        height="18"
                        alt=""
                        title=""
                        src="https://dkstatics-public.digikala.com/delivery-submit-type/16060603.png"
                      />
                    </picture>
                  </div>
                </div>
                <p className={styles.order_infos_shipment_text}>ارسال عادی</p>
              </div>
              {/* <div className="text-subtitle text-neutral-500 lg:hidden">
                  ۶ کالا
                </div> */}
              {/* <div className="text-body-1 text-secondary-500 mr-auto cursor-pointer lg:hidden"></div> */}
            </div>

            <div className={styles.parcel_progress}>
              <div className={styles.shipping_progress}>
                <div className={styles.shipping_progress__opacity_low}></div>
                <div className="position-relative">
                  <div className={styles.parcel_progress_content}>
                    <h6 className={styles.parcel_progress_title}>
                      <div className={styles.parcel_progress_text}>
                        تحویل مرسوله به مشتری
                      </div>
                    </h6>
                  </div>
                  <div className={styles.shipping_progress__bar_height}>
                    <div className={styles.shipping_progress__bar_success}>
                      <div className={styles.shipping_progress_icon_container}>
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.shipping_progress_icon}>
                            <use href="#done"></use>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.parcel_code}>
              <div className={styles.parcel_title}>
                کد پیگیری مرسوله
                <span className={styles.parcel_icon}>:</span>
              </div>
              <div className={styles.parcel_text}>
                <span className={styles.parcel_subtext}>
                  {toPersianDigits(order?.shipments?.[0]?.id)}
                </span>
              </div>
            </div>

            <div className={styles.parcel_date}>
              <div className={styles.parcel_title}>
                زمان تحویل<span className={styles.parcel_icon}>:</span>
              </div>
              <div className={styles.parcel_text}>
                {toPersianDigits(order?.shipments?.[0]?.date)}
              </div>
            </div>

            <div className={styles.parcel_price}>
              <div className={styles.parcel_price_content}>
                <div className={styles.parcel_title}>
                  هزینه ارسال<span className={styles.parcel_icon}>:</span>
                </div>
                <div className={styles.parcel_text}>
                  {toPersianDigits(order?.shipments?.[0]?.cost)}
                  <div className="d-flex" aria-hidden="false">
                    <svg className={styles.price_icon}>
                      <use href="#toman"></use>
                    </svg>
                  </div>
                </div>
              </div>

              <div className={styles.divider}>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.divider_icon}>
                    <use href="#dotOutline"></use>
                  </svg>
                </div>
              </div>

              <div className={styles.parcel_price_content}>
                <div className={styles.parcel_title}>
                  مبلغ مرسوله<span className={styles.parcel_icon}>:</span>
                </div>
                <div className={styles.parcel_text}>
                  {(order?.payable_price / 10).toLocaleString("fa-IR")}
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

      <div className={styles.order_products_container}>
        {order?.order_items?.map((item) => (
          <div key={item?.id} className={styles.order_product}>
            <div className={styles.product_item} data-testid="cart-item">
              <div className={styles.product_item_grid}>
                <div className="d-flex flex-column align-items-center">
                  <Link
                    className="position-relative"
                    href={item?.product?.url.uri || "#"}
                  >
                    <div
                      role="img"
                      aria-hidden="false"
                      aria-label={item?.product?.title_fa}
                      className={styles.product_img_container}
                    >
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={item?.product?.images?.main?.url?.[0]}
                        />
                        <source
                          type="image/jpeg"
                          srcSet={item?.product?.images?.main?.url?.[0]}
                        />
                        <img
                          className={styles.product_img}
                          width="114"
                          height="114"
                          alt={item?.product?.title_fa}
                          title=""
                          src={item?.product?.images?.main?.url?.[0]}
                        />
                      </picture>
                    </div>
                    <div className={styles.product_quantity}>
                      {toPersianDigits(item?.quantity)}
                    </div>
                  </Link>
                  <div className="me-2"></div>
                </div>

                <div className="overflow-x-hidden">
                  <div>
                    <h3 className={styles.product_title}>
                      {item?.product?.title_fa}
                    </h3>
                    <div className="d-flex">
                      <div
                        className={styles.product_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.product_icon}>
                          <use href="#guarantee"></use>
                        </svg>
                      </div>
                      <div className={styles.product_warranty_title}>
                        {item?.product?.default_variant?.warranty?.title_fa}
                      </div>
                    </div>
                    <div className="d-flex">
                      <div
                        className={styles.product_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.product_icon}>
                          <use href="#seller"></use>
                        </svg>
                      </div>
                      <div className={styles.product_seller_title}>
                        {item?.product?.default_variant?.seller.title}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column align-items-center"></div>

                <div className={styles.price_box}>
                  {item?.discount_percent !== 0 ? (
                    <div className={styles.product_discount_text}>
                      <span className={styles.product_discount_value}>
                        {(
                          item?.price.rrp_price -
                          item?.price.selling_price / 10
                        ).toLocaleString("fa-IR")}
                      </span>
                      <div
                        className={styles.discount_icon_container}
                        aria-hidden="false"
                      >
                        <svg className={styles.discount_icon}>
                          <use href="#toman"></use>
                        </svg>
                      </div>
                      <span className={styles.product_discount_text}>
                        تخفیف
                      </span>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <div className={styles.product_price}>
                        <div className="d-flex justify-content-start align-items-center gap-2">
                          <span className={styles.product_price_value}>
                            {(item?.price.selling_price / 10).toLocaleString(
                              "fa-IR",
                            )}
                          </span>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="d-flex" aria-hidden="false">
                              <svg className={styles.product_price_icon}>
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

              {/* RATE */}
              {/* <div className={styles.product_rate_box}>
                <div className={styles.product_rate}>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className={styles.product_rate_title}>امتیاز دهید!</p>
                    <div className={styles.product_rate_icons}>
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.rate_icon}>
                            <use href="#starOutline"></use>
                          </svg>
                        </div>
                        <p className={styles.rate_icon_text}>۱</p>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.rate_icon}>
                            <use href="#starOutline"></use>
                          </svg>
                        </div>
                        <p className={styles.rate_icon_text}>۲</p>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.rate_icon}>
                            <use href="#starOutline"></use>
                          </svg>
                        </div>
                        <p className={styles.rate_icon_text}>۳</p>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.rate_icon}>
                            <use href="#starOutline"></use>
                          </svg>
                        </div>
                        <p className={styles.rate_icon_text}>۴</p>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <div className="d-flex" aria-hidden="false">
                          <svg className={styles.rate_icon}>
                            <use href="#starOutline"></use>
                          </svg>
                        </div>
                        <p className={styles.rate_icon_text}>۵</p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  className={styles.add_comment_btn}
                  data-cro-id="profile-add-comment"
                >
                  <div className="d-flex align-items-center justify-content-center position-relative flex-grow-1">
                    <div
                      className={styles.button_icon_container}
                      aria-hidden="false"
                    >
                      <svg className={styles.button_icon}>
                        <use href="#comment"></use>
                      </svg>
                    </div>
                    ثبت دیدگاه
                  </div>
                </button>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* خرید مجدد کالاهای مرسوله */}
      <div className={styles.reorder_btn_container}>
        <button className={styles.reorder_btn} onClick={reorderItemsHandler}>
          {reOrderItems.isLoading && (
            <div className={styles.loading_active}>
              <Loading isSmall />
            </div>
          )}
          <div
            className={`${
              reOrderItems.isLoading ? styles.btn_content_loading : ""
            } d-flex align-items-center justify-content-center position-relative flex-grow-1`}
          >
            خرید مجدد کالاهای مرسوله
          </div>
        </button>
      </div>
    </div>
  );
}

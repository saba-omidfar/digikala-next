import { useEffect } from "react";

import { useModal } from "@/contexts/modalContext";

import { useGetAddresses } from "@/features/profile/hooks/useAddress";
import { useCartContext } from "@/contexts/CartContext";
import { useUserContext } from "@/contexts/UserContext";
import { usePlans } from "@/hooks/usePlan";

import recalcCartPrices from "@/utils/recalcCartPrices";
import toPersianDigits from "@/utils/toPersianDigits";

import CompleteAddressModal from "@/features/cart/modals/completeAddressModal/CompleteAddressModal";
import LocationModal from "@/components/layout/header/modals/locationModal/LocationModal";
import PlusModal from "@/features/product/modals/plusModal/PlusModal";
import Loading from "@/components/modules/loading/Loading";
import PaymentSidebar from "../../sections/paymentSidebar/PaymentSidebar";
import Orders from "../../sections/orders/Orders";

import styles from "./shippingDesktop.module.css";

export default function ShippingDesktop() {
  const { openModal } = useModal();

  const { data } = useGetAddresses();
  const { guestCartId } = useUserContext();
  const { data: plans } = usePlans();
  const { userCart, removePlan, isLoadingRemovePlan } = useCartContext();

  const { cart } = recalcCartPrices(userCart?.cart);

  const activePlan = plans?.plans?.find(
    (plan) =>
      plan.title === userCart?.cart?.temporary_plus_subscription?.title || null,
  );

  const defaultAddress = data?.addresses?.find((address) => address.is_default);

  const selectedLocation = data?.addresses?.find(
    (address) => address.name === "موقعیت انتخابی",
  );

  const removePlanHandler = () => {
    removePlan({
      guestCartId,
    });
  };

  useEffect(() => {
    if (selectedLocation?.is_default) {
      openModal(
        <CompleteAddressModal
          isDefaultSelectedLocation={selectedLocation?.is_default}
        />,
        {
          name: "complete-address",
          ClassNames: "modal__complete_address rounded-medium",
        },
      );
    }
  }, [data]);

  return (
    <div className="h-100 d-flex flex-column align-items-center bg-white">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header_container}>
            <div className={styles.header}>
              <div>
                <div
                  role="img"
                  aria-hidden="false"
                  aria-label="digikala - دیجی کالا"
                  className={styles.header_logo_container}
                >
                  <img
                    className={styles.header_logo}
                    height="20"
                    alt="digikala - دیجی کالا"
                    title=""
                    src="https://www.digikala.com/statics/img/svg/digikala-header.svg"
                  />
                </div>
              </div>
              <a className={styles.cart_link} href="/checkout/cart/">
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.back_icon}>
                    <use href="#arrowRight"></use>
                  </svg>
                </div>
                <div className={styles.header_title}>آدرس و زمان ارسال</div>
              </a>
            </div>
          </div>
          <div className={styles.content_container}>
            <section className={styles.content_section}>
              <div className={styles.addresses_container}>
                <div className={styles.address_container}>
                  <div className="d-flex justify-content-between w-100 flex-column">
                    <div className="d-flex justify-content-start align-items-center w-100">
                      <div className={styles.address}>
                        <div
                          className={styles.delivery_icon_container}
                          aria-hidden="false"
                        >
                          <svg className={styles.delivery_icon}>
                            <use href="#deliveryHeavy"></use>
                          </svg>
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between w-100">
                            <div className={styles.address_content_title}>
                              ارسال به آدرس انتخاب شده
                            </div>
                            <div className="me-auto">
                              <span
                                className={styles.change_address}
                                data-cro-id="shipping-change-address"
                                onClick={() =>
                                  openModal(
                                    <LocationModal isConformAddress />,
                                    {
                                      name: "location",
                                      className:
                                        "modal__location rounded-large",
                                      size: "md",
                                    },
                                  )
                                }
                              >
                                <span>تغییر آدرس</span>
                                <div className="d-flex" aria-hidden="false">
                                  <svg className={styles.change_address_icon}>
                                    <use href="#chevronLeft"></use>
                                  </svg>
                                </div>
                              </span>
                            </div>
                          </div>

                          <div className={styles.address_title}>
                            {defaultAddress?.address}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.content_bottom_section}>
                <div className={styles.digiplus_content_container}>
                  <div className={styles.digiplus_content}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className={styles.digiplus}>
                        <div
                          className="d-flex flex-shrink-0"
                          aria-hidden="false"
                        >
                          <div
                            className={`${styles.digiplus_icon} cube-font-icon`}
                            data-icon-name="cube-badge-plus"
                            data-icon=""
                          ></div>
                        </div>
                        <dds-text variant="label-2" color="content/1">
                          {activePlan
                            ? `${activePlan?.title} پلاس افزوده شد!`
                            : "هر ماه ۱۰ ارسال رایگان با ‌پلاس!"}
                        </dds-text>
                      </div>
                      {activePlan ? (
                        <div
                          className={styles.remove_plan_btn}
                          aria-hidden="false"
                          onClick={removePlanHandler}
                        >
                          {isLoadingRemovePlan ? (
                            <Loading isSmall bgColor="rgb(166, 52, 137)" />
                          ) : (
                            <svg className={styles.remove_plan_icon}>
                              <use href="#delete"></use>
                            </svg>
                          )}
                        </div>
                      ) : (
                        <div className="d-flex align-items-center justify-content-end flex-shrink-0 whitespace-nowrap">
                          <div
                            className={styles.digiplus_btn}
                            onClick={() =>
                              openModal(<PlusModal />, {
                                name: "plus",
                                className: "modal__plus rounded-medium",
                              })
                            }
                          >
                            <dds-text variant="label-xs">افزودن</dds-text>
                            <div className="d-flex" aria-hidden="false">
                              <div
                                className={`${styles.digiplus_btn_icon} cube-font-icon`}
                                data-icon-name="cube-nav-chevron-left"
                                data-icon=""
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {activePlan ? (
                      <div className={styles.active_plan_text}>
                        هزینه ارسال سفارش‌های دارای شرایط پلاس رایگان می‌شود
                      </div>
                    ) : (
                      <div className={styles.digiplus_footer_text}>
                        ۴ ارسال دیجی‌کالا | ۲ ارسال هایپرمارکت | ۴ ارسال
                        سوپرمارکت
                      </div>
                    )}
                  </div>
                </div>

                {/* JET SHIPPING */}
                {/* <div className="d-flex flex-column">
                  <div className={styles.jet_shipping_container}>
                    <div className={styles.jet_shipping_title_section}>
                      <div className={styles.jet_shipping_header}>
                        <div
                          aria-hidden="true"
                          aria-label=""
                          className={styles.jet_shipping_logo_container}
                        >
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="https://www.digikala.com/statics/img/png/delivery-badge/tomorrow.webp"
                            />
                            <source
                              type="image/jpeg"
                              srcSet="https://www.digikala.com//statics/img/png/delivery-badge/tomorrow.png"
                            />
                            <img
                              className={styles.jet_shipping_logo}
                              width="80"
                              height="24"
                              alt=""
                              title=""
                              src="https://www.digikala.com//statics/img/png/delivery-badge/tomorrow.png"
                            />
                          </picture>
                        </div>

                        <dds-text variant="subtitle-3">
                          تحویل توسط دیجی‌کالا
                        </dds-text>
                      </div>
                      <div className={styles.jet_shipping_time_container}>
                        <dds-text variant="body-3">فردا تا ساعت ۱۲</dds-text>
                        <span className={styles.separator}></span>
                        <div className={styles.jet_shipping_time}>
                          <dds-text variant="body-3">هزینه ارسال</dds-text>
                          <dds-text variant="body-3">۱۹۳,۰۰۰ تومان</dds-text>
                        </div>
                      </div>
                    </div>

                    <div className={styles.jet_shipping_btn_section}>
                      <dds-action-chip
                        color="tertiary"
                        emphasis="outline"
                        placement="elevated"
                        size="md"
                        tabindex="0"
                      >
                        انتخاب کن
                        <dds-icon
                          slot="left"
                          name="nav-chevron-left"
                          aria-hidden="true"
                        ></dds-icon>
                      </dds-action-chip>
                    </div>
                  </div>
                </div> */}

                {/* NORMAL SHIPPING */}
                <div className={styles.normal_shipping_container}>
                  <div>
                    <div className={styles.normal_shipping_header}>
                      <div className={styles.normal_shipping_icon}>
                        <div
                          role="img"
                          aria-hidden="false"
                          aria-label="ارسال عادی"
                          className={styles.normal_shipping_img_container}
                        >
                          <picture>
                            <source
                              type="image/webp"
                              srcSet="https://dkstatics-public.digikala.com/delivery-submit-type/16060530.png?x-oss-process=image/resize,m_fill,h_48,w_48/quality,q_80/format,webp"
                            />
                            <source
                              type="image/jpeg"
                              srcSet="https://dkstatics-public.digikala.com/delivery-submit-type/16060530.png?x-oss-process=image/resize,m_fill,h_48,w_48/quality,q_90"
                            />
                            <img
                              width="36"
                              height="36"
                              alt="ارسال عادی"
                              title=""
                              src="https://dkstatics-public.digikala.com/delivery-submit-type/16060530.png?x-oss-process=image/resize,m_fill,h_48,w_48/quality,q_90"
                              className={styles.normal_shipping_img}
                            />
                          </picture>
                        </div>
                      </div>

                      <div className="flex-grow-1 d-flex flex-wrap justify-content-between align-items-start">
                        <div>
                          <div
                            className={styles.normal_shipping_title_container}
                          >
                            <span className={styles.normal_shipping_title}>
                              ارسال عادی
                            </span>
                            <span className={styles.normal_shipping_subtitle}>
                              {toPersianDigits(cart?.items_count)} کالا
                            </span>
                          </div>
                          <div className={styles.normal_shipping_text}>
                            ۱ روز
                          </div>
                        </div>
                      </div>
                    </div>

                    <Orders />

                    {/* Shipping time */}
                    {/* <div className={styles.shipping_time_container}>
                      <section>
                        <div>
                          <div className="d-flex align-items-center">
                            <div className={styles.shipping_time}>
                              <div
                                className={styles.time_icon_container}
                                aria-hidden="false"
                              >
                                <svg className={styles.time_icon}>
                                  <use href="#time"></use>
                                </svg>
                              </div>
                              <span className={styles.shipping_time_header}>
                                <div className="d-flex">
                                  <span
                                    className={styles.shipping_time_price_title}
                                  >
                                    هزینه ارسال
                                  </span>
                                  <div>
                                    <div className="d-flex align-items-center justify-content-start">
                                      <div className="d-flex justify-content-start align-tems-center gap-1">
                                        <span
                                          className={styles.shipping_time_price}
                                        >
                                          ۱۹۹,۰۰۰
                                        </span>
                                      </div>
                                      <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center">
                                          <div
                                            className="d-flex"
                                            aria-hidden="false"
                                          >
                                            <svg className={styles.price_icon}>
                                              <use href="#toman"></use>
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="d-flex align-items-center justify-content-center mx-1">
                                    <div>
                                      <div className="d-flex align-items-center justify-content-start">
                                        <div className="d-flex justify-content-start align-items-center gap-1">
                                          <span
                                            className={
                                              styles.shipping_time_price_discount
                                            }
                                          >
                                            ۱۸۷,۰۰۰
                                          </span>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <div
                                              className="d-flex"
                                              aria-hidden="false"
                                            >
                                              <svg
                                                className={styles.price_icon}
                                              >
                                                <use href="#toman"></use>
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </section>
                    </div> */}
                  </div>
                </div>
              </div>
            </section>
            <PaymentSidebar
              cart={cart}
              itemsCount={userCart?.cart?.items_count}
              activePlan={activePlan}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

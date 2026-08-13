import ShipmentModal from "@/features/product/modals/shipmentModal/ShipmentModal";

import toPersianDigits from "@/utils/toPersianDigits";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";

import styles from "./shipmentBox.module.css";

const shippingModes = {
  jet: {
    icon: "deliveryToday",
    class: styles.jet_delivery_icon,
  },
  seller: {
    icon: "deliveryInPerson",
    class: styles.seller_delivery_icon,
  },
  digikala: {
    icon: "deliveryExpress",
    class: styles.digikala_delivery_icon,
  },
};

export default function ShipmentBox() {
  const { openModal } = useModal();
  const { activeVariant } = useProductContext();

  return (
    <div
      className="w-100 px-3 d-flex position-relative"
      onClick={() =>
        openModal(
          <ShipmentModal
            shippingModes={shippingModes}
            shipmentMethods={activeVariant?.shipment_methods}
          />,
          { className: "modal__shipment rounded-medium" },
        )
      }
    >
      <div className={styles.shipment_info}>
        <div className="w-100 d-flex flex-column">
          <div className="d-flex flex-row justify-content-start align-items-center mb-2">
            <div className="d-flex ms-3">
              <div
                data-icon-name="cube-shop-product-available"
                data-icon="&#xE98C;"
                className={`${styles.shipment_info_icon} cube-font-icon`}
              ></div>
            </div>
            <p className={styles.shipment_info_title}>
              روش‌ها و هزینه‌های ارسال
            </p>
            <div className="d-flex me-auto" aria-hidden="false">
              <svg className={styles.chevron_left_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </div>
          <ul className="d-flex flex-column">
            {activeVariant?.shipment_methods?.providers?.map(
              (method, index) => {
                const currentMode =
                  shippingModes[method?.type] || shippingModes.digikala;

                return (
                  <li key={index} className="d-flex ms-3 align-items-center">
                    <div className={styles.list_item__bullet_container}>
                      <div className="d-flex" aria-hidden="false">
                        <svg className={styles.list_item__bullet}>
                          <use href="#variationColor"></use>
                        </svg>
                      </div>
                      <span
                        className={styles.list_item__bullet_line_top}
                      ></span>
                    </div>
                    <div className="d-flex" aria-hidden="false">
                      <svg className={currentMode.class}>
                        <use href={`#${currentMode.icon}`}></use>
                      </svg>
                    </div>

                    <div className={styles.delivery_jet_text_container}>
                      <span className={styles.delivery_jet_text}>
                        {method?.label?.title}
                      </span>
                      <span className={styles.delivery_price_text_container}>
                        <span className={styles.bullet_icon}> • </span>
                        <div style={{ display: "contents" }}>
                          <div className={styles.delivery_price_text}>
                            {toPersianDigits(method?.price?.text)}
                            {method?.price?.value && (
                              <>
                                {toPersianDigits(method?.price?.value)}
                                <div
                                  className={styles.price_icon_container}
                                  aria-hidden="false"
                                >
                                  <svg className={styles.price_icon}>
                                    <use href="#toman"></use>
                                  </svg>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </span>
                    </div>
                  </li>
                );
              },
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

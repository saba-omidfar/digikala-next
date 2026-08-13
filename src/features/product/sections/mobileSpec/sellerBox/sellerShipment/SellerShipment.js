import ShipmentModal from "@/features/product/modals/shipmentModal/ShipmentModal";

import { useModal } from "@/contexts/modalContext";
import { useProductContext } from "@/contexts/ProductContext";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./sellerShipment.module.css";

function SellerShipment() {
  const { openModal } = useModal();
  const { activeVariant } = useProductContext();

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

  return (
    <div
      className={styles.shipment_container}
      onClick={() =>
        openModal(
          <ShipmentModal
            shippingModes={shippingModes}
            shipmentMethods={activeVariant?.shipment_methods}
          />,
          { name: "shipment", className: "rounded-medium" },
        )
      }
    >
      <div className="position-relative">
        <div className={styles.shipment_icon_bg} aria-hidden="false">
          <div
            className={`${styles.shipment_icon} cube-font-icon`}
            data-icon-name="cube-shop-product-available"
            data-icon=""
          ></div>
        </div>
      </div>
      <div className={styles.shipment_title_container}>
        <div className="d-flex justify-content-between align-items-center">
          <span className={styles.shipment_title}>
            {activeVariant?.shipment_methods?.providers?.length > 1
              ? "روش‌ها و هزینه‌های ارسال"
              : "روش‌ و هزینه ارسال"}
          </span>
          <div className="flex" aria-hidden="false">
            <div
              className={`${styles.chevron_icon} cube-font-icon`}
              data-icon-name="cube-nav-chevron-left"
              data-icon=""
            ></div>
          </div>
        </div>
        <ul>
          {activeVariant?.shipment_methods?.providers?.map((method, index) => {
            const currentMode =
              shippingModes[method.type] || shippingModes.digikala;

            return (
              <li key={index} className={styles.delivery_container}>
                <div className="d-flex" aria-hidden="false">
                  <svg
                    className={`${styles.delivery_icon} ${currentMode.class}`}
                  >
                    <use href={`#${currentMode.icon}`}></use>
                  </svg>
                </div>
                <div className={styles.delivery_title_container}>
                  <span className={styles.delivery_title}>
                    {method?.label?.title}
                  </span>
                  {method?.price ? (
                    <span className={styles.method_price_text_container}>
                      <span className={styles.bulet_icon}>•</span>
                      <div style={{ display: "contents" }}>
                        <div
                          className={
                            styles.modal_content_list_item_title_subText
                          }
                        >
                          {toPersianDigits(method?.price?.text)}
                        </div>
                      </div>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SellerShipment;

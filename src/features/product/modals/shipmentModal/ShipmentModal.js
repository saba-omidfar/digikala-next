import { useModal } from "@/contexts/modalContext";

import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./shipmentModal.module.css";

export default function ShipmentModal({ shipmentMethods }) {
  const { closeModal } = useModal();

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

  const handleClose = () => {
    closeModal();
  };

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div
          className="d-flex align-items-center h-100"
          style={{ borderBottom: "1px solid #e0e0e2" }}
        >
          <div className={styles.modal_header__title}>
            <div className="d-flex align-items-center flex-grow-1">
              <p className={styles.modal_header__title_text}>
                <span className="position-relative">
                  {shipmentMethods?.providers?.length > 1
                    ? "روش‌ها و هزینه‌های ارسال"
                    : "روش‌ و هزینه ارسال"}
                </span>
              </p>
            </div>
          </div>
          <div className="d-flex" onClick={handleClose}>
            <svg
              data-test-id="close-modal-icon-button"
              className={styles.modal_close_btn}
            >
              <use href="#close"></use>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex flex-column flex-grow-1 overflow-y-auto">
        <div className={styles.modal_content_container}>
          {shipmentMethods?.providers?.map((method, index) => {
            const currentMode =
              shippingModes[method?.type] || shippingModes.digikala;

            return (
              <div key={index} style={{ color: "#424242" }}>
                <li className={styles.modal_content_list_item}>
                  <div className="d-flex" aria-hidden="false">
                    <svg className={currentMode.class}>
                      <use href={`#${currentMode.icon}`}></use>
                    </svg>
                  </div>
                  <div
                    className={styles.modal_content_list_item_title_container}
                  >
                    <div className={styles.modal_content_list_item_title}>
                      <span
                        className={styles.modal_content_list_item_title_text}
                      >
                        {method?.label?.title}
                      </span>
                      {method?.price ? (
                        <span className={styles.method_price_text_container}>
                          <span className={styles.bulet_icon}>•</span>
                          <div style={{ display: "contents" }}>
                            {method?.price?.value ? (
                              <div className={styles.method_price_value}>
                                {(method?.price?.value / 10)?.toLocaleString(
                                  "fa-IR",
                                )}
                                <div
                                  className={styles.price_icon_container}
                                  aria-hidden="false"
                                >
                                  <svg className={styles.price_icon}>
                                    <use href="#toman"></use>
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {method?.price?.text ? (
                              <div
                                className={
                                  styles.modal_content_list_item_title_subText
                                }
                              >
                                {toPersianDigits(method?.price?.text)}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </li>
                <p className={styles.modal_content_list_item_subtitle}>
                  <span
                    className={styles.modal_content_list_item_subtitle_text}
                  >
                    {method?.description}
                  </span>
                </p>
              </div>
            );
          })}
          <div className={styles.close_btn} onClick={handleClose}>
            باشه، فهمیدم
          </div>
        </div>
      </div>
    </div>
  );
}

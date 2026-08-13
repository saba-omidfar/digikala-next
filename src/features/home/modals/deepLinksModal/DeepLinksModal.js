import React from "react";
import Link from "next/link";
import Image from "next/image";

import { useModal } from "@/contexts/modalContext";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./deepLinksModal.module.css";

export default function DeepLinksModal({ deepLinks }) {
  const { closeModal } = useModal();
  const { isSmallScreen } = useScreenStatus();

  const services = deepLinks?.filter(
    (link) => !link.is_digikala_group_service || !link.is_digikala_service,
  );
  const groupServices = deepLinks?.filter(
    (link) => link.is_digikala_group_service || link.is_digikala_service,
  );

  return (
    <div className={styles.modal_layout}>
      <div className={styles.modal_header}>
        <div
          className="d-flex align-items-center"
          style={{ borderBottom: "1px solid #e0e0e2" }}
        >
          <div className={styles.modal_header__title}>
            <div className="d-flex align-items-center flex-grow-1">
              <div className={styles.header_icon_container} aria-hidden="false">
                <svg className={styles.header_icon}>
                  <use href="#dkSmile"></use>
                </svg>
              </div>
              <p className={styles.modal_header__title_text}>
                <span className="position-relative">خدمات دیجی‌کالا</span>
              </p>
            </div>
          </div>
          <div className="d-flex" onClick={() => closeModal()}>
            <div
              data-icon-name="cube-value-close"
              data-icon="&#xE907;"
              className={`${styles.modal_close_btn} cube-font-icon`}
            ></div>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column w-100 overflow-y-auto flex-grow-1">
        <div className={styles.modal_content_container}>
          <div className={styles.modal_content}>
            <div className={styles.services_container}>
              {services?.map((service) => (
                <Link
                  key={service.id}
                  target="_blank"
                  href={service?.url?.url || "#"}
                  className={styles.services_item_link}
                >
                  <div className={styles.services_item_img}>
                    <Image
                      width={52}
                      height={52}
                      className={styles.service_img}
                      src={service?.image?.url}
                      alt={service?.title}
                    />
                  </div>
                  <span className={styles.services_item_caption}>
                    {service?.title}
                  </span>
                </Link>
              ))}
            </div>
            <h4 className={styles.ventures_title}>سرویس‌های گروه دیجی‌کالا</h4>
            <div className={styles.ventures_container}>
              {groupServices?.map((service) => (
                <Link
                  key={service.id}
                  target="_blank"
                  href={service?.url?.url || "#"}
                  className={styles.ventures_item}
                >
                  <div className={styles.ventures_item_img}>
                    <Image
                      fill
                      src={service?.image?.url}
                      alt={service?.title}
                    />
                  </div>
                  <div className="me-2 flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between">
                      <p className={styles.ventures_item__content_title}>
                        {service?.title}
                      </p>
                      <div
                        className={styles.ventures_item__content_icon_container}
                      >
                        <svg className={styles.ventures_item__content_icon}>
                          <use href="#arrowLeft"></use>
                        </svg>
                      </div>
                    </div>
                    {service.description && (
                      <p className={styles.ventures_item__content_caption}>
                        {service?.description}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";

import { useOrdersTabs } from "@/features/profile/hooks/useOrders";
import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./ordersContent.module.css";

export default function OrdersContent() {
  const { data: tabs } = useOrdersTabs();

  const orderStatuses = [
    {
      key: "in_progress",
      icon: "https://www.digikala.com/statics/img/svg/status-processing.svg",
    },
    {
      key: "sent",
      icon: "https://www.digikala.com/statics/img/svg/status-delivered.svg",
    },
    {
      key: "returned",
      icon: "https://www.digikala.com/statics/img/svg/status-returned.svg",
    },
  ];

  return (
    <div className={styles.profile_content}>
      <div className={styles.profile_header_container}>
        <div className={styles.profile_header}>
          <div className="d-flex align-items-center flex-grow-1">
            <p className={styles.profile_title}>
              <span className="position-relative">سفارش‌های من</span>
            </p>
          </div>

          <div className={styles.profile_title__line_red}></div>
        </div>

        <span data-cro-id="profile-all-orders">
          <Link className={styles.profile_link} href="/profile/orders/">
            <span>مشاهده همه</span>

            <div className="d-flex" aria-hidden="false">
              <svg className={styles.chevron_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </Link>
        </span>
      </div>

      <div className={styles.orders_content}>
        {orderStatuses.map((status) => {
          const tab = tabs?.[status.key];

          return (
            <Link
              key={status.key}
              data-cro-id={`profile-orders-${status.key}`}
              className={styles.order_status}
              href={`/profile/orders/?activeTab=${status.key}`}
            >
              <div className="position-relative">
                <div
                  role="img"
                  aria-hidden="false"
                  aria-label="icon"
                  className={styles.order_img_container}
                >
                  <img
                    className={styles.order_img}
                    alt="icon"
                    src={status.icon}
                  />
                </div>

                <div className={styles.order_status_count}>
                  {toPersianDigits(tab?.count || 0)}
                </div>
              </div>

              <div className="d-flex flex-column justify-content-between">
                <div className={styles.order_status_title}>
                  {toPersianDigits(tab?.count || 0)} سفارش
                </div>

                <span className={styles.order_status_subtitle}>
                  {tab?.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

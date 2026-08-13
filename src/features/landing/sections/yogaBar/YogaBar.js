import React from "react";
import Link from "next/link";
import Image from "next/image";

import items from "../../../../../data/YogaBar";
import useScreenStatus from "@/hooks/useScreenStatus";

import styles from "./yogaBar.module.css";

function YogaBar() {
  const { isSmallScreen, isSmallMobile } = useScreenStatus();

  return (
    <div className={styles.yogabar_container}>
      {items.map((item, index) => (
        <div key={index} className={styles.yogabar_item_container}>
          <div className="d-flex align-items-center">
            <div className={styles.yogabar_title_container}>
              <div className="w-100 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <h4 className={styles.yogabar_title}>{item.title}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.widget_yoga__content}>
            <div className={styles.widget_yoga__big_item}>
              <Link
                href={item.products[0].productImageUrl}
                target="_blank"
                className={styles.widget_yoga__item_link}
              >
                <span className={styles.widget_yoga__img_container}>
                  <div className="h-100 w-100" style={{ lineHeight: "0" }}>
                    <Image
                      width={isSmallMobile ? 158 : 293}
                      height={isSmallMobile ? 158 : 293}
                      src={item.products[0].productImageSrc}
                      className={styles.widget_yoga__img}
                      alt=""
                    />
                  </div>
                </span>
              </Link>
            </div>
            {item.products
              .slice(1, isSmallScreen ? 3 : 5)
              .map((product, idx) => (
                <div key={idx}>
                  <Link
                    href="#"
                    target="_blank"
                    className={styles.widget_yoga__item_link}
                  >
                    <span className={styles.widget_yoga__img_container}>
                      <div className="h-100" style={{ lineHeight: "0" }}>
                        <img
                          src={product.productImageSrc}
                          className={styles.widget_yoga__img}
                          alt=""
                        />
                      </div>
                    </span>
                  </Link>
                </div>
              ))}
          </div>
          {isSmallScreen && (
            <div className={styles.see_more_btn}>
              <Link
                className={styles.see_more_url}
                target="_blank"
                href="https://www.digikala.com/product_list/plp_93733763/?sort=4"
              >
                مشاهده
                <div className="d-flex">
                  <div
                    data-icon-name="cube-nav-chevron-left"
                    data-icon="&#xE9C2;"
                    className={`${styles.trailing_icon} cube-font-icon`}
                  ></div>
                </div>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default YogaBar;

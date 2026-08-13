import Link from "next/link";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./mobileBreadcrumb.module.css";

function MobileBreadcrumb() {
  const { productDetails } = useProductContext();

  return (
    <nav className={styles.breadcrumb_nav}>
      <div className="d-flex overflow-x-auto overflow-y-hidden hide-scrollbar">
        <div className={styles.padding_right}></div>

        {productDetails?.breadcrumb?.slice(0, -1).map((item, index) => (
          <div
            key={item?.category_id || item?.title}
            className="d-flex justify-content-center align-items-center"
          >
            <Link
              className={styles.breadcrumb_link}
              href={item?.url?.uri || "#"}
            >
              {item?.title}
            </Link>
            {index !== productDetails?.breadcrumb?.length - 2 ? (
              <div
                className={styles.chevron_icon_container}
                aria-hidden="false"
              >
                <div
                  className={`${styles.chevron_icon} cube-font-icon`}
                  data-icon-name="cube-nav-chevron-left"
                  data-icon="&#xE9C2;"
                ></div>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}

        <div className={styles.padding_right}></div>
      </div>
    </nav>
  );
}

export default MobileBreadcrumb;

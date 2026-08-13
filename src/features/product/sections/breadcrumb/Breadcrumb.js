import Link from "next/link";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./breadcrumb.module.css";

export default function Breadcrumb({
  textColor,
  textSize,
  textWeight,
  dividerCode,
  dividerIcon,
  textDecoration,
}) {
  const { productDetails } = useProductContext();

  return (
    <div className="d-flex justify-content-start align-items-center w-100 overflow-hidden">
      <Link
        className={styles.breadcrumb_link}
        href={productDetails?.brand?.url?.uri || "#"}
        style={{
          textDecoration: textDecoration,
          textUnderlineOffset: textDecoration ? "6px" : "",
          color: textColor,
        }}
      >
        <div className="d-flex align-items-center">
          <span
            className={styles.breadcrumb_link_text}
            style={{
              color: textColor ? textColor : "#1672dd",
              fontSize: textSize ? textSize : "",
              fontWeight: textWeight ? textWeight : "bold",
            }}
          >
            {productDetails?.brand?.title_fa}
          </span>
        </div>
      </Link>
      <div style={{ color: "#c0c2c5", margin: "0 6px" }}>
        {dividerCode ? (
          <div
            className={`${styles.divider} cube-font-icon`}
            data-icon={String.fromCharCode(parseInt(dividerCode, 16))}
          ></div>
        ) : (
          <>{dividerIcon}</>
        )}
      </div>
      <Link
        className={styles.breadcrumb_link}
        href={productDetails?.brand?.url || "#"}
        style={{
          textDecoration: textDecoration,
          textUnderlineOffset: textDecoration ? "6px" : "",
          color: textColor,
        }}
      >
        <div className="d-flex align-items-center">
          <span
            className={styles.breadcrumb_link_text}
            style={{
              color: textColor ? textColor : "#1672dd",
              fontSize: textSize ? textSize : "",
              fontWeight: textWeight ? textWeight : "bold",
            }}
          >
            {productDetails?.category?.title_fa}{" "}
            {productDetails?.brand?.title_fa}
          </span>
        </div>
      </Link>
    </div>
  );
}

import { useState } from "react";

import ProductContentTitle from "../productContentTitle/ProductContentTitle";
import SpecificationAttribute from "../SpecificationAttribute";

import { useProductContext } from "@/contexts/ProductContext";

import styles from "./specification.module.css";

function Specification() {
  const [isSpecificationExpended, setIsSpecificationExpended] = useState(false);

  const { productDetails } = useProductContext();
  if (!productDetails?.specifications) return null;

  return (
    <section className={styles.specification_container} id="specification">
      <ProductContentTitle title="مشخصات" />
      <div id="specification" className={styles.specification_content}>
        {!isSpecificationExpended ? (
          <div className={styles.specification_box_main}>
            <p className={styles.specification_box_title}>
              {productDetails?.specifications[0]?.title}
            </p>
            <div className="w-100 flex-grow-1">
              {productDetails?.specifications[0]?.attributes
                ?.slice(0.5)
                ?.map((specification, index) => (
                  <SpecificationAttribute
                    key={index}
                    specification={specification}
                  />
                ))}
            </div>
          </div>
        ) : (
          productDetails?.specifications?.map((specification) => (
            <div
              key={specification?.id}
              className={styles.specification_box_main}
            >
              <p className={styles.specification_box_title}>
                {specification?.title}
              </p>
              <div className="w-100 flex-grow-1">
                {specification?.attributes?.map((specification) => (
                  <SpecificationAttribute
                    key={specification?.id}
                    specification={specification}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      {productDetails?.specifications?.length > 1 ? (
        <span
          className={styles.specification_more_btn_container}
          onClick={() => setIsSpecificationExpended((prevStat) => !prevStat)}
        >
          <span id="more-detail">
            <span className={styles.specification_more_btn}>
              <span>{isSpecificationExpended ? "بستن" : "مشاهده بیشتر"}</span>
              <div className="d-flex">
                <div
                  data-icon-name="cube-nav-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.specification_more_icon} cube-font-icon`}
                ></div>
              </div>
            </span>
          </span>
        </span>
      ) : (
        ""
      )}
    </section>
  );
}
export default Specification;

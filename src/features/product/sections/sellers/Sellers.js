import { useState } from "react";

import SellerCard from "./SellerCard";

import styles from "./sellers.module.css";

function Sellers({ sellers }) {
  const [seeMoreLabel, setSeeMoreLabel] = useState(false);

  if (!sellers) return;

  return (
    <div id="sellerSection">
      <div className="w-100 px-3">
        <div className={styles.sellers_container}>
          <div className={styles.sellers_title_container}>
            <div className="d-flex align-items-center flex-grow-1">
              <h2 className={styles.sellers_title}>
                <span className="position-relative">فروشندگان این کالا</span>
              </h2>
            </div>
            <div className={styles.sellers_title_line}></div>
          </div>
          {(sellers?.length > 4 && seeMoreLabel
            ? sellers
            : sellers?.slice(0, 4)
          )?.map((seller, index) => (
            <SellerCard index={index} key={seller?.id} seller={seller} />
          ))}
          {sellers?.length > 4 && (
            <span
              className={styles.see_more_sellers_btn}
              onClick={() => setSeeMoreLabel((prevState) => !prevState)}
            >
              <span>{seeMoreLabel ? "بستن" : "مشاهده بیشتر"}</span>
              <div className="d-flex">
                <div
                  data-icon-name="cube-chevron-left"
                  data-icon="&#xE9C2;"
                  className={`${styles.see_more_sellers_icon} cube-font-icon`}
                ></div>
              </div>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
export default Sellers;

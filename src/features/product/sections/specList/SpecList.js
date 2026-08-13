import { useProductContext } from "@/contexts/ProductContext";

import styles from "./specList.module.css";

const SpecList = () => {
  const { productDetails } = useProductContext();

  return (
    <div className={styles.spec_list_container}>
      <ul className={styles.spec_list}>
        <li className={styles.first_spec}></li>
        {productDetails?.review?.attributes
          ?.slice(0, 9)
          ?.map((review, index) => (
            <li key={index} className={styles.spec_item_border}>
              <div className={styles.spec_item}>
                <span className={styles.spec_item_textUp}>
                  {review.title}
                  <div className="d-flex">
                    <div
                      className={`${styles.spec_icon} cube-font-icon`}
                      data-icon="&#xE9C2;"
                    ></div>
                  </div>
                </span>
                <span className={styles.spec_item_textDown}>
                  {review.values.join("، ")}
                </span>
              </div>
            </li>
          ))}
        <li className={styles.last_spec}></li>
      </ul>
    </div>
  );
};

export default SpecList;

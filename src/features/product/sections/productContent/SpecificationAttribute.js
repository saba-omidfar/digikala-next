import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./specificationAttribute.module.css";

function SpecificationAttribute({ specification }) {
  return (
    <div className={styles.specification_attribute_values_box}>
      <p className={styles.specification_attribute_value_title}>
        {specification?.title}
      </p>
      <div className={styles.specification_attribute_value_desc_container}>
        {specification?.values?.map((value, index) => (
          <p key={index} className={styles.specification_attribute_value_desc}>
            {toPersianDigits(value)}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SpecificationAttribute;

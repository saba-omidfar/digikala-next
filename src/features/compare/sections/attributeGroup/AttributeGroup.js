import toPersianDigits from "@/utils/toPersianDigits";

import styles from "./attributeGroup.module.css";

export default function AttributeGroup({
  group,
  gridColumns,
  borderClassName,
}) {
  return (
    <div className={borderClassName ? borderClassName : ""}>
      <h3 className={styles.attribute_groups_title}>{group.title}</h3>
      <div className={styles.attributes_container}>
        {group.attributes.map((attribute) => (
          <div
            key={attribute?.id}
            className={`${styles.attribute_item} ${styles.br_list_vertical_no_padding_200}`}
          >
            <h5 className={styles.attribute_title}>{attribute.title}</h5>

            <div
              className={styles.attribute_values_container}
              style={{ gridTemplateColumns: gridColumns }}
            >
              {attribute.values.map((value, index) => (
                <div key={index} className={styles.br_list_horizontal}>
                  <p className={styles.attribute_value_title}>
                    {toPersianDigits(value)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

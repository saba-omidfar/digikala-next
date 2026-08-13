import Link from "next/link";

import styles from "./mobileBrand.module.css";

export default function MobileBrands({ icon, title, brands }) {
  return (
    <div>
      <div className={styles.section_title_container}>
        <div className="d-flex align-items-center">
          <div className={styles.brand_icon_container}>
            <div className={styles.icon_container}>
              <img src={icon} className={styles.icon} alt="" />
            </div>
          </div>
          <h5 className={styles.section_title}>{title}</h5>
        </div>
      </div>
      <div className={styles.brands_container}>
        <div className={styles.paddingRight}></div>
        {brands?.map((brand, index) => (
          <div key={`${index}-${brand?.title}`}>
            <Link className={styles.brand_link} href={brand?.url?.url || "#"}>
              <div className={styles.brand_bg}>
                <div className={styles.brand_logo_container}>
                  <picture>
                    <source type="image/webp" srcSet={brand?.image?.url} />
                    <source type="image/jpeg" srcSet={brand?.image?.url} />
                    <img
                      width="78"
                      height="78"
                      title=""
                      src={brand?.image?.url}
                      alt={brand?.title}
                      className={styles.brand_logo}
                    />
                  </picture>
                </div>
              </div>
              <h4 className={styles.brand_title}>{brand?.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

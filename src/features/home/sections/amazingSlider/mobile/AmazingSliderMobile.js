import Link from "next/link";

import AmazingItem from "@/features/home/sections/amazingSlider/mobile/amazingItem/AmazingItem";

import styles from "./amazingSliderMobile.module.css";

export default function AmazingSliderMobile({ data }) {
  console.log("data=>", data);

  if (!data) return null;

  return (
    <div className={styles.container}>
      <div
        className={styles.content}
        style={{
          background: `linear-gradient(225deg,${data?.style?.background_colors?.[0]} 0%, ${data?.style?.background_colors?.[1]} 100%)`,
        }}
      >
        <div className={styles.header_container}>
          <div
            className={styles.header_logo_container}
            aria-hidden="true"
            aria-label=""
          >
            <img className={styles.logo_img} src={data?.icon?.url} />
          </div>
          <div
            className={styles.header_text_container}
            aria-hidden="true"
            aria-label=""
          >
            <img className={styles.logo_img} src={data?.header_image?.url} />
          </div>
          <Link
            className={styles.header_link}
            target="_self"
            href="/incredible-offers/"
          >
            همه
            <div className="d-flex" aria-hidden="false">
              <svg className={styles.chevron_icon}>
                <use href="#chevronLeft"></use>
              </svg>
            </div>
          </Link>
        </div>
        <div className={styles.products_container}>
          <div className={styles.padding_right}></div>

          {/* Amazing Products */}
          {data?.products?.map((product, index) => (
            <AmazingItem key={product.id} index={index} product={product} />
          ))}

          {/* See More Link */}
          <Link className={styles.show_all_card_btn} href="/incredible-offers/">
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
              <div className={styles.arrow_icon_container}>
                <div className="d-flex" aria-hidden="false">
                  <svg className={styles.arrow_icon}>
                    <use href="#arrowLeft"></use>
                  </svg>
                </div>
              </div>
              <p className={styles.show_all_card__text}>مشاهده همه</p>
            </div>
          </Link>
          <div className={styles.padding_right}></div>
        </div>
      </div>
    </div>
  );
}

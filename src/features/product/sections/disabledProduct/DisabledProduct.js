import styles from "./disabledProduct.module.css";

export default function DisabledProduct() {
  return (
    <>
      <div
        className={styles.disabled_product_img_container}
        aria-hidden="false"
        aria-label="Disabled Product"
      >
        <picture>
          <source
            type="image/webp"
            srcSet="/statics/img/png/disabledProduct/no-result.webp"
          />
          <source
            type="image/jpeg"
            srcSet="/statics/img/png/disabledProduct/no-result.png"
          />
          <img
            className={styles.disabled_product_img}
            src="/statics/img/png/disabledProduct/no-result.png"
            alt="Disabled Product"
            title=""
          />
        </picture>
      </div>
      <p className={styles.title}>این کالا غیرفعال شده</p>
      <p className={styles.sub_title}>
        پایین‌تر می‌توانید کالاهای مشابه را ببینید
      </p>
    </>
  );
}
